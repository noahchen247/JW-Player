import { React, useState, useEffect } from 'react';

function Player({width, height, testFile}) {
    let [autoplay, setAutoplay] = useState(false);
    //let savedVolume = 50; SCRAPPED, NOT ADJUSTED VALUE ON MUTE
    let [volume, setVolume] = useState(50);
    let [duration, setDuration] = useState(0);
    let [playIcon, setPlayIcon] = useState("\u23F5");
    let [muteIcon, setMuteIcon] = useState("\uD83D\uDD08");

    //console.log(width + " " + height);

    function setSliderParams() {
        let urlDuration = document.getElementById("video-player").duration;
        document.getElementById("duration-slider").max = urlDuration;
        //console.log(urlDuration);
        let minutes = Math.floor(urlDuration/60)
        document.getElementById("duration-text").textContent="0:00/"+minutes+":"+Math.round(urlDuration-minutes*60);
    }
    function play() {
        document.getElementById("video-player").play();
        setPlayIcon("\u23F8");     
    }
    function Pause() {
        document.getElementById("video-player").pause();
        setPlayIcon("\u23F5");    
    }
    function togglePlay() {
        if (testFile === "") {
            return;
        }
        let video = document.getElementById("video-player");
        if ((video.currentTime > 0 && !video.paused) || video.ended) {
            Pause();
        }
        else {
            play();
        }
    }
    function toggleAutoplay() {
        if (testFile === "") {
            return;
        }
        let player = document.getElementById("video-player");
        player.autoplay = !autoplay;
        setAutoplay(player.autoplay);
    }
    function toggleVolume(event) {
        if (testFile === "") {
            return;
        }
        //setVolume(event.target.value);
        let newVolume = event.target.value;
        if (newVolume <= 7) {
            setVolume(0);
        }
        else {
            setVolume(newVolume);
        }
        document.getElementById("video-player").volume = volume/100;
    }
    function getVolume() {
        return volume;
    }
    //MIGHT REIMPLEMENT WITH VOLUME ADJUSTING TO MATCH MUTE STATUS?
    function setMute(mute) {
        if(mute) {
            //console.log("mute");
            setMuteIcon("\uD83D\uDD07");
            document.getElementById("video-player").muted = true;
        }
        else {
            //console.log("not mute");
            setMuteIcon("\uD83D\uDD08");
            document.getElementById("video-player").muted = false;
        }
    }
    function toggleMute() {
        if (testFile === "") {
            return;
        }
        setMute(!getMute());
    }
    function getMute() {
        return document.getElementById("video-player").muted;
    }
    //NEED TO TEST
    function getDuration() {
        return document.getElementById("video-player").duration;
    }
    //NEED TO READJUST CSS TO TEST THIS
    function setFullscreen(fullscreen) {
        if (fullscreen) {
            document.getElementById("video-wrapper").requestFullscreen();
        }
        else {
            document.exitFullscreen();
        }
    }
    function toggleFullscreen() {
        setFullscreen(window.screenTop);
    }
    //NEED TO ADD DURATION SLIDER FOR THIS
    function getPlaybackState() {
        let player = document.getElementById("video-player");
        if (player.ended) {
            //console.log("ended");
            return "ended";
        }
        if (player.paused) {
            return "paused";
        }
        return "playing";
    }
    function toggleDuration(event) {
        setDuration(event.target.value);
        document.getElementById("video-player").currentTime = duration;
    }
    function updateSlider() {
        setDuration(document.getElementById("video-player").currentTime);
        document.getElementById("duration-text").textContent=duration+"/"+document.getElementById("video-player").duration;
    }

    useEffect(() => {
        document.getElementById("video-wrapper").style.width= width+"px";
        document.getElementById("video-wrapper").style.height= height+"px";
    }, [width, height]);

    useEffect(() => {
        document.getElementById("video-player").src = testFile;
    }, [testFile]);

    return (
        <div id ="video-wrapper">
            <div id="video-container">
                <video id="video-player"
                       width={width} 
                       height={height}
                       onTimeUpdate={updateSlider}
                       onLoadedData={setSliderParams}
                       onEnded={togglePlay} >
                    <source src={testFile}
                            type="video/mp4"
                            id="video" />
                </video>
            </div>
            <div id="menu" width={width}>
                <div id="left-stick">
                    <input id="play-button"
                           className="video-button"
                           type="button"
                           value={playIcon}
                           onClick={togglePlay}
                    />
                    <input id="duration-slider"
                           className="duration-slider"
                           type="range"
                           min="0"
                           value={duration}
                           step=".001"
                           onChange={toggleDuration}
                           onClick={toggleDuration}
                    />
                    <div id="duration-text">
                        0:00/0:00
                    </div>
                </div>
                <div id="right-stick" >
                    <input id="volume-slider"
                           className="video-slider"
                           type="range"
                           min="0"
                           max="100"
                           value={volume}
                           onChange={toggleVolume}
                           onMouseDown={toggleVolume}
                           onMouseUp={toggleVolume}
                    />
                    <input id="mute-button"
                           className="video-button"
                           type="button"
                           value={muteIcon}
                           onClick={toggleMute}
                    />
                    <input id="fullscreen-button"
                           className="video-button"
                           type="button"
                           onClick={toggleFullscreen}
                           value={"\u26F6"}
                    />
                    <input id="autoplay-button"
                           className="video-button"
                           type="button"
                           onClick={toggleAutoplay}
                           value={"A"}
                    />
                </div>
            </div>
        </div>
    );
}

export default Player;