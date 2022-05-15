const express = require('express');
const router = express.Router();

const file_info = require("../data/file_info.json");

getExtensionName = {
    material: "pdf",
    video: "mp4",
    script: "docx"
}

router.get('/download/:lectureNo/:filetype', function(request, response) {
    var lectureNo = request.params.lectureNo;
    var filetype = request.params.filetype;
    var extensionName = getExtensionName[filetype]

    if (filetype == "video") {
        response.download(`data/video/video${lectureNo}.mp4`)
    } else {
        response.download(`data/${filetype}/UBC ${lectureNo} - ${file_info.video[lectureNo].title}.${extensionName}`);
    }    
})

router.get('download/video/:lectureNo', function(request, response) {
    var lectureNo = request.params.lectureNo;
    response.download(`data/video/`)
})

module.exports = router;
