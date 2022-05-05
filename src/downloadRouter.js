const express = require('express');
const router = express.Router();


const file_info = require("../data/file_info.json");

router.get('/download/:id', function(request, response) {
    var lectureNo = request.params.id;
    response.download(`data/attachment/UBC ${lectureNo} - ${file_info.video[lectureNo].title}.pptx`);
})

module.exports = router;
