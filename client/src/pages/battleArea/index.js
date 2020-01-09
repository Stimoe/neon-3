import React, { Component } from "react";
import "./style.css";
import enemies from "../../enemy.json";
import axios from "axios";
import DeckBrain from "../../components/deck-managment";
import HealthBar from "../../components/plyr-healthbar";
import EHBar from "../../components/ehealthbar";
import { Redirect } from 'react-router-dom';
import deckJson from "../../cards.json";
import FireEm from './fire.gif';
import IdleEm from './idle.gif';
import Death from './death.gif';
import Player from './players.png'
import Rain from './rain.gif'
import GameWon from "../../components/gameWon"
import GameOver from "../../components/gameOver"
import EnemyAction from "../../components/enemiesActionModul"
import EnemyModal from "../../components/enemiesActionModul";
import { log } from "util";


class BattlePage extends Component {
  state = {
    currentUserDeck: [],
    username: '',
    winCount: 0,
    userHealth: 100,
    userArmor: 0,
    enemies,
    currentEnemyHealth: 1,
    currentEnemyArmor: 0,
    currentEnemyAbilities: [],
    currentEnemyAttack: 0,
    currentEnemyArmorGain: 0,
    playedCards: [],
    userTurnOver: false,
    frozen: false,
    redirect: false,
    enemyAction: "",
    maxEnemyHealth: 0,
    deckRecieved: false,
  };




  componentDidMount() {
    let currentUser = this.props.location.state.username
    let userCurrentDeck = this.props.location.state.currentUserDeck
    let currentWinCount = this.props.location.state.winCount

    this.setState({
      username: currentUser,
      winCount: currentWinCount,
      currentUserDeck: userCurrentDeck
    }, () => {
      let currentEnemy = enemies[this.state.winCount];
      let currentEnemyHealth = currentEnemy.health;
      let currentEnemyArmor = currentEnemy.armor;
      let newEnemyAbilities = currentEnemy.actions;
      let newEnemyAttack = currentEnemy.attack;
      let newEnemyArmorGain = currentEnemy.armorGain;
      this.setState({
        maxEnemyHealth: currentEnemyHealth,
        currentEnemyHealth: currentEnemyHealth,
        currentEnemyArmor: currentEnemyArmor,
        currentEnemyAbilities: newEnemyAbilities,
        currentEnemyAttack: newEnemyAttack,
        currentEnemyArmorGain: newEnemyArmorGain,
        deckRecieved: true
      });

    })
  }

  componentDidUpdate(prevprops, prevState) {
    let totalEnemies = enemies.length
    const turnEnded = this.state.userTurnOver === true;
    const frozen = this.state.frozen;


    if (this.state.currentEnemyHealth <= 0 && this.state.winCount === totalEnemies) {
      this.renderRedirectToGameWon()
    }

    if (this.state.userHealth <= 0) {
      this.renderRedirectToGameOver()
    }
    if (this.state.currentEnemyHealth <= 0) {
      let tempWins2 = this.state.winCount
      tempWins2 = tempWins2 + 1
      console.log(tempWins2);

      this.setState({
        winCount: tempWins2,
        currentEnemyHealth: 1
      }, () => {
        this.updateWinCount();
      })

    }
    if (turnEnded && !frozen) {
      this.firstEnemyAction();
    } else if (turnEnded && frozen) {
      this.setState({
        frozen: false
      });
    }
    if (this.state.userTurnOver === true) {

      setTimeout(function () {
        this.setState({ userTurnOver: false });
      }.bind(this), 2000);
    }
  }

  updateWinCount = () => {

    axios.patch('/api/user/winCount', { username: this.state.username, winCount: this.state.winCount }).then(res => {
      console.log(res.data);


    }).catch(err => {
      console.log(err.response);
      console.log("Username already exists or password could not be validated")
    }, () => {
      this.renderRedirectToAward()
    })
  }


  if(redirect) {
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






  renderRedirectToGameOver = () => {
    this.setState({
      redirect: true
    })
    if (redirect) {
      return <Redirect to={{
        pathname: '/gameLost',
        state: {
          username: this.state.username,
        }
      }}
      />
    }

  }

  renderRedirectToGameWon = () => {
    this.setState({
      redirect: true
    })

    if (redirect) {
      return <Redirect to={{
        pathname: '/gameWon',
        state: {
          username: this.state.username,
        }
      }}
      />
    }
  }

  renderRedirectToAward = () => {
    this.setState({
      redirect: true
    })
    if (redirect) {
      return <Redirect to={{
        pathname: '/award',
        state: {
          username: this.state.username,
          winCount: this.state.winCount,
          currentUserDeck: this.state.currentUserDeck
        }
      }}
      />
    }
  }

  userAttack = (damage) => {
    let newArmor = 0;
    let gameWon = false;
    let newHealth;
    let newCurrentEnemyHealth = this.state.currentEnemyHealth
    let newCurrentEnemyArmor = this.state.currentEnemyArmor
    console.log("Here is damage ", damage)
    console.log("armor ", newCurrentEnemyArmor)
    if (newCurrentEnemyArmor >= damage) {
      let tempArmor = this.state.currentEnemyArmor;
      newArmor = tempArmor - damage;
      newHealth = newCurrentEnemyHealth
      console.log(newArmor)
      // this.setState({
      //   currentEnemyArmor:newArmor
      // })
      return {
        newArmor,
        newHealth
      }
    }
    else {
      let newDamage = damage - newCurrentEnemyArmor;
      let tempHealth = this.state.currentEnemyHealth;
      newHealth = tempHealth - newDamage;
      newArmor = 0
      if (newHealth <= 0) {
        let tempWins2 = this.state.winCount
        console.log(tempWins2);

        tempWins2 = tempWins2 + 1
        console.log(tempWins2)
        this.setState({
          winCount: tempWins2
        })
      }
      return {
        newHealth,
        newArmor,
        gameWon
      }
    }
    // console.log(newArmor, newHealth)
    // return {
    //   newArmor,
    //   newHealth,
    //   gameWon
    // };
  };

  firstEnemyAction = () => {
    let possibleEnemyActions = this.state.currentEnemyAbilities;
    let newEnemyAttack = this.state.currentEnemyAttack;
    let newEnemyArmor = this.state.currentEnemyArmor;
    let newEnemyArmorGain = this.state.currentEnemyArmorGain;
    let newUserHealth = this.state.userHealth;
    let newUserArmor = this.state.userArmor;
    // console.log(possibleEnemyActions.length + 1);

    let randomAction = Math.floor(Math.random() * possibleEnemyActions.length + 1
    );
    console.log("The action the enemy did ", randomAction);

    switch (randomAction) {
      case 1:
        //enemy attacks!!
        if (newUserArmor >= newEnemyAttack) {
          let newArmor = newUserArmor - newEnemyAttack;
          let newEnemyAttackAction = ("Enemy Attacked for " + newEnemyAttack)
          this.setState({
            userArmor: newArmor,
            enemyAction: newEnemyAttackAction,
            userTurnOver: false
          });
        }


        else {
          let newAttack = newEnemyAttack - newUserArmor;
          let newHealth = newUserHealth - newAttack;
          this.setState({
            userHealth: newHealth,
            userArmor: 0,
            userTurnOver: false
          });

        }
        this.setState({
          userTurnOver: false
        })
        break;
      case 2:
        //enemy gains armor
        let newArmor = newEnemyArmor + newEnemyArmorGain;
        let newEnemyAction = ("Enemy Gained Armor for " + newEnemyArmorGain)
        this.setState({
          currentEnemyArmor: newArmor,
          enemyAction: newEnemyAction,
          userTurnOver: false
        });
        return;
    }

  };


  handlePlayedCards = (playedCards) => {
    // console.log("cards array ",playedCards);

    let damage = 0;
    // let currentArmor = this.state.userArmor;
    let selfDamage = 0;
    let health = this.state.userHealth;
    let newEnemyArmor;
    let userHealValue = 0;
    let newHealth = 0;
    let multiplier = 1
    // let newDamage = 0
    let armor = this.state.userArmor;
    playedCards.forEach(card => {

      // console.log(card);


      switch (card.id) {

        case 1:
          // newDamage= multiplier * card.damage
          // console.log(multiplier, newDamage);
          //   newDamage=card.damage
          //   console.log(newDamage);
          damage += card.damage * multiplier
          // damage = newDamage;
          console.log(damage);

          break;

        case 2:
          armor += card.armor;

          break;
        case 3:
          damage += card.damage;
          selfDamage += card.selfDamage;
          break;
        case 4:
          multiplier = card.multiplier
          console.log(multiplier);
          damage = damage * multiplier
          console.log(damage);

          break;
        case 5:
          newEnemyArmor = 0;
          this.setState({
            currentEnemyArmor: newEnemyArmor
          });
          break;
        case 6:
          userHealValue = card.healValue;
          newHealth = this.state.userHealth + userHealValue;
          this.setState({
            userHealth: newHealth
          });
          break;
        case 7:
          this.setState({
            frozen: true
          });
          return;
      }
    });
    if (damage) {
      let { newArmor, newHealth, gameWon } = this.userAttack(damage);
      // let turnOver = !this.state.userTurnOver;
      let tempHealth = health - selfDamage;
      if (gameWon) {
        let tempWin = this.state.winCount + 1;
        this.setState({
          winCount: tempWin
        });
      }
      console.log(newArmor, newHealth)
      this.setState({
        currentEnemyArmor: newArmor,
        currentEnemyHealth: newHealth,
        // userTurnOver: turnOver,
        // userArmor: armor,
        userHealth: tempHealth
      });
    }
    else {


      this.setState({
        // userTurnOver: turnOver,
        userArmor: armor
      });
    }
    this.setState({
      userTurnOver: true
    })
  };


  render() {

    if (this.state.deckRecieved) {

      const userTurnOver = this.state.userTurnOver;
      let enemyHealth = this.state.currentEnemyHealth;

      return (
        <div>
          <div className="landing2"></div>
          <div className="rain"></div>
          <div className="row bars">
            <div className="health col-md-6">
              <div>
                <progress
                  className="nes-progress health is-error"
                  value={this.state.userHealth}
                  max="100"
                ></progress>
              </div>
              <p className="hb">Player:{this.state.userHealth}</p>
              <p className="hb">Armor:{this.state.userArmor}</p>
              <img className="player" src={Player}></img>

            </div>
            <div className="emhealth col-md-6">
              <div>
                <progress
                  className="nes-progress emhealth is-error"
                  value={this.state.currentEnemyHealth}
                  max={this.state.maxEnemyHealth}
                ></progress>
              </div>
              <p className="em">Enemy:{this.state.currentEnemyHealth}</p>
              <p className="em">Armor:{this.state.currentEnemyArmor}</p>
            </div>

            <div>

              {/* <EnemyModal turnEnded = {this.state.userTurnOver}/> */}
            </div>


          </div>
          <div>
            <div>
              {userTurnOver ? (
                <img className="emm1" src={FireEm} ></img>
              ) : (
                  <img className="emm" src={IdleEm}></img>
                )}
              {
                (this.state.currentEnemyHealth <= 0)
                  ? <img className="emm1" src={Death} ></img>
                  : null
              }

            </div>
          </div>
          <div className="d-flex carddeck justify-content-center">
            <DeckBrain
              readPlayed={this.handlePlayedCards}
              hasWon={this.state.winCount}
              currentDeck={this.state.currentUserDeck}


            />

          </div>
        </div>
      );
    }

    else {
      return null;
    }
  }
}
export default BattlePage;

