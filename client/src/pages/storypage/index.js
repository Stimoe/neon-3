import React, { Component } from "react";
import { Link } from "react-router-dom"
import "./style.css";
import { Redirect } from 'react-router-dom';
import axios from "axios";
import deckJson from "../../cards.json";
import enemies from "../../enemy.json";




class Storypage extends Component {

  constructor() {
    super();
    this.state = {
      winCount: 0,
      username: "",
      password: "",
      currentUserDeck: [],
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
      this.getCurrentUser()
      
    })
  }

  getCurrentUser = () => {
    let user = this.state.username
    axios.get('/api/user/currentUser', {
      params: {
        username: user
      }
    })
      .then(res => {
        let newUserDeck=res.data.userDeck
        let currentUserWinCount=res.data.winCount
        console.log(newUserDeck);
        console.log(newUserDeck.length);
        console.log(newUserDeck);
if(newUserDeck.length){
  this.setState({
        winCount: currentUserWinCount,
        currentUserDeck: newUserDeck,
      }, ()=> {
        console.log(this.state.currentUserDeck);
       
})
}

if (newUserDeck === undefined || newUserDeck.length == 0) {
  let basicDeck = deckJson
  this.setState({
    currentUserDeck: basicDeck,
  },()=>{
    console.log(this.state.currentUserDeck);
  })
}



      //   if(newUserDeck===undefined){
      //     let basicDeck = deckJson
      //     this.setState({
      //       currentUserDeck: basicDeck,
      //     },()=>{
      //       console.log(this.state.currentUserDeck);
      //     })
      //   }
      //   else {
      //   this.setState({
      //     winCount: currentUserWinCount,
      //     currentUserDeck: newUserDeck,
      //   }, ()=> {
      //     console.log(this.state.currentUserDeck);
         
        
      //   })
      // }
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
       pathname: '/battlepage',
       state: { 
         username: this.state.username,
         winCount: this.state.winCount,
         currentUserDeck: this.state.currentUserDeck
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


            <p> The year is 2116 and the the United Nations of Governments are on the brink of war with Coalition of Corporations. The Gaberial virus has shattered the loosely held peace and both parties are desperately looking for the cure as they believe it will give them the winning hand when the conflict begins.</p>

            <br></br>
            <p>Rumor on the street is that Dr. C Wheetman has found a cure but is going to hand it off to an unknown organization that believes the cure should be free for everyone</p>
            <br></br>
            <p>Thomas S. your loremaster has been given the mission to deliver the code for the cure but you’ve been betrayed by the Jonas Clan, both the Corporations and the Governments now know who you are and that you have the code. They have sent their top assets to retrieve it from you!
              </p>

          </div>
          <br></br>
          <button
  type="submit"
  className="btn mb-3 neon1 nes-pointer nes-btn"
  onClick={this.handleStart}
>
Start your Journey
</button>
        </div>
      </div>
    );
  }
}

export default Storypage;


