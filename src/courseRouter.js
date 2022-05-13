const express = require('express');
const router = express.Router();

const file_info = require("../data/file_info.json");
const commentObj = require("./commentDBController.js");
const commentInfo = commentObj.read();


router.get('/', function(request, response) {
    var courseNo = request.session.courseNo;
    console.log(request.session)
    request.session.courseNo = 0;
    response.render('course', {
        file_info,
        commentInfo,
        courseNo: courseNo
    })
})

module.exports = router;
