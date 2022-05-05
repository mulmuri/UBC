const express = require('express');
const router = express.Router();
const comment = require("./commentController.js");



router.post('/read/:courseNo', function(request, response) {
    var courseNo = request.params.courseNo;
    var data = comment.get(courseNo);
    response.send(data);
});

router.post('/create/:courseNo/:parentNo', function(request, response) {
    var courseNo = request.params.courseNo;
    var parentNo = Number(request.params.parentNo);
    var author = request.session.username;
    var content = request.body.content;

    comment.create(courseNo, parentNo, author, content);
    response.redirect('/');
});

router.post('/update/:courseNo/:commentNo', function(request, response) {
    var courseNo = request.params.courseNo;
    var commentNo = request.params.commentNo;
    var author = request.session.username;
    var content = request.body.content;

    comment.update(courseNo, commentNo, author, content);
    response.redirect('/')
});

router.post('/delete/:courseNo/:commentNo', function(request, response) {
    var courseNo = request.params.courseNo;
    var commentNo = request.params.commentNo;
    var author = request.session.username;

    comment.delete(courseNo, commentNo, author);
    response.redirect('/')
});


module.exports = router;