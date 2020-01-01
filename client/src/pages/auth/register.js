import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./style.css";

class Register extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     username: "",
  //     password: "",
  //     loggedInUser: "",
  //     url: "https://stimoe.github.io/expressNeonRainServer",
  //     // url:"http://localhost:4000",
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
  setUserState(event) {
    let field = event.target.name;
    let value = event.target.value;
    this.state.user[field] = value;
    return this.setState({ user: this.state.user });
  };

  // onChange = e => { this.setUserState.bind(this) }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };


  //   handleSignupForm = event => {
  //     event.preventDefault();

  //   const user = {
  //     username: this.state.username,
  //     password: this.state.password
  //   };

  //   Axios.post(`https://stimoe.github.io/Express-Neon_rain/register`, { user }, { withCredentials: true })
    
  //     .then(res => {
  //       console.log("this is the  res ", res);
  //       console.log("this is res.data ", res.config.data);
        
  //     })
  // }
      


    























  handleChange = event => {
    console.log("change")
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }
 
    createCORSRequest = (method, url) => {
      var xhr = new XMLHttpRequest();
      if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
      }else {
        // CORS not supported.
        xhr = null;
      }
      return xhr;
    }

    // Helper method to parse the title tag from the response.
    // handleSignupForm = event => {
    //   var xhr = new XMLHttpRequest()
    //   const user = {
    //             username: this.state.username,
    //             password: this.state.password
    //           };
    //   // get a callback when the server responds
    //   xhr.addEventListener('load', () => {
    //     // update the state of the component with the result here
    //     console.log(xhr.responseText)
    //   })
    //   // open the request with the verb and the url
    //   xhr.open('POST', 'https://stimoe.github.io/Express-Neon_rain/register')
    //   // send the request

    //   // xhr.send(JSON.stringify({ username: this.state.username, password: this.state.password }))
    //   xhr.send({ user })
    // }

    // Make the actual CORS request.
//     handleSignupForm = event => {

//       const xhr = new XMLHttpRequest();
// xhr.open('POST', 'https://stimoe.github.io/Express-Neon_rain/register');
// xhr.setRequestHeader('X-PINGOTHER', 'pingpong');
// xhr.setRequestHeader('Content-Type', 'application/xml');
// xhr.onreadystatechange = handler;
// const user = {
//   username: this.state.username,
//   password: this.state.password
// };
// xhr.send({ user }); 

//     }
  
    handleSignupForm = event => {
      const user = {
        username: this.state.username,
        password: this.state.password
      };
      var xhr = new XMLHttpRequest()
     
      // get a callback when the server responds
      xhr.addEventListener('load', () => {
        // update the state of the component with the result here
        console.log(xhr.responseText)
      })
      // open the request with the verb and the url
      xhr.open('POST', 'https://express-neon-rain.herokuapp.com/register')
      // send the request
      // xhr.send(JSON.stringify({ user }))
      xhr.send({ user })

    }

  //   async handleSignupForm(){
  //     // const user = {
  //     //       username: this.state.username,
  //     //       password: this.state.password
  //     //     };
  //     const response = await axios.post(
  //       'https://stimoe.github.io/Express-Neon_rain/register',
  //       { username: "stimoe"},
  //       { headers: { 'Content-Type': 'application/json' } }
  //     )
  //     console.log(response.data)
  // }




  // handleSignupForm = event => {


  //   this.makeCorsRequest()
  //   createCORSRequest = (method, url) => {
  //     var xhr = new XMLHttpRequest();
  //     if ("withCredentials" in xhr) {
  //       // XHR for Chrome/Firefox/Opera/Safari.
  //       xhr.open(method, url, true);
  //     } else {
  //       // CORS not supported.
  //       xhr = null;
  //     }
  //     return xhr;
  //   }


  //   // Make the actual CORS request.
  //   makeCorsRequest = () => {
  //     console.log("this is what is in state ", this.state.username, this.state.password)

  //     // This is a sample server that supports CORS.
  //     var url = 'http://localhost:4000/users';

  //     var xhr = createCORSRequest('POST', url);
  //     xhr.withCredentials = true;
  //     if (!xhr) {
  //       console.log('CORS not supported');
  //       return;
  //     }

  //     // Response handlers.
  //     xhr.onload = function () {
  //       var text = xhr.responseText;

  //       console.log('Response from CORS request to ' + url + ': ' + text);
  //     };

  //     xhr.onerror = function () {
  //       console.log('Woops, there was an error making the request.');
  //     };

  //     xhr.send({ username: this.state.username, password: this.state.password });
  //   }

  // }



  // handleLoginFormSubmit = event => {


  //   event.preventDefault();
  //   console.log(this.setState.username, this.state.password);

  //   axios.post(`${this.state.url}/api/users/login`, { username: this.state.username, password: this.state.password }, { withCredentials: true }).then(res => {
  //     console.log(res.data, res.status)
  //     this.setState({
  //       username: "",
  //       password: "",
  //       loggedInUser: res.data.user
  //     });
  //     this.props.history.push("/storypage")
  //   }).catch(err => {
  //     console.log(err.response);
  //     this.setState({
  //       username: "",
  //       password: "",
  //       loggedInUser: ""
  //     })
  //   })
  // }



  // handleChange = event => {
  //   console.log("change")
  //   const { name, value } = event.target;
  //   this.setState({
  //     [name]: value
  //   })
  // }
 










  render() {
    const { errors } = this.state;
    return (
      <div className="container inputS">
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



