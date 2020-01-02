import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./style.css";
const mongoose = require('mongoose');
const User = mongoose.model('users');
// const Bcrypt = require("bcryptjs");

class Register extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     username: "",
  //     password: "",
  //     loggedInUser: "",
  //     url: "https://stimoe.github.io/expressNeonRainServer",
  //     // url:"http://localhost:5000",
  //     // url:"https://neon-rain-express-server.herokuapp.com",
  //     // url: "https://neon-rain-game-new.herokuapp.com",
  //     errors: {}
  //   };
  // }
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      loggedInUser: "",
      url: "https://stimoe.github.io/expressNeonRainServer",
      // url:"http://localhost:4000",
      // url:"https://neon-rain-express-server.herokuapp.com",
      // url: "https://neon-rain-game-new.herokuapp.com",
      errors: {}
    };
  }
  // setUserState(event) {
  //   let field = event.target.name;
  //   let value = event.target.value;
  //   this.state.user[field] = value;
  //   return this.setState({ user: this.state.user });
  // };



  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };




  handleChange = event => {
    console.log("change")
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }









  // //route for user login

  handleSignupForm = event => {

    event.preventDefault();

    axios.post('/api/user/register', { username: this.state.username, password: this.state.password }).then(res => {
      console.log("line 26 ", res.data, res.status)
      this.handleLoginFormSubmit();
    }).catch(err => {
      console.log(err.response);
      alert("Username already exists or password could not be validated")
    })
    
  }


  // handleLoginFormSubmit = () => {


  //   axios.post('/api/user/login', { username: this.state.username, password: this.state.password }, function (req, res) {
     
  //     User.findOne({
  //       where: {
  //         username: req.body.username
  //       }
  //     }).then(res => {
  //       console.log("line 26 ", res.data, res.status)
       
  //     }).catch(err => {
  //       console.log(err.response);
  //       alert("Username already exists or password could not be validated")
  //     })
  //     console.log("line 26 ", res.data, res.status)
  //   })
  // }
  handleLoginFormSubmit = () => {
  axios.post('/api/user/login', function (req, res, next) { 
    var username = req.body.username;
    var password = req.body.password;
  
    User.getUserByUsername(username)
      .then(function(user) {
          return bcrypt.compare(password, user.password);
      })
      .then(function(samePassword) {
          if(!samePassword) {
              res.status(403).send();
          }
          res.send("same!");
      })
      .catch(function(error){
          console.log("Error authenticating user: ");
          console.log(error);
          next();
      });
  });
  }


  render() {
    const { errors } = this.state;
    return (
      <div className="container inputS" >
        <div className="landing3">
          <div className="home-wrap3">
            <div className="home-inner3"></div>
          </div>
        </div>
        <div className="nes-container is-rounded is-dark">
          <div style={{ marginTop: "4rem" }} className="row">
            <div className="col s8 offset-s2">
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <h4>
                  <b>Register</b> below
                </h4>
                <p className="grey-text text-darken-1">
                  Already have an account? <Link className="login" to="/login">Log in</Link>
                </p>
              </div>
              <form>
                <div className="nes-field is-inline col s12">
                  <label htmlFor="username">Username</label>
                  <input
                    onChange={this.onChange}
                    value={this.state.username}
                    error={errors.username}
                    name="username"
                    type="text"
                    className="nes-input nes-pointer neon1"
                  />
                </div>
                <div className="nes-field is-inline col s12">
                  <label htmlFor="password">Password</label>
                  <input
                    onChange={this.onChange}
                    value={this.state.password}
                    error={errors.password}
                    name="password"
                    type="password"
                    className="nes-input nes-pointer neon1"
                  />
                </div>
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                  <button
                    type="submit"
                    className="loginBtn nes-pointer neon1 mb-3 nes-btn"
                    onClick={this.handleSignupForm}
                  >
                    Sign up
                  </button>

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Register;



