const express = require('express');
const router = express.Router();

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync(`./data/comment.json`);
db = low(adapter);

db.defaults({
    1: {number: 0},
    2: {number: 0},
    3: {number: 0},
    4: {number: 0},
    5: {number: 0},
    6: {number: 0},
    7: {number: 0},
    8: {number: 0},
    9: {number: 0},
    10: {number: 0}
}).write();



/* STRUCTURE
{
    courseNo : {
        currentNo: 
        [
            {
                commentNo:
                parentNo:
                author:
                content:
            }
        ]
    }
}
*/

/* METHOD
get
post
put
delete
*/



comment = {
    authCheck : function(courseNo, commentNo, author) {
        if (db.get(courseNo).find({commentNo: commentNo}).value() == undefined) return false;
        if (db.get(courseNo).find({commentNo: commentNo}).get("author").value() != author) return false;
        return true;
    },

    get : function(courseNo) {
        return db.get(courseNo).value();
    },

    post : function(courseNo, parentNo, author, content) {
        db.update(courseNo, currentNo => currentNo + 1).write();
        let num = db.get(courseNo).get(commentNo);

        db.get(courseNo)
        .push({
            contentNo: num,
            parentNo: parentNo,
            author: author,
            content: content
        }).write();
    },

    put : function(courseNo, commentNo, author, content) {
        if (this.authCheck(courseNo, commentNo, author) === false) return;

        db.get(courseNo)
        .find({commentNo: commentNo})
        .assign({content: content})
        .write();
    },

    delete : function(courseNo, commentNo, author) {
        if (this.authCheck(courseNo, commentNo, author) === false) return;

        db.get(courseNo)
        .remove({commentNo: commentNo})
        .write();
    },

}



router.post('/get', function(request, response) {
    var courseNo = request.params.courseNo;
    var data = comment.get(courseNo);
    response.send(data);
});

router.post('/post/:courseNo/:parentNo/', function(request, response) {
    var courseNo = request.params.courseNo;
    var parentNo = request.params.parentNo;
    var author = request.body.author;
    var content = request.body.content;

    comment.post(courseNo, parentNo, author, content);
    response.redirect('/')
});

router.post('/put/:courseNo/:commentNo', function(request, response) {
    var courseNo = request.params.courseNo;
    var commentNo = request.params.commentNo;
    var author = request.session.username;
    var content = request.body.content;

    comment.post(courseNo, commentNo, author, content);
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