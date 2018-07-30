/** 
*   Boot Component
*   human vs. boot
*   @props
*   resetGame: method to reset the game
**/

import React from 'react';
import { Hand, Start, HandPositions } from '@app/_components';
import { getWinner } from '@app/_helpers';

export class Human extends React.Component {
    constructor(props) {
    	super(props);
        this.state = {
            player: {
                name: null,
                score: 0,
                position: 'rock' // default hand position
            }, // player object
            boot: {
                name: 'Boot',
                score: 0,
                position: 'rock' // default hand position
            }, // boot object
            positions: ['scissors', 'rock', 'paper'], // default positions to make boot choose randomly
            selectedPostion: null, // human choose
            game: {
                status: 'play',
                winner: null,
                color: ''
            }, // game status object 
            handPositions: false // this to show the human chooses 
        }

        this.handlePlayerName = this.handlePlayerName.bind(this);
        this.changePlayerPosition = this.changePlayerPosition.bind(this);
        this.reset = this.reset.bind(this);
        this.play = this.play.bind(this);
    }

    handlePlayerName(name){
        // this method to set the human name
        let player = Object.assign({}, this.state.player);
        player['name'] = name;

        this.setState({
            player: player,
            handPositions: true
        })
    }

    changePlayerPosition(e){
        // this method to set the human choose
        let value = e.currentTarget.value;

        this.setState({
            selectedPostion: value
        })
    }

    handleHandPosition(){
        // this method to set the poition values for human and boot and make the challenge

        // player
        let player = Object.assign({}, this.state.player);
        player['position'] = this.state.selectedPostion;

        //boot
        let bootPosition = Object.assign([], this.state.positions);
        let boot = Object.assign({}, this.state.boot);
        // return a random choose for boot form positions state
        boot['position'] = bootPosition[Math.floor(Math.random() * bootPosition.length)];

        this.setState({
            player: player,
            boot: boot
        }, ()=> {
            this.checker()
        })
    }

    checker(){
        // this method to check whois the winner        
        let player = Object.assign({}, this.state.player),
            boot = Object.assign({}, this.state.boot),
            game = Object.assign({}, this.state.game);

        const winner = getWinner(player.position, boot.position);
        if(winner === 'player'){
            player['score'] = player['score']+1;

            game['winner'] = 'You won!';
            game['status'] = 'replay';
            game['color'] = 'win';
        }else if(winner === 'boot'){
            boot['score'] = boot['score']+1;

            game['winner'] = 'Boot won!';
            game['status'] = 'replay';
            game['color'] = 'lost';
        }else{
            game['winner'] = 'Equality!';
            game['status'] = 'replay';
            game['color'] = '';
        }
        this.setState({
            player: player,
            boot: boot,
            game: game
        })
    }

    play(){
        // this method to play the game
        this.setState({
            handPositions: false
        }, ()=>{
            setTimeout(()=>{
                this.handleHandPosition();
            }, 3000)
        })
    }

    reset(){
        // this method to play again the game
        let player = Object.assign({}, this.state.player),
            boot = Object.assign({}, this.state.boot);

        player['position'] = boot['position'] = 'rock';

        this.setState({
            player: player,
            boot: boot,
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

    render() {
        const { resetGame } = this.props;
        const { player, boot, game, handPositions, selectedPostion } = this.state;

        return (
            <div> 
                {player.name && selectedPostion && !handPositions &&
                	<div className="container">
                        <h1>Let's play</h1>
                        <div className="player-side">
                    		<h2>{player.name}</h2>
                            <p>score: {player.score}</p>
                            {game.status == 'play' &&
                                <Hand position={`${player.position}`} user="player" />
                            }
                            {game.status == 'replay' &&
                                <div className={`hand ${player.position}-player player`}></div>
                            }
                        </div>
                        <div className="boot-side">
                            <h2>{boot.name}</h2>
                            <p>score: {boot.score}</p>
                            {game.status == 'play' &&
                                <Hand position={`${boot.position}`} user="boot" />
                            }
                            {game.status == 'replay' &&
                                <div className={`hand ${boot.position}-boot boot`}></div>
                            }
                        </div>
                        {game.status == 'replay' &&
                            <HandPositions resetClass="hand-positions-container" reset={this.reset} 
                            changePlayerPosition={this.changePlayerPosition} game={game} resetGame={resetGame} />
                        }
                	</div>
                }
                {!player.name &&
                    <Start handlePlayerName={this.handlePlayerName} resetGame={resetGame} />
                }
                {handPositions && 
                    <HandPositions play={this.play} changePlayerPosition={this.changePlayerPosition} />
                }
            </div>
        );
    }
}