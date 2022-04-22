const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);
var video_compiler = {
    unit : ffmpeg,

    use : function(input_dir, output_dir) {
        this.unit(input_dir, { timeout: 432000 }).addOptions([
            '-profile:v baseline',
            '-level 3.0',
            '-start_number 0',
            '-hls_time 10',
            '-hls_list_size 0',
            '-f hls'
        ]).output(output_dir).on('end', () => {
            console.log(`video compile finished`);
        }).run();
    }
}

module.exports = video_compiler;
