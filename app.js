// file information
ROOT_DIR = process.cwd();
const file_info = require("./data/file_info.json");


// video compile
const FILE_NUMBER = 1;

const video_compiler = require("./src/videoCompiler.js");
const fs = require('fs');

for (var num = 1; num <= file_info.video.length; num++) {
    let videoDir = `data/video/video${num}.mp4`;
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

// middleware
const compression = require("compression");
const expressSanitizer = require('express-sanitizer');
server.use(compression());
server.use(expressSanitizer());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use(express.static("page"));
server.use(express.static("data/attachment"));
server.use(express.static("data/hls_stream"));


// session
var session = require('express-session');
var FileStore = require('session-file-store')(session);

server.use(session({
  secret: 'session key',
  resave: false,
  saveUninitialized: true,
  store: new FileStore({path: './data/sessions/'})
}));


// main & login
const login_router = require("./src/loginRouter.js");
server.use('', login_router);

server.get('*', function(request, response, next) {
    if (request.session.is_logined) next('route');
    else next();
}, function(request, response) {
    response.redirect('login');
});




// course
const courseRotuer = require("./src/courseRouter");
server.use('/course', courseRotuer);
server.get('', (request, response) => response.redirect('course'));

// download & comment router
const download_router = require("./src/downloadRouter.js")
const commentRouter = require("./src/commentRouter.js");
server.use('/course', download_router);
server.use('/course', commentRouter);


// hls streamer
const HLS = require("hls-server");
const hls_server = server.listen(PORT, () => console.log('server is running'));
const video_streamer = require("./src/videoStreamer.js");
const res = require("express/lib/response");
new HLS(hls_server, video_streamer);