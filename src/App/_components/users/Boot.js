/** 
*   Boot Component
*   boot vs. boot
*   @props
*   resetGame: method to reset the game
**/

import React from 'react';
import { Hand } from '@app/_components';
import { getWinner } from '@app/_helpers';

export class Boot extends React.Component {
    constructor(props) {
    	super(props);

    	this.state = {
    		boot1: {
                name: 'Boot 1',
                score: 0,
                position: 'rock' // default hand position
            }, // boot1 object
            boot2: {
                name: 'Boot 2',
                score: 0,
                position: 'rock' // default hand position
            }, // boot2 object
            positions: ['scissors', 'rock', 'paper'], // default positions to make boot choose randomly
            game: {
                status: 'play',
                winner: null,
                color: ''
            } // game status object 
    	}

    	this.reset = this.reset.bind(this);
    }

    handleHandPosition(){
        // this method to set the poition values for human and boot and make the challenge

        let bootPosition = Object.assign([], this.state.positions);

        // boot1
        let boot1 = Object.assign({}, this.state.boot1);

        //boot2
        let boot2 = Object.assign({}, this.state.boot2);

        // return a random choose for boot form positions state
        boot1['position'] = bootPosition[Math.floor(Math.random() * bootPosition.length)];
        boot2['position'] = bootPosition[Math.floor(Math.random() * bootPosition.length)];

        this.setState({
            boot1: boot1,
            boot2: boot2
        }, ()=> {
            this.checker()
        })
    }

    checker(){
        // this method to check whois the winner        
        let boot1 = Object.assign({}, this.state.boot1),
            boot2 = Object.assign({}, this.state.boot2),
            game = Object.assign({}, this.state.game);

        const winner = getWinner(boot1.position, boot2.position);
        if(winner === 'player'){
            boot1['score'] = boot1['score']+1;

            game['winner'] = 'Boot 1 won!';
            game['status'] = 'replay';
            game['color'] = '';
        }else if(winner === 'boot'){
            boot2['score'] = boot2['score']+1;

            game['winner'] = 'Boot 2 won!';
            game['status'] = 'replay';
            game['color'] = '';
        }else{
            game['winner'] = 'Equality!';
            game['status'] = 'replay';
            game['color'] = '';
        }
        this.setState({
            boot1: boot1,
            boot2: boot2,
            game: game
        })
    }

    componentDidMount(){//play(){
        // this method to play the game
        setTimeout(()=>{
            this.handleHandPosition();
        }, 3000)
    }

    reset(){
        // this method to play again the game
        let boot1 = Object.assign({}, this.state.boot1),
            boot2 = Object.assign({}, this.state.boot2);

        boot1['position'] = boot2['position'] = 'rock';

        this.setState({
            boot1: boot1,
            boot2: boot2,
            game: {
                status: 'play',
                winner: null
            }
        }, ()=>{
            setTimeout(()=>{
                this.handleHandPosition();
            }, 3000)
        });
    }

    render(){
    	const { resetGame } = this.props;
    	const { boot1, boot2, game } = this.state;

    	return(
    		<div className="container">
                <h1>Let's play</h1>
                <div className="player-side">
            		<h2>{boot1.name}</h2>
                    <p>score: {boot1.score}</p>
                    {game.status == 'play' &&
                        <Hand position={`${boot1.position}`} user="player" />
                    }
                    {game.status == 'replay' &&
                        <div className={`hand ${boot1.position}-player player`}></div>
                    }
                </div>
                <div className="boot-side">
                    <h2>{boot2.name}</h2>
                    <p>score: {boot2.score}</p>
                    {game.status == 'play' &&
                        <Hand position={`${boot2.position}`} user="boot" />
                    }
                    {game.status == 'replay' &&
                        <div className={`hand ${boot2.position}-boot boot`}></div>
                    }
                </div>
                {game.status == 'replay' &&
                	<div className="pop-up boot">
                		{game && game.status == 'replay' &&
							<h2 className={game.color}>{game.winner}</h2>
						}
                    	<button onClick={this.reset}>Play Again!</button>
                    	<button className="reset-btn" onClick={resetGame}><i className="fas fa-power-off"></i></button>
                    </div>
                }
        	</div>
    	)
    }
}