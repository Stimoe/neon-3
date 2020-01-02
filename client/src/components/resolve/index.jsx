import React, {Component} from "react";
import cards from "../../cards.json";
import AiBrain from "../Ai-logic";

switch(cards.name){
    case "attack":
        userAttack(cards.damage)
        return;

    case "armor":
        armor(cards.armor)
        return;

}

class Resolve extends Component {

    state = {
        enemyHealth=100,
        enemyAction=[]
      };



    userAttack = () => {
        let newHealth = this.state.enemyHealth-this.props
        this.setState({
            enemyHealth: newHealth
        })


}

 armor = () =>{

}
}
export default Resolve;