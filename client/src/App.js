import React from 'react';

import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/home/home.js";
import Leaderboards from "./pages/leaderboard"
import BattlePage from "./pages/battleArea"
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import Save from "./pages/award/index.js";
import Storypage from "./pages/storypage"
import Login2 from "./pages/auth/auth";
import Register2 from "./pages/auth/auth";



function App() {

  
  return (

   
      <Router>
        <div>
  
        <Route exact path="/rules" component={Leaderboards} />
        <Route exact path="/" component={Home} />   
        <Route exact path="/battlepage" component={BattlePage} />  
        <Route exact path="/register" component={Register} />
        <Route exact path="/register2" component={Register2} />
        <Route exact path="/login2" component={Login2} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/award" component={Save} />
          <Route exact path="/storypage" component={Storypage} />
      </div>
        </Router>

   

  );
}


export default App
