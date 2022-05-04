const express = require('express');
const router = express.Router();



const auth_data = require("../data/auth_data.json");

router.get('/login', function(request, response) {
    response.render('login');
})

router.post('/login_request', function(request, response) {
    var name = request.body.name;
    var password = request.body.password;

    if (auth_data.some(user => (user.name == name && user.password == password))) {
        request.session.is_logined = true;
        request.session.username = name;
        request.session.save(function() {
            response.redirect('course');
        });
    } else {
        response.redirect('login');
    }
})

module.exports = router;

