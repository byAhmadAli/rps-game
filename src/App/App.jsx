import React from 'react';
import { Human, Boot } from './_components';

export class App extends React.Component {
    constructor(props) {
    	super(props);

        this.state = {
            user: null,
            selectedValue: null, // human or boot
            checked: false,
            cta: 'Choose one!'
        }

        this.resetGame = this.resetGame.bind(this);
    }

    resetGame(){
        this.setState({
            user: null,
            selectedValue: null,
            checked: false,
            cta: 'Choose one!'
        })
    }

    changeUser(e){
        // this method to change the user
        let user = e.currentTarget.value,
            cta;

        if(user == 'human'){
            cta = 'Next'
        }else{
            cta = 'Play!'
        }
        this.setState({
            selectedValue: user,
            cta: cta
        })
    }

    next(user){
        this.setState({
            user: user
        })
    }

    checked(){
        // this method to insure the human is choose his hand position .. validation
        this.setState({
            checked: true
        })
    }

    render() {
        const { user, checked, selectedValue, cta } = this.state;
        return (
            <div>
                {!user && 
                    <div className="container">
                        <h1>Rock, Paper, Scissors</h1>
                        <div className="pop-up choose startup">
                            <p>Play as</p>
                            <div className="radio-button-container">
                                <div className="radio-button">
                                    <input id="boot" name="user" type="radio" value="boot" onChange={(e)=> {this.changeUser(e); this.checked()}} />
                                    <label htmlFor="boot"><i className="fas fa-robot"></i></label>
                                </div>
                                <div className="radio-button">
                                    <input id="human" name="user" type="radio" value="human" onChange={(e)=> {this.changeUser(e); this.checked()}} />
                                    <label htmlFor="human"><i className="fas fa-male"></i></label>
                                </div>
                                <button disabled={checked === false} onClick={()=> this.next(selectedValue)}>{cta}</button>
                            </div>
                        </div>
                    </div>
                }
                {user == 'human' &&
                    <Human resetGame={this.resetGame} />
                }
                {user == 'boot' &&
                    <Boot resetGame={this.resetGame} />
                }
            </div>
        );
    }
}