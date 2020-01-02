
// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import Axios from "axios";
// import "./style.css";


// class Register extends Component {
//   constructor() {
//     super();
//     this.state = {
//       username: "",
//       password: "",
//       loggedInUser: "",
//       // url: "https://stimoe.github.io/expressNeonRainServer",
//       url:"http://localhost:8080",
//       errors: {}
//     };
//   }

//   handleSignupFormSubmit = event => {
//     event.preventDefault();
//     const newUser = {
//       username: this.state.username,
//       password: this.state.password,
//     };
//     Axios.post(`${this.state.url}/api/users/register`, { username: this.state.username, password: this.state.password }, { withCredentials: true }).then(res => {
//       console.log("line 26 ", res.data, res.status)
//       this.handleLoginFormSubmit();
//     }).catch(err => {
//       console.log(err.response);
//       alert("Username already exists or password could not be validated")
//     })
//   }
//   handleLoginFormSubmit = event => {
//     if (event) {

//       event.preventDefault();
//     }
//     Axios.post(`${this.state.url}/api/users/login`, { username: this.state.username, password: this.state.password }, { withCredentials: true }).then(res => {
//       console.log(res.data, res.status)
//       this.setState({
//         username: "",
//         password: "",
//         loggedInUser: res.data.user
//       });
//       this.props.history.push("/storypage")
//     }).catch(err => {
//       console.log(err.response);
//       this.setState({
//         username: "",
//         password: "",
//         loggedInUser: ""
//       })
//     })
//   }

//   componentDidMount() {
//     this.readSessions();
//   }

//   handleChange = event => {
//     console.log("change")
//     const { username, value } = event.target;
//     this.setState({
//       [username]: value
//     })
//   }
//   onChange = e => {
//     this.setState({ [e.target.name]: e.target.value });
//   };

//   readSessions = () => {
//     Axios.get(`${this.state.url}/api/users/readsessions`, { withCredentials: true }).then(res => {
//       console.log(res.data)
//       this.setState({ loggedInUser: res.data.user })
//     })
//   }





//   render() {
//     const { errors } = this.state;
//     return (
//       <div className="container inputS">
//         <div className="landing3">
//           <div className="home-wrap3">
//             <div className="home-inner3"></div>
//           </div>
//         </div>
//         <div className="nes-container is-rounded is-dark">
//           <div style={{ marginTop: "4rem" }} className="row">
//             <div className="col s8 offset-s2">
//               <div className="col s12" style={{ paddingLeft: "11.250px" }}>
//                 <h4>
//                   <b>Register</b> below
//                 </h4>
//                 <p className="grey-text text-darken-1">
//                   Already have an account? <Link className="login" to="/login">Log in</Link>
//                 </p>
//               </div>
//               <form>
//                 <div className="nes-field is-inline col s12">
//                   <label htmlFor="username">Username</label>
//                   <input
//                     onChange={this.onChange}
//                     value={this.state.username}
//                     error={errors.username}
//                     name="username"
//                     type="text"
//                     className="nes-input nes-pointer neon1"
//                   />
//                 </div>
//                 <div className="nes-field is-inline col s12">
//                   <label htmlFor="password">Password</label>
//                   <input
//                     onChange={this.onChange}
//                     value={this.state.password}
//                     error={errors.password}
//                     name="password"
//                     type="password"
//                     className="nes-input nes-pointer neon1"
//                   />
//                 </div>
//                 <div className="col s12" style={{ paddingLeft: "11.250px" }}>
//                   <button
//                     type="submit"
//                     className="loginBtn nes-pointer neon1 mb-3 nes-btn"
//                     onClick={this.handleSignupFormSubmit}
//                   >
//                     Sign up
//                   </button>

//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
// export default Register;







