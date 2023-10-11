var mainDiv;
var player;
var spinner;
var buffering = {};
var visibilityInterval = 0;
// var mainData = JSON.parse(streamData);
// var securityObj = mainData.security;
var config = {
    "source": {
        "h5live": {
            "server": {
                "websocket": "wss://bintu-h5live-secure.nanocosmos.de:443/h5live/authstream/stream.mp4",
                "hls": "https://bintu-h5live-secure.nanocosmos.de:443/h5live/authhttp/playlist.m3u8"
            },
            "rtmp": {
                "url": "rtmp://bintu-splay.nanocosmos.de:1935/splay",
                "streamname": streamName
            },
            "security": {
                "token": securityToken,
                "expires": securityExpires,
                "options": securityOptions,
                "tag": securityTag
            }
        }
    },
/*  "metrics": {
        accountId: 'bo1herz2eqs61523',  // do not change
        accountKey: 'bo1zfjwher6182a1',  // do not change
        userId: 'viewer1',   // value can be changed per viewer
        eventId: 'event1',   // value can be changed per event
        statsInterval: 10,   // statistics interval in seconds
        customField1: 'CustomInfo1'   // value can be changed
    },*/
    "playback": {
        "autoplay": true,
        "automute": true,
        "muted": false,
        "flashplayer": "//demo.nanocosmos.de/nanoplayer/nano.player.swf"
    },
    "style": {
        width: '100%',
        height: "100%",
        aspectratio: '16/9',
        controls: false,
        scaling: 'letterbox'
    },
    events: {
        onReady: function (e) {
            //console.log('ready');
        },
        onPlay: function (e) {
            // console.log('playing');
            // console.log('play stats: ' + JSON.stringify(e.data));
            if (spinner) {
                spinner.hideInc();
                spinner.dispose();
                document.body.removeChild(spinner.canvas);
            }
            clearInterval(visibilityInterval);
            visibilityInterval = 0;
            mainDiv.style.visibility = "visible";         
        },
        onPause: function (e) {
            var reason = (e.data.reason !== 'normal') ? ' (%reason%)'.replace('%reason%', e.data.reason) : '';
            //console.log('pause' + reason);
        },
        onLoading: function (e) {
            //console.log('loading');
        },
        onStartBuffering: function (e) {
            buffering.start = new Date();
            setTimeout(function () {
                if (buffering.start) {
                    //console.log('buffering');
                }
            }, 2000);
        },
        onStopBuffering: function (e) {
            buffering.stop = new Date();
            if (buffering.start) {
                var duration = Math.abs(buffering.stop - buffering.start);
                if (duration > 1000) {
                    //console.log('buffering ' + duration + 'ms');
                }
                buffering.stop = buffering.start = 0;
            }
            //console.log("Playing")
        },
        onWarning: function (e) {
            //console.log(e);
        },
        onError: function (e) {
            try {
                var err = JSON.stringify(e);
                if (err === '{}') {
                    err = e.message;
                }
                e = err;
            } catch (err) { }
            console.log('Error = ' + e);
            //document.getElementById('error').innerText = e;
            //document.getElementById('error-container').style.display = 'block';
            setTimeout(function(){ startPlayer(); }, 2000);
        },
        onDestroy: function (e) {
           // console.log('destroy');
        }
    }
};

document.addEventListener('DOMContentLoaded', function () {

    var css = '#'+ videoPlayerId + '{width:100vw !important; height:100vh !important;visibility: hidden;}';
    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    head.appendChild(style);
    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));

    mainDiv = document.createElement('div');
    mainDiv.id = videoPlayerId;
    document.body.appendChild(mainDiv);

    visibilityInterval = setInterval(function(){
        mainDiv.style.visibility = "hidden";    
    }, 5);

    player = new NanoPlayer(videoPlayerId);
    startPlayer();

    setTimeout(function(){
        spinner = new CanvasSpinner(null, 10);
        spinner.init()
        spinner.showInc();
        document.body.appendChild(spinner.canvas);
    },1);
});
function startPlayer(){
    player.setup(config).then(function (config) {
        var video = mainDiv.querySelector("video");
        video.setAttribute("poster", staticUrl + "videoplayer/nplayer/js/videobg.jpg");
      //  console.log("setup success");
       // console.log("config: " + JSON.stringify(config, undefined, 4));
    }, function (error) {
       // alert(error.message);
    });
}
function destroyPlayer() {
    if (player) {
        player.destroy();
    }
}

window.onbeforeunload = function(e) { 
    // this works onpage reload / close
    // console.log("hide video before unload");
    destroyPlayer();
    setInterval(function(){
        if (mainDiv) {
            mainDiv.style.visibility = "hidden";    
        }
    }, 5);  
    if (mainDiv) {
        mainDiv.style.visibility = "hidden";    
    }
    delete e['returnValue'];
};

//

function CanvasSpinner ( canvas , divider){

    var self = this;

    self.init = function(){

        canvas = self.canvas = canvas || document.createElement('canvas');

        var rect = {
            width : window.innerWidth,
            height : window.innerHeight
        };
        var max = Math.max(rect.width, rect.height);
        canvas.width = max / divider;
        canvas.height = max / divider;
        canvas.style.position = "absolute";
        var top = 0; // rect.top;
        var left = 0; 
        canvas.style.top = Math.round(top + rect.height / 2 - canvas.height / 2) + "px";
        canvas.style.left = Math.round(left + rect.width / 2 - canvas.width / 2) + "px";
        // canvas.style.zIndex = "100";

        return self;
    };

    self.showInc = function(){
        showInc++;
        canvas.style.display = "";
        if (!loader_interval) {
            start = new Date();
            loader_interval = setInterval(draw, 1000 / 30);
            draw();
        }
        return self;
    };

    self.hideInc = function(){
        showInc--;
        if (showInc < 0)
            showInc = 0;
        if (showInc === 0){
            canvas.style.display = "none";
            if (loader_interval) {
                clearInterval(loader_interval);
                loader_interval = 0;
            }
        }
        return self;
    };

    self.dispose = function(){
        if (loader_interval) {
            clearInterval(loader_interval);
        }
        canvas.style.display = "none";
        loader_interval = 0;
    };

    self.updateText = function(in_text){
        text = in_text;
        if (loader_interval) {
            draw();
        }
        return self;
    };

    // ===============

    var loader_interval = 0;
    var start = new Date();
    var lines = 16;
    var text = "";
    var showInc = 0;

    function draw(){

        var rect = {
            width : window.innerWidth,
            height : window.innerHeight
        };
        var max = Math.max(rect.width, rect.height);
        canvas.width = window.devicePixelRatio * max / divider;
        canvas.height = window.devicePixelRatio * max / divider;
        canvas.style.width = max / divider + "px";
        canvas.style.height = max / divider + "px";
        var top = 0; // rect.top;
        var left = 0; 
        canvas.style.top = Math.round(top + rect.height / 2 - max / divider / 2) + "px";
        canvas.style.left = Math.round(left + rect.width / 2 - max / divider / 2) + "px";

        var context = canvas.getContext('2d');
        var cW = context.canvas.width;
        var cH = context.canvas.height;
        
        var rotation = parseInt(((new Date() - start) / 1000) * lines) / lines;

        var line_length = cW;

        context.clearRect(0, 0, cW, cH);

        context.save();

        context.lineCap="round";

        context.translate(cW / 2, cH / 2);
        context.rotate(Math.PI * 2 * rotation);

        for (var i = 0; i < lines; i++) {
            context.beginPath();
            context.rotate(Math.PI * 2 / lines);
            context.moveTo(line_length / 10, 0);
            context.lineTo(line_length / 4, 0);
            context.lineWidth = line_length / 30;
            context.strokeStyle = "rgba(200, 200, 200," + i / lines + ")";
            context.stroke();
        }

        context.restore();

        context.save();

        if (text) {

            var pen = "rgba(0, 0, 0, 1.0)";

            context.strokeStyle = pen;
            context.fillStyle = pen;
            context.lineWidth = 1;

            var text_height = 13;
            context.font = text_height + 'px Arial';
            var text_width = context.measureText(text).width;

            context.translate(cW / 2 - text_width / 2, text_height * 2);

            context.fillText(text, 0, 0);
        }

        context.restore();
    }
}