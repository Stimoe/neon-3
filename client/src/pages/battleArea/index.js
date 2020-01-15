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
import { log } from "util";


class BattlePage extends Component {
  
  constructor(props) {
    super(props);
  this.state = {
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
    currentEnemyAttackGain: 0,
    currentEnemyArmorGain: 0,
    currentBonusEnemyArmorGain: 0,
    playedCards: [],
    userTurnOver: false,
    frozen: false,
    redirect: false,
    enemyAction: "",
    maxEnemyHealth: 0,
    deckRecieved: false,
    userLost: false,
    userWon: false
  };
}



  componentDidMount() {

    let currentUser = this.props.location.state.username
    let userCurrentDeck = this.props.location.state.currentUserDeck
    let currentWinCount = this.props.location.state.winCount



    if (userCurrentDeck === undefined || userCurrentDeck.length == 0) {
      let basicDeck = deckJson
      this.setState({
        winCount: currentWinCount,
        currentUserDeck: basicDeck,
        username: currentUser,
      }, () => {
        let currentEnemy = enemies[this.state.winCount];
        let currentEnemyHealth = currentEnemy.health;
        let currentEnemyArmor = currentEnemy.armor;
        let newEnemyAbilities = currentEnemy.actions;
        let newEnemyAttack = currentEnemy.attack;
        let newEnemyArmorGain = currentEnemy.armorGain;
        let newEnemyAttackGain = currentEnemy.attackGain
        this.setState({
          maxEnemyHealth: currentEnemyHealth,
          currentEnemyHealth: currentEnemyHealth,
          currentEnemyArmor: currentEnemyArmor,
          currentEnemyAbilities: newEnemyAbilities,
          currentEnemyAttack: newEnemyAttack,
          currentEnemyArmorGain: newEnemyArmorGain,
          currentEnemyAttackGain: newEnemyAttackGain,
          deckRecieved: true
        });

      })
    }

    else {
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
        let newEnemyAdditionalArmorGain=currentEnemy.additionalArmorGain
        this.setState({
          maxEnemyHealth: currentEnemyHealth,
          currentEnemyHealth: currentEnemyHealth,
          currentEnemyArmor: currentEnemyArmor,
          currentEnemyAbilities: newEnemyAbilities,
          currentEnemyAttack: newEnemyAttack,
          currentEnemyArmorGain: newEnemyArmorGain,
          currentBonusEnemyArmorGain: newEnemyAdditionalArmorGain,
          deckRecieved: true
        });

      })
    }
  }

  componentDidUpdate(prevprops, prevState) {
    let totalEnemies = enemies.length
    const turnEnded = this.state.userTurnOver === true;
    const frozen = this.state.frozen;
console.log(this.state.roundEnemyAction);


    if (this.state.currentEnemyHealth <= 0 && this.state.winCount === totalEnemies) {
      this.setState({
        userWon: true
      })
    }

    if (this.state.userHealth <= 0) {
      this.setState({
        userLost: true
      })
    }
    if (this.state.currentEnemyHealth <= 0) {
      let tempWins2 = this.state.winCount
      tempWins2 = tempWins2 + 1
      console.log(tempWins2);

      this.setState({
        winCount: tempWins2,
        currentEnemyHealth: 1
      }, () => {
        console.log(this.state.winCount);
        
        this.updateWinCount()
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
    console.log("here");

    axios.patch('/api/user/winCount', {
      params: {
        username: this.state.username,
        winCount: this.state.winCount
      }
    }).then(res => {
      console.log(res.data);
      this.setState({
        redirect: true
      })

    }).catch(err => {
      console.log(err.response);
      console.log("Username already exists or password could not be validated")
    })
  }








  renderRedirectToGameOver = () => {
    const { redirect } = this.state;
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
    const { redirect } = this.state;

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
    const { redirect } = this.state;
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

    if (newCurrentEnemyArmor >= damage) {
      let tempArmor = this.state.currentEnemyArmor;
      newArmor = tempArmor - damage;
      newHealth = newCurrentEnemyHealth


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
    
      return {
        newHealth,
        newArmor,
        gameWon
      }
    }

  };

  firstEnemyAction = () => {
    let possibleEnemyActions = this.state.currentEnemyAbilities;
    let newEnemyAttack = this.state.currentEnemyAttack;
    let currentEnemyAttackPower=this.state.currentEnemyAttack;
    let newEnemyAttackGain=this.state.currentEnemyAttackGain;
    let newEnemyArmor = this.state.currentEnemyArmor;
    let newEnemyArmorGain = this.state.currentEnemyArmorGain;
    let newUserHealth = this.state.userHealth;
    let newUserArmor = this.state.userArmor;
    let newBonusEnemyArmor=this.state.currentBonusEnemyArmorGain
    // console.log(possibleEnemyActions.length + 1);

    let randomAction = Math.floor(Math.random() * possibleEnemyActions.length + 1
    );
    console.log("The action the enemy did ", randomAction);

    switch (randomAction) {
      case 1:
        let newEnemyAttackAction = ("Enemy Attacked for " + currentEnemyAttackPower)
        console.log(newEnemyAttackAction);
        this.setState({
          enemyAction: newEnemyAttackAction,
        })
        if (newUserArmor >= newEnemyAttack) {
          let newArmor = newUserArmor - newEnemyAttack;
          
          this.setState({
            userArmor: newArmor,
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
        console.log(newEnemyAction);
        
        this.setState({
          currentEnemyArmor: newArmor,
          enemyAction: newEnemyAction,
          userTurnOver: false
        });
        break;
        case 3:
          let newEnemyAttackPower=this.state.currentEnemyAttack
          let newEnemyAttackBonus= ("Enemy gained " + newEnemyAttackGain + " attack damage everytime it attacks")
          newEnemyAttackPower=(newEnemyAttackPower+newEnemyAttackGain)
          this.setState({
            enemyAction: newEnemyAttackBonus,
            currentEnemyAttack: newEnemyAttackPower,
            userTurnOver: false
          });
          break;
          case 4:
          let newCurrentEnemyArmor=this.state.currentEnemyArmorGain
          let messageOfArmorGain=("Enemy gained " + newCurrentEnemyArmorGain + " everytime it gains armor")
          newCurrentEnemyArmor = (newCurrentEnemyArmor + newBonusEnemyArmor)
          this.setState({
            enemyAction: messageOfArmorGain,
            currentEnemyArmorGain: newCurrentEnemyArmor,
            userTurnOver: false
          })
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
          newHealth = this.state.userHealth;
          newHealth=newHealth + userHealValue
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
      // if (gameWon) {
      //   let tempWin = this.state.winCount + 1;
      //   this.setState({
      //     winCount: tempWin
      //   });
      // }
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


    const { userLost } = this.state;
    const { userWon } = this.state;
    const { redirect } = this.state;
    const { deckRecieved } = this.state;
    const { userTurnOver } = this.state;
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
    if (userWon) {
      return <Redirect to={{
        pathname: '/gameWon',
        state: {
          username: this.state.username,
        }
      }}
      />
    }

    if (userLost) {
      return <Redirect to={{
        pathname: '/gameLost',
        state: {
          username: this.state.username,
        }
      }}
      />
    }


    if (deckRecieved) {
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
              roundEnemyAction={this.state.enemyAction}

            />

          </div>
    
        </div>

)

             



    }

    else {
      return null;
    }
  }
}
export default BattlePage;

