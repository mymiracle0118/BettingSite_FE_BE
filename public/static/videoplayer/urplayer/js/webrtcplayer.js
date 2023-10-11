function UnrealWebRTCPlayer(videoID, alias, sid, ipAddress, port, useSecureWebsocket, useSingleWebRTCPort, WebRTCProtocol) {
    "use strict";

    var pc = null;
    var ws = null;
    var state = -1;
    var audioCodec = "";
    var videoCodec = "";
    var latestStopTime = 0;
    var connOK = false;
    var remoteVideo = document.getElementById(videoID);
    var showControls = remoteVideo.controls;

    var playCounter = 0
    this.reconnect = true;
    var that = this;

    this.Play = function Play() {
        if (playCounter < 10) {
            var nowTime = new Date().getTime();

            if ((state == -1) && (nowTime - latestStopTime > 1000)) {
                remoteVideo.srcObject = null;
                state = 0;
                connOK = false;
                ToggleOverlay(false);
                ToggleCustomOverlay(true, "Loading...");
                // remoteVideo.setAttribute('style', 'background: black url(loader.gif) center no-repeat;');
                showControls = remoteVideo.controls;
                remoteVideo.controls = false;
                DoSignaling();
            }
            else{
                ToggleCustomOverlay(false)
            }

            if (nowTime - latestStopTime <= 1000)
                remoteVideo.pause();
        }
        else {
            ToggleCustomOverlay(true, "Maximum Limit Reached. Please Reload the Page !");
        }
    }

    this.Stop = function Stop() {
        showControls = remoteVideo.controls;
        Terminate();
    }

    remoteVideo.onplay = this.Play;
    remoteVideo.onpause = this.Stop;

    function Terminate() {
        latestStopTime = new Date().getTime();

        state = -1;
        ToggleOverlay(true);
        ToggleCustomOverlay(false);
        // remoteVideo.setAttribute('style', 'background-color:black');

        if (showControls)
            remoteVideo.controls = true;

        if (pc != null) {
            pc.onconnectionstatechange = null;
            pc.close();
            pc = null;
        }

        if (ws != null) {
            ws.onerror = null;
            ws.close();
            ws = null;
        }

        remoteVideo.pause();
        if (that.reconnect == true) {
            setTimeout(function() {
                playCounter++
                webrtcPlayer.Play();
            }, 4000);
        }
    }

    function onCreateSessionDescriptionError(error) {
        Terminate();
        // ToggleCustomOverlay(true, "Failed to create session description: " + error.toString());
        ToggleCustomOverlay(true, "Loading...");
        setTimeout(function () { that.Play(); }, 4000);
    }

    function onCreateOfferSuccess(desc) {
        var audioRate = 8000;
        if (audioCodec === "opus")
            audioRate = 48000;

        if (audioCodec != "")
            desc.sdp = setCodec(desc.sdp, "audio", audioCodec, audioRate);
        if (videoCodec != "")
            desc.sdp = setCodec(desc.sdp, "video", videoCodec, 90000);

        //Fix for some browsers and/or adapter incorrect behavior
        desc.sdp = desc.sdp.replace("a=sendrecv", "a=recvonly");
        desc.sdp = desc.sdp.replace("a=sendrecv", "a=recvonly");

        //Signal the SDP to the server
        var msgString = JSON.stringify(desc);
        ws.send(msgString);

        pc.setLocalDescription(desc);
    }

    function onIceCandidate(event) {
        //Do nothing! We only need one endpoint from server; browser is going to connect to it
    }

    function gotRemoteStream(e) {
        remoteVideo.srcObject = e.streams[0];

        if (videoCodec == "")
            ToggleCustomOverlay(false);
            // remoteVideo.setAttribute('style', 'background-color:black');

        if (showControls)
            remoteVideo.controls = true;
    }

    function onConnStateChange(event) {
        if (pc.connectionState === "failed") {
            Terminate();
            // ToggleCustomOverlay(true, "Connection failed; playback stopped");
            ToggleCustomOverlay(true, "Loading...");
            setTimeout(function () { that.Play(); }, 4000);
        }
    }

    function DoSignaling() {
        var centralWebRTCPort = useSingleWebRTCPort ? "singleport/" : "randomport/";
        var URL = useSecureWebsocket ? "wss://" : "ws://";
        URL += ipAddress + ":" + port + "/webrtc_playnow/" + centralWebRTCPort + WebRTCProtocol + "/" + alias;
        if (sid != "")
            URL += "/sid:" + sid;

        try {
            ws = new WebSocket(URL);
        }
        catch (error) {
            Terminate();
            // ToggleCustomOverlay(true, "Error creating websocket: " + error);
            ToggleCustomOverlay(true, "Loading...");
            setTimeout(function () { that.Play(); }, 4000);
        }

        ws.onmessage = function(evt) {
            var response = evt.data;
            var strArr = response.split("|-|-|");

            connOK = true;

            if (state == 0) {
                state = 1;

                if (strArr.length == 1) {
                    Terminate();
                    // ToggleCustomOverlay(true, response);
                    ToggleCustomOverlay(true, "Loading...");
                    setTimeout(function () { that.Play(); }, 4000);
                }
                else {
                    var servers = null;
                    var offerOptions = null;

                    videoCodec = strArr[0];
                    audioCodec = strArr[1];

                    if ((videoCodec != "") && (audioCodec != ""))
                        offerOptions = { offerToReceiveAudio: 1, offerToReceiveVideo: 1 };
                    else if (videoCodec != "")
                        offerOptions = { offerToReceiveAudio: 0, offerToReceiveVideo: 1 };
                    else if (audioCodec != "")
                        offerOptions = { offerToReceiveAudio: 1, offerToReceiveVideo: 0 };

                    pc = new RTCPeerConnection(servers);
                    pc.onicecandidate = onIceCandidate;
                    pc.onconnectionstatechange = onConnStateChange;
                    pc.ontrack = gotRemoteStream;

                    pc.createOffer(offerOptions).then(
                      onCreateOfferSuccess,
                      onCreateSessionDescriptionError
                    );
                }
            }
            else {
                if (strArr.length == 1) {
                    Terminate();
                    alert(response);
                }
                else {
                    var serverSDP = JSON.parse(strArr[0]);
                    var serverEndpoint = JSON.parse(strArr[1]);

                    serverEndpoint.candidate = EnsureValidCandidate(serverEndpoint.candidate);

                    pc.setRemoteDescription(new RTCSessionDescription(serverSDP));
                    var candidate = new RTCIceCandidate({ sdpMLineIndex: serverEndpoint.sdpMLineIndex, candidate: serverEndpoint.candidate });
                    pc.addIceCandidate(candidate);

                    ws.close();
                    ws = null;
                }
            }
        }

        ws.onerror = function(evt) {
            if (!connOK) {
                Terminate();
                // ToggleCustomOverlay(true, "Error connecting to Media Server");
                ToggleCustomOverlay(true, "Loading...");
                setTimeout(function () { that.Play(); }, 4000);
            }
        }
    }

    function EnsureValidCandidate(candidate) {
        if ((candidate.search(ipAddress) !== -1) || !useSingleWebRTCPort || (ipAddress == "127.0.0.1") || !ValidateIPaddress(ipAddress)) {
            return candidate;
        }

        //In case the server is behind the NAT router, replace private IP with public IP in the candidate
        var candLines = candidate.split(" ");
        var ipIndex = 4;
        for (var i = 0; i < candLines.length; i++) {
            if (candLines[i] === "typ") {
                ipIndex = i - 2;
                break;
            }
        }

        candLines[ipIndex] = ipAddress;
        candidate = candLines.join(" ");
        return candidate;
    }

    function ValidateIPaddress(ipaddr) {
        if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddr)) {
            return true;
        }

        return false;
    }

    function setCodec(sdp, type, codec, clockRate) {
        var sdpLines = sdp.split("\r\n");

        for (var i = 0; i < sdpLines.length; i++) {
            if (sdpLines[i].search("m=" + type) !== -1) {
                var mLineIndex = i;
                break;
            }
        }

        if (mLineIndex === null) return sdp;

        var codecPayload = null;
        var re = new RegExp(":(\\d+) " + codec + "\/" + clockRate);

        for (var i = mLineIndex; i < sdpLines.length; i++) {
            if (sdpLines[i].search(codec + "/" + clockRate) !== -1) {
                codecPayload = extractPayloadType(sdpLines[i], re);
                if (codecPayload && (EnsureSupportedProfile(codec, sdpLines, mLineIndex, codecPayload))) {
                    sdpLines[mLineIndex] = setDefaultCodec(sdpLines[mLineIndex], codecPayload);
                    break;
                }
            }
        }

        if (codecPayload === null) return sdp;

        var rtmpmap = "a=rtpmap:";
        var rtcp = "a=rtcp-fb:";
        var fmptp = "a=fmtp:";
        var rtmpmapThis = "a=rtpmap:" + codecPayload;
        var rtcpThis = "a=rtcp-fb:" + codecPayload;
        var fmptpThis = "a=fmtp:" + codecPayload;
        var bAddAll = false;
        var resSDPLines = new Array();

        for (var i = 0; i < sdpLines.length; i++) {
            if (i <= mLineIndex) {
                resSDPLines.push(sdpLines[i]);
            }
            else {
                if (sdpLines[i].search("m=") === 0)
                    bAddAll = true;

                var bNotToAdd = ((sdpLines[i].search(rtmpmap) === 0) && (sdpLines[i].search(rtmpmapThis) !== 0)) || ((sdpLines[i].search(rtcp) === 0) && (sdpLines[i].search(rtcpThis) !== 0)) || ((sdpLines[i].search(fmptp) === 0) && (sdpLines[i].search(fmptpThis) !== 0));

                if (bAddAll || !bNotToAdd)
                    resSDPLines.push(sdpLines[i]);
            }

        }

        sdp = resSDPLines.join("\r\n");
        return sdp;
    };

    function extractPayloadType(sdpLine, pattern) {
        var result = sdpLine.match(pattern);
        return (result && result.length == 2) ? result[1] : null;
    };

    function EnsureSupportedProfile(codec, sdpLines, mLineIndex, codecPayload) {
        if (codec != "H264")
            return true;

        //Server can send any profile/level H264, but SDP has to specify supported one
        for (var i = mLineIndex; i < sdpLines.length; i++) {
            if ((sdpLines[i].search("a=fmtp:" + codecPayload) === 0) && (sdpLines[i].search("profile-level-id=42") !== -1))
                return true;
        }

        return false;
    };

    function setDefaultCodec(mLine, payload) {
        var elements = mLine.split(" ");
        var newLine = new Array();
        var index = 0;
        for (var i = 0; i < elements.length; i++) {
            if (index === 3) {
                newLine[index++] = payload;
                break;
            }
            if (elements[i] !== payload) newLine[index++] = elements[i];
        }
        return newLine.join(" ");
    };

    function ToggleOverlay(show) {
        var Overlay = document.getElementById(videoID + "_Overlay");
        if (Overlay != null) {
            if(show)
                Overlay.style.display = "inline";
            else
                Overlay.style.display = "none";
        }
    }

    function ToggleCustomOverlay(show, msg = "") {
        var CustomOverlay = document.getElementById(videoID + "_Custom_Overlay");
        if (CustomOverlay != null) {
            if(show){
                CustomOverlay.innerHTML = "<p style='color:red; font-size:22px;'>"+msg+"</p>"
                CustomOverlay.style.display = "flex";
            }
            else
                CustomOverlay.style.display = "none";
        }
    }

};

