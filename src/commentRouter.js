const express = require('express');
const router = express.Router();

const comment = require("./commentDBController.js");


router.post('/create/:courseNo/:parentNo', function(request, response) {
    var courseNo = request.params.courseNo;
    var parentNo = Number(request.params.parentNo);
    var author = request.session.username;
    var content = request.body.content;
    
    comment.create(courseNo, parentNo, author, content);
    request.session.courseNo = Number(courseNo);
    response.redirect('/');
});

router.post('/update/:courseNo/:commentNo/:parentNo', function(request, response) {
    var courseNo = request.params.courseNo;
    var commentNo = Number(request.params.commentNo);
    var parentNo = Number(request.params.parentNo);
    var author = request.session.username;
    var content = request.body.content;

    comment.update(courseNo, commentNo, parentNo, author, content);
    request.session.courseNo = Number(courseNo);
    response.redirect('/');
});

router.post('/delete/:courseNo/:commentNo/:parentNo', function(request, response) {
    var courseNo = request.params.courseNo;
    var commentNo = Number(request.params.commentNo);
    var parentNo = Number(request.params.parentNo);
    var author = request.session.username;

    comment.delete(courseNo, commentNo, parentNo, author);
    request.session.courseNo = Number(courseNo);
    response.redirect('/');
});


module.exports = router;