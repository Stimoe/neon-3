var bcrypt = require('bcryptjs');
var User = require('../models/User');
const saltRounds = 10

module.exports = (app) => {

    app.post('/api/user/register', function (req, res, next) {
        var myData = new User(req.body);
  myData.save()
    .then(item => {
      res.send("item saved to database");
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

    app.post('/api/user/login', async (req, res) => {
        //email and password
        const username = req.body.username
        const password = req.body.password
    // res.send(username)

    user = await User.findOne({ username: req.body.username })
    

    .then(user => {
        res.send(user.password, password)
        // bcrypt.compare(password, user.password, function(err, res) {
        //     if (err){
        //         res.status(403).send();
        //     }
        //     if (res){
        //       res.send("true")
        //     } else {
        //       // response is OutgoingMessage object that server response http request
        //       return res.json({success: false, message: 'passwords do not match'});
        //     }
        //   });
    })
    
    
    })
}

// bcrypt.compare("B4c0/\/", hash, function(err, res) {
//     // res === true
// });