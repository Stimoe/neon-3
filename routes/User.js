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
res.send(user.username)
res.send(user.password)
    })
    
    
    })
}


// .post("/register", async (req, res) => {
//     console.log("in here");
//     user = await User.findOne({ email: req.body.email }) 
//       .then(user => {
//         console.log("in here");
//         if (user) {
//           console.log("2");
//           return res.status(400).json({ email: "Email address already exists" });
//         } else {
//           const newUser = new User({
//             first: req.body.first,
//             last: req.body.last,
//             email: req.body.email,
//             password: req.body.password
//           });