const express = require('express')
const router = express.Router()

const lowdb = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('data/comment.json')
const comment_db = lowdb(adapter);



/* data 형식 :
username
body : 

*/




router.post('/upload', function(request, response) {

});

router.post('/modify', function(request, response) {
    
});

router.post('/delete', function(request, response) {
    var lectureNum = request.body.num;
    ㅍ

});



module.exports = Router;