/** 
*   HandPositions Component
*   pop-up to choose the hand position
*   @props
*   reset: method to play again the game
*	play: method to play the game
*	changePlayerPosition: method set the selected hand position in parent component state
*	resetClass: string value to add dynamic css classes into pop-up container
*	game: object from parent to know the status of game
**/

import React from 'react';

import '@styles/components/hand.scss';

export class HandPositions extends React.Component {
    constructor(props) {
    	super(props);
    	this.state = {
    		 checked: false
    	}
    }

    checked(){
    	// this method to insure the human is choose his hand position .. validation
    	this.setState({
    		checked: true
    	})
    }
	
	render(){
		const { reset, play, changePlayerPosition, resetClass, game, resetGame } = this.props;
		const { checked } = this.state;

		return(
			<div className={`pop-up choose ${resetClass ? resetClass : ''}`}>
				{game && game.status == 'replay' &&
					<h2 className={game.color}>{game.winner}</h2>
				}
				<p>Choose your hand position</p>
				<div className="radio-button-container">
	                <div className="radio-button">
	                    <input id="scissors" name="position" type="radio" value="scissors" onChange={(e)=> {changePlayerPosition(e); this.checked()}} />
	                    <label className="scissors-player" htmlFor="scissors"></label>
	                </div>
	                <div className="radio-button">
	                	<input id="rock" name="position" type="radio" value="rock" onChange={(e)=> {changePlayerPosition(e); this.checked()}} />
	                	<label className="rock-player" htmlFor="rock"></label>
	                </div>
	                <div className="radio-button">
	                	<input id="paper" name="position" type="radio" value="paper" onChange={(e)=> {changePlayerPosition(e); this.checked()}} />
	                	<label className="paper-player" htmlFor="paper"></label>
	                </div>
	                {reset && 
	                	<div className="btn-container">
		                	<button disabled={checked === false} onClick={reset}>Play Again</button>
		                	<button className="reset-btn" onClick={resetGame}><i className="fas fa-power-off"></i></button>
		                </div>
	                }
	                {play && 
	                	<button disabled={checked === false} onClick={play}>Play</button>
	                }
	            </div>           
            </div>
		)
	}
}