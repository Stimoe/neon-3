var db = require('../models/User');
var bcrypt = require('bcryptjs');
const saltRounds = 10;
module.exports = (app) => {
app.post('/api/user/register', function (req, res) {
    bcrypt.hash(req.body.password, saltRounds, function (err,   hash) {
   db.User.create({
     name: req.body.username,
     password: hash
     }).then(function(data) {
      if (data) {
      res.redirect('/storypage');
      }
    });
   });
  });

  app.post('/api/user/login', function (req, res) {
    db.User.findOne({
         where: {
             username: req.body.username
                }
    }).then(function (user) {
        if (!user) {
           res.redirect('/register');
        } else {
bcrypt.compare(req.body.password, user.password, function (err, result) {
       if (result == true) {
           res.redirect('/storypage');
       } else {
        res.send('Incorrect password');
        res.redirect('/login');
       }
     });
    }
 });
});
}