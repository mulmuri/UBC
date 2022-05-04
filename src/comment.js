const express = require('express');
const router = express.Router();

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');



const adapter = new FileSync(`./data/comment.json`);
db = low(adapter);

db.defaults({
    1: {comment: []},
    2: {comment: []},
    3: {comment: []},
    4: {comment: []},
    5: {comment: []},
    6: {comment: []},
    7: {comment: []},
    8: {comment: []},
    9: {comment: []},
    10: {comment: []}
}).write();

cnt = [0,1,1,1,1,1,1,1,1,1,1];

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
create
read
update
delete
*/



comment = {
    authCheck : function(courseNo, commentNo, author) {
        if (db.get(courseNo).find({commentNo: commentNo}).value() == undefined) return false;
        if (db.get(courseNo).find({commentNo: commentNo}).get("author").value() != author) return false;
        return true;
    },

    read : function(courseNo) {
        return db.get(courseNo).value();
    },

    create : function(courseNo, parentNo, author, content) {

        db.get(courseNo).get("comment")
        .push({
            contentNo: cnt[Number(courseNo)]++,
            parentNo: parentNo,
            author: author,
            content: content
        }).write();
    },

    update : function(courseNo, commentNo, author, content) {
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



router.post('/read', function(request, response) {
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