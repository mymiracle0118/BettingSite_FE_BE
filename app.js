require("dotenv").config();

const request = require("request");
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const config = require("config");
const morgan = require("morgan");
const { v4: uuidv4 } = require("uuid");
const useragent = require("express-useragent");
const api = require("./helpers/api");
const adminApi = require("./helpers/admin/api");
const redisHelper = require("./helpers/redis");
const { redisClient } = redisHelper;
const frontRouter = require("./routes/front");
const frontApiRouter = require("./routes/frontApi");
const mediaplayerRouter = require("./routes/mediaplayer");
/* Admin routes*/
const adminApiRouter = require("./routes/adminApi");
const adminRouter = require("./routes/admin");
const adminPages = require("./routes/adminPages");

morgan.token("useragent", function getId(req) {
  return JSON.stringify(req.useragent);
});

morgan.token("originalip", function getId(req) {
  return req.headers["cf-connecting-ip"];
});

morgan.token("xrequestedwith", function getId(req) {
  return req.headers["X-Requested-With"];
});

const app = express();
app.use(useragent.express());

if (config.logEnable) {
  // create a rotating write stream
  var rfs = require("rotating-file-stream"); // version 2.x
  var s3stream = rfs.createStream("access.log", {
    interval: "1d", // rotate daily
    path: path.join(__dirname, "log"),
  });

  // var S3StreamLogger = require('s3-streamlogger').S3StreamLogger;

  // var s3stream = new S3StreamLogger({
  //   bucket: config.s3.bucketName,
  //     access_key_id: config.s3.accessKey,
  //     secret_access_key: config.s3.secretKey,
  //     folder: "logs",
  //   });

  //Create a new named format
  morgan.token(
    "custom",
    ":method || :xrequestedwith || :status || :date[web] || :url || :response-time ms || :originalip || :remote-addr || :referrer || :useragent"
  );

  // setup the logger

  if (config.logType == "custom") {
    app.use(
      morgan("custom", {
        stream: s3stream,
        skip: function (req, res) {
          return (
            req.header("X-Requested-With") == "undefined" ||
            req.url != "/" ||
            api.getDomain(req.headers.host) != "world777.com"
          );
        },
      })
    );
    // app.use(morgan('custom', { stream: accessLogStream }))
  } else {
    app.use(morgan(config.logType, { stream: accessLogStream }));
  }
} else {
  app.use(morgan("dev"));
}

const app_session = require("express-session");

const { nanoid } = require("nanoid");
const CryptoJS = require("crypto-js");

// FILE SESSION
// const app_session_params = {
//   name: "g_token",
//   secret: uuidv4(),
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     path: '/',
//     sameSite : true,
//     expires: false, // Alive Until Browser Exits
//   }
// }

// REDIS SESSION
const redisStore = require("connect-redis")(app_session);

const app_session_params = {
  name: "g_token",
  secret: "uuidv4()",
  store: new redisStore({
    host: config.redis.host,
    port: config.redis.port,
    client: redisClient,
    prefix: config.redis.prefix,
    ttl: 86400, // 86400 seconds or one day
    // Note: The TTL is reset every time a user interacts with the server.
    // You can disable this behavior in some instances by using disableTouch.
    disableTouch: false, // handles only "expire" !
    // Note: express-session does not update expires until the end of the
    // request life cycle. Calling session.save() manually beforehand will have the previous value.
  }),
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
  }, // Redis : Note that the cookie-parser module is no longer needed
};

let env = config.node_env || "development";

// let forceSSL = (req, res, next) => {
//   if (req.headers['x-forwarded-proto'] !== 'https') {
//     return res.redirect(['https://', req.get('Host'), req.url].join(''));
//   }
//   return next();
// };

// if (env === 'production') {
//   app.use(forceSSL);
//   app.set('trust proxy', 1) // trust first proxy
//   app_session_params.cookie.secure = true // serve secure cookies
// }

app.use(app_session(app_session_params));
app.set("trust proxy", "loopback, linklocal, uniquelocal");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(express.urlencoded({ extended: true, limit: 1000 })); // it's for body in common(exmpl: form data)
app.use(express.json({ limit: 2000 })); // it's for json body

// app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Secure Polling Start

const { PollingHTTP, setRedisClientData } = require("./polling-server.js")({
  express: express,
  redisClient: redisClient,
  nanoid: nanoid,
  CryptoJS: CryptoJS,
});

const pollingHTTP = new PollingHTTP();

// can return null/undefined, number, object, array or promise
pollingHTTP.onMessage = function (req, clientRedisData, msg, reqJson) {
  // using req you can get cookies, or else from req

  if (msg === "get_results_test") {
    const data = JSON.parse(reqJson);
    // console.log(data)

    return new Promise((resolve) => {
      if (data.vir == false) {
        if (data.etid == 4) {
          var url = "gamedata2";
        } else {
          var url = "gamedata";
        }
      } else {
        var url = "gamedata";
      }

      // console.log(url)

      let params = {
        gmid: data.gmid,
        m: data.m,
      };

      api.callAuth(
        url,
        params,
        req,
        (resData, status) => {
          // console.log(resData)
          resolve(JSON.stringify(resData));
        },
        (error, status) => {
          resolve(JSON.stringify(error));
        },
        config.frontGameDataApiUrl
      );
    });
  } else if (msg === "get_results_test_promise") {
    return new Promise((resolve) => {
      resolve(reqJson * 2);
    });
  }

  return null;
};

app.use("/polling_api", pollingHTTP.polling_router);

// Secure Polling End

app.get("/*", function (req, res, next) {
  let domain = api.getDomain(req.headers.host);
  // let domain = 'loveexch.com'

  let staticUrl = config.assetsFrom == "s3" ? config.staticUrl : "/static/";

  if (
    domain == "loveexch.com" ||
    domain == "white55exch.com" ||
    domain == "white11exch.com"
  ) {
    res.render("errors/maintenance", {
      staticUrl: staticUrl,
    });
  } else {
    return next();
  }
});

// AWS health check
app.use("/aws/health-check", async function (req, res, next) {
  // console.log("AWS TargetGroup health check request");
  res.sendStatus(200);
});

app.use("/mediaplayer", mediaplayerRouter);
app.use("/api/front", frontApiRouter);
app.use("/api/admin", adminApiRouter);
app.use("/admin/pages", adminPages);
app.use("/admin*", adminRouter);
app.use(/^(?:(?!.*\.\w+).)*$/, frontRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log("Error 404");
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  console.log("Error ", err.status, req.url);
  console.log(err.message);

  // render the error page
  res.status(err.status || 500);
  res.render("errors/error");
  // res.redirect('/')
});

/**
 * Module dependencies.
 */

var debug = require("debug")("dimwebnode:server");
var http = require("http");

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

if (config.securePolling == 2) {
  const io_ws = require("socket.io")(server, {
    path: "/ws/front/gamedata",
  });
  const { clearInterval } = require("timers");
  const CryptoJS = require("crypto-js");
  const crypto = require("./helpers/crypto");

  io_ws.adapter(
    require("socket.io-redis")({
      host: config.redis.host,
      port: config.redis.port,
    })
  );

  io_ws.on("connection", (socket) => {
    console.log("Socket connected: " + socket.id);

    let gmid = socket.handshake.query.gmid;
    let m = socket.handshake.query.m;
    console.log("game id: " + gmid);
    console.log("m: " + m);

    socket.on("disconnect", () => {
      if (socket.socket_interval) {
        clearInterval(socket.socket_interval);
      }
      socket.socket_interval = 0;

      if (socket.s_token) {
        redisHelper.getRedisClientData(socket.s_token).then((clientData) => {
          clientData.ws_id = null;
          clientData.jwt_token = null;
          clientData.type = null;
          redisHelper
            .setRedisClientData(socket.s_token, clientData)
            .then((err) => {
              console.log("io_ws :: disconnected :: clients data updated");
              console.log("io_ws :: error :: " + err);
            });
        });
      } else {
        console.error("io_ws :: disconnected :: clients data didn't updated");
      }
    });

    socket.on("init", (key) => {
      let s_token_array = [];

      try {
        const data_bytes = CryptoJS.AES.decrypt(key, socket.id);
        s_token_array = data_bytes.toString(CryptoJS.enc.Utf8);
      } catch (e) {
        console.error("Someone trying to hack us (1)!"); // if no s_token provided
        socket.disconnect();
        return;
      }

      s_token_array = s_token_array.toString(CryptoJS.enc.Utf8).split("||");

      // Check for s_token and socket.id => One s_token can have one id attached
      redisHelper.getRedisClientData(s_token_array[0]).then((clientData) => {
        let s_token = s_token_array[0];

        if (clientData.ws_id) {
          console.error("Someone trying to hack us (2)!");
          console.error(
            "This means that someone trying to connect to socket using s_token"
          );

          socket.disconnect();
        }

        let s_token_check = "";
        try {
          const data_bytes = CryptoJS.AES.decrypt(
            s_token_array[1],
            clientData.s_token_key
          );
          s_token_check = data_bytes.toString(CryptoJS.enc.Utf8);
          console.log("stoken ckeck", s_token_check);
        } catch (e) {
          console.error("Not registered (2)");
          socket.disconnect();
        }

        if (s_token_check !== s_token || clientData.s_token !== s_token) {
          console.error("Someone trying to hack us (3)!"); // if no s_token provided or wrong token provied
          socket.disconnect();
        }

        // -------------
        // everithing ok

        socket.s_token = s_token;
        clientData.ws_id = socket.id;

        redisHelper.setRedisClientData(s_token, clientData).then((err) => {
          // console.log("ClientData =>> ");
          // console.log(clientData);
          console.log("Socket inited: " + socket.id);
          console.log("ClientData set err = " + err);

          // main logic here

          socket.emit("inited", "");

          socket.socket_interval = setInterval(() => {
            if (clientData.type == "FRONT") {
              getGameDataAndEmit(
                socket,
                {
                  gmid: parseInt(gmid),
                  m: parseInt(m),
                },
                clientData
              );
            } else {
              let gid = socket.handshake.query.gid;
              let mid = socket.handshake.query.mid;
              let etid = socket.handshake.query.etid;
              getGameDataAndEmit(
                socket,
                {
                  gid: parseInt(gid),
                  m: parseInt(m),
                  mid: parseInt(mid),
                  etid: parseInt(etid),
                },
                clientData
              );
            }
          }, config.wsInterval);
        });
      });
    });

    const getGameDataAndEmit = async (socket, params, clientData) => {
      try {
        if (clientData.type == "FRONT") {
          await api.callSocket(
            "gamedata",
            params,
            clientData.jwt_token,
            (data, status) => {
              const encrypted = CryptoJS.AES.encrypt(
                JSON.stringify(data),
                clientData.s_token_key
              ).toString();

              socket.emit("game_data", encrypted);
            },
            (error, status) => {
              console.error("you are logout!");
              socket.disconnect();
            }
          );
        } else {
          let action = "";
          if (params.etid && params.etid == 4) {
            action = "backoffice/gamedatacri";
          } else {
            action = "backoffice/gamedata";
          }
          await adminApi.callSocket(
            action,
            params,
            clientData.jwt_token,
            (data, status) => {
              const encrypted = CryptoJS.AES.encrypt(
                JSON.stringify(data),
                clientData.s_token_key
              ).toString();

              socket.emit("game_data", encrypted);
            },
            (error, status) => {
              console.error("you are logout!");
              socket.disconnect();
            }
          );
        }
      } catch (error) {
        console.error(`Error: ${error.code}`);
      }
    };
  });
}

/**
 * Listen on provided port, on all network interfaces.
 * First we connect to Redis, then start listening, because
 * inbound connections are not valid without Redis
 */

// it's working now i think its because of searching

redisClient.onReady.then(() => {
  // you can ignore this line or make it only in producation
  server.listen(port, () => {
    console.log("Server started...");
  });
  server.on("error", onError);
  server.on("listening", onListening);
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
