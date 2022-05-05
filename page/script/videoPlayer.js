hls_streamer = [];

class hlsEvent {
    constructor(num) {
        this.video = document.getElementById("video" + num);
        this.videoSrc = "/hls_stream/video" + num + "/output.m3u8";

        if (Hls.isSupported()) {
            const hls = new Hls();

            hls.loadSource(this.videoSrc);
            hls.attachMedia(this.video);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                this.video.pause();
            });
        } else if (this.video.canPlayType('application/vnd.apple.mpegurl')) {
            this.video.src = this.videoSrc;
            this.video.addEventListener('loadedmetadata', () => {
                this.video.pause();
            });
        }
    }
}

function streamVideo(num) {
    if (hls_streamer[num] === undefined) {
        hls_streamer[num] = new hlsEvent(num);
    }
}