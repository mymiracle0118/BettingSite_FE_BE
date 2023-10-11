module.exports = function ({
    express,
    redisClient,
    nanoid,
    CryptoJS
}) {

    const env = process.env.NODE_ENV || 'development';

    const PollingHTTP = function () {

        this.onMessage = (clientRedisData, msg, data) => {

        };

        this.polling_router = new express.Router();

        // --------------------------------------------------
        // internals

        const polling_router = this.polling_router;

        polling_router.post('/connection/:polling_token', async (req, res) => {
            const polling_token = req.params.polling_token;
            try {
                const clientData = await getRedisClientData(polling_token);

                const dev = polling_token === '__token__' && env !== 'production';

                if (!dev && clientData.connected) {
                    res.status(401).send('already in use');
                    return;
                }
                if (!clientData) {
                    res.status(401).send('not authorized for polling');
                    return;
                }
                const __next_key__ = dev ? "__private_key__" : nanoid();
                const next_key_encrypt = CryptoJS.AES.encrypt(
                    __next_key__,
                    clientData.polling_private_key
                ).toString();
                clientData.polling_private_key = __next_key__;
                clientData.connected = true;
                await setRedisClientData(polling_token, clientData);
                res.json({
                    __next_key__: next_key_encrypt
                });
            } catch (e) {
                res.status(500).send('internal error');
            }
        });

        polling_router.post('/connection/:polling_token/poll', async (req, res) => {

            const polling_token = req.params.polling_token;

            const dev = polling_token === '__token__' && env !== 'production';

            try {

                const clientData = await getRedisClientData(polling_token);

                if (!clientData) {
                    res.status(401).send('not authorized for polling');
                    return;
                }

                if (!dev && !clientData.connected) {
                    res.status(401).send('not authorized for polling');
                    return;
                }

                const __prev_key__ = clientData.polling_private_key;

                const promises = [];

                let __polling_queue__ = [];

                if (req.body.__a__) {
                    const bytes = CryptoJS['AES']['decrypt'](req.body.__a__, __prev_key__);
                    __polling_queue__ = JSON.parse(bytes.toString(CryptoJS['enc']['Utf8']));
                }

                for (let i = 0; i < __polling_queue__.length; i++) {
                    const query = __polling_queue__[i];
                    promises.push(
                        new Promise(resolve => {
                            const _r = this.onMessage(req, clientData, query.message, query.data);
                            if (_r && _r.then) {
                                _r.then(result => {
                                    query.result = result;
                                    resolve();
                                });
                                return;
                            }
                            query.result = _r;
                            resolve();
                        })
                    );
                }

                await Promise.all(promises);

                const __next_key__ = dev ? "__private_key__" : nanoid();
                const next_key_encrypt = CryptoJS.AES.encrypt(
                    __next_key__,
                    __prev_key__
                ).toString();

                clientData.polling_private_key = __next_key__;

                await setRedisClientData(polling_token, clientData);

                const encrypt_responce = CryptoJS.AES.encrypt( // responce
                    JSON.stringify(__polling_queue__),
                    __prev_key__
                ).toString();

                res.json({
                    __a__: next_key_encrypt, // next key
                    __b__: encrypt_responce
                });
            } catch (e) {
                res.status(500).send('internal error');
            }
        });
    }

    function makeSTokenKey(polling_token) {
        return "client::" + polling_token;
    }

    async function getRedisClientData(polling_token) {
        return new Promise((resolve, reject) => {
            const key = makeSTokenKey(polling_token);
            redisClient.get(key, (err, clientData) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (!clientData && polling_token === '__token__' && env !== 'production') { // Local debug
                    setRedisClientData(polling_token, {
                        polling_token: "__token__",
                        polling_private_key: "__private_key__",
                        ws: null
                    }).then(err => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        redisClient.get(key, (err, clientData) => {
                            if (err) {
                                reject(err);
                                return;
                            }
                            clientData = JSON.parse(clientData || "{}");
                            resolve(clientData);
                        });
                    });
                } else {
                    redisClient.get(key, (err, clientData) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        clientData = JSON.parse(clientData || "{}");
                        resolve(clientData);
                    });
                }
            });
        });
    }

    async function setRedisClientData(polling_token, clientData) {
        return new Promise((resolve, reject) => {
            const key = makeSTokenKey(polling_token);
            const fiveMinutes = 60 * 5;
            redisClient.setex(key, fiveMinutes, JSON.stringify(clientData), (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }

    return {
        PollingHTTP,
        makeSTokenKey,
        getRedisClientData,
        setRedisClientData
    };
};