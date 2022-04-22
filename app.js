// file information
ROOT_DIR = process.cwd();
const file_info = require("./data/file_info.json");



// video compile
const FILE_NUMBER = 1;

const video_compiler = require("./src/video_compiler.js");
const fs = require('fs');

for (var num = 1; num < file_info.video.length; num++) {
    let videoDir = `data/video/video${num}.mov`;
    let compiledDir = `data/hls_stream/video${num}/output.m3u8`;

    fs.exists(videoDir, function(exist) {
        if (!exist) return;
        fs.exists(compiledDir, function(exist) {
            if (exist) return;
            console.log("compile start");
            video_compiler.use(videoDir, compiledDir);
        });
    });
}



// express
const express = require('express');
const server = express();
const PORT = 3000;

// ejs
server.set('view engine', 'ejs');
server.set('views', "page");

// body parsor
server.use(express.static("page"));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());


// session router






/*

// 인증 확인
server.get('*', function(request, response, next) {
    if (PORT) next('route'); // 정상적인 접근
    else next(); // 로그인 페이지
}, function(request, response) {
    response.render('login');
});

server.post('/login_request', function(request, response) {
    if (PORT) response.render('main')
    else response.render('login'); // 로그인 실패 안내 추가해주면 좋음
})

*/

server.get('/login', function(request, response) {
    response.render('login');
})

server.get('/course', function(request, response) {
    response.render('course', file_info);
})

server.get('/download/:id', function(request, response) {
    response.download(`data/attachment/attachment${request.params.id}.png`);
})



/*
const writeCommentRouter = require("../src/write_comment.js");
server.get('course/lecture/write_comment', writeCommentRouter);
*/

server.get('', function(request, response) {
    response.redirect('/course');
})

const hls_server = server.listen(PORT, () => console.log('server is running'))



// hls streamer
const video_streamer = require("./src/video_streamer.js");
const HLS = require("hls-server");
const video = require("fluent-ffmpeg/lib/options/video");
new HLS(hls_server, video_streamer);