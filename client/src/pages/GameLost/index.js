import React, { Component } from "react";
import { Link } from "react-router-dom"
import "./style.css";
import { Redirect } from 'react-router-dom';
import axios from "axios";






class GameLost extends Component {

  constructor() {
    super();
    this.state = {
      winCount: 0,
      username: "",
      password: "",
      loggedInUser: "",
      redirect: false,
      errors: {}
    };
  }

  componentDidMount() {

    let currentUser = this.props.location.state.username

    this.setState({
      username: currentUser,
    }, () => {
      this.resetDatabase()
      //testing this function  
    })
  }
  resetDatabase = () => {
    console.log(this.state.username)
    let user = this.state.username

    axios.patch('/api/user/reset', {
      params: {
        username: user
      }
    })
      .then(res => {
        // console.log("line 26 ", res.data)
      }).catch(err => {
        console.log(err.response);
        console.log("Username already exists or password could not be validated")
      })
  }



  handleStart= event => {
    // console.log(this.state.username)
    event.preventDefault();
    this.setState({
      redirect: true,
    });
   
    
  }


  render() {

    const { redirect } = this.state;
  

    if (redirect) {
      return <Redirect to={{
       pathname: '/storypage',
       state: { 
         username: this.state.username,
        }
   }}
   />
    }






    return (
      <div>
        <div className="landing1">
          <div className="home-wrap1">
            <div className="home-inner1"></div>
          </div>
        </div>
        <div className="container">
          <div>
            <h1 className="neon3 head">Neon Rain</h1>
          </div>
          <br></br>
          <div className=" neon26 nes">


          <h1 className="neon3 head">Game over!!!</h1>

          </div>
          <br></br>
          <button
  type="submit"
  className="btn mb-3 neon1 nes-pointer nes-btn"
  onClick={this.handleStart}
>
Restart your Journey
</button>
        </div>
      </div>
    );
  }
}

export default GameLost;
