
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(`./data/comment.json`);
db = low(adapter);

db.defaults({
    0: {},
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

cnt = [0, 0,0,0,0,0, 0,0,0,0,0];



comment = {

    authCheck : function(courseNo, commentNo, author) {
        if (db.get(courseNo).find({commentNo: commentNo}).value() == undefined) return false;
        if (db.get(courseNo).find({commentNo: commentNo}).get("author").value() != author) return false;
        return true;
    },

    read : function() {
        return Object.values(db.value());
    },

    create : function(courseNo, parentNo, author, content) {

        if (parentNo == 0) {
            db.get(courseNo).get("comment")
            .push({
                commentNo: ++cnt[Number(courseNo)],
                parentNo: parentNo,
                author: author,
                content: content,

                reply: []
            }).write();

        } else {
            db.get(courseNo).get("comment")
            .find({commentNo: parentNo}).get("reply")
            .push({
                commentNo: ++cnt[Number(courseNo)],
                parentNo: parentNo,
                author: author,
                content: content
            }).write();
        }

    },

    update : function(courseNo, commentNo, parentNo, author, content) {
        if (this.authCheck(courseNo, commentNo, author) === false) return;

        if (parentNo == 0) {
            db.get(courseNo).get("comment")
           .find({commentNo: commentNo})
           .assign({content: content})
           .write();

        } else {
            db.get(courseNo).get("comment")
            .find({commentNo: parentNo}).gt("reply")
            .assign({content: content})
            .write();
        }
        
    },

    delete : function(courseNo, commentNo, parentNo, author) {
        if (this.authCheck(courseNo, commentNo, author) === false) return;

        if (parentNo == 0) {
            db.get(courseNo).get("comment")
            .remove({commentNo: commentNo})
            .write();

        } else {
            db.get(courseNo).get("comment")
            .find({commentNo: parentNo}).get("reply")
            .remove({commentNo: commentNo})
            .write();
        }

    },

}



module.exports = comment;

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