
var Mongoose = require('mongoose'),

Bcrypt = require("bcryptjs");



module.exports = (app) => {


    Mongoose.Promise = global.Promise;
Mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/neon-rain`);
    
    
    
    const UserSchema = new Mongoose.Schema({
        username: String,
        password: String
    });
    
    UserSchema.pre("save", function(next) {
        if(!this.isModified("password")) {
            return next();
        }
        this.password = Bcrypt.hashSync(this.password, 10);
        next();
    });
    
    UserSchema.methods.comparePassword = function(plaintext, callback) {
        return callback(null, Bcrypt.compareSync(plaintext, this.password));
    };


    const UserModel = new Mongoose.model("user", UserSchema);





    app.post("/api/user/register", async (request, response) => {
        try {
            var user = new UserModel(request.body);
            var result = await user.save();
            response.send(result);
        } catch (error) {
            response.status(500).send(error);
        }
    });

    app.post("/api/user/login", async (request, response) => {
        try {
            var user = await UserModel.findOne({ username: request.body.username }).exec();
            // response.send({ user })
            // response.send(user)
            
            
            if(!user) {
                return response.status(400).send({ message: "The username does not exist" });
            }
            user.comparePassword(request.body.password, (error, match) => {
                if(!match) {
                    return response.status(400).send({ message: "The password is invalid" });
                }
            });
            user.comparePassword(request.body.password, (error, match) => {
                if(match) {
                    response.send({ message: "The username and password combination is correct!" });
                }
            });
         
        } catch (error) {
            response.status(500).send(error);
        }
    });


}