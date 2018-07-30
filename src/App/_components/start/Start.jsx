/** 
*   Start Component
*   pop-up to set the human name
*   @props
*   handlePlayerName: method to set the name in parent component state
**/

import React from 'react';

export class Start extends React.Component {
    constructor(props) {
    	super(props);
        this.state = {
            name: ''
        }

    }

    changeName(e){
        // this method to set the name on change .. validation
        let name = e.currentTarget.value;

        this.setState({
            name: name
        })
    }

    render() {
        const { handlePlayerName } = this.props;
        const { name } = this.state;

        return (
        	<div className="pop-up">
                <p>Your name</p>
                <input type="text" onChange={(e)=> this.changeName(e)} placeholder="Enter Your Name" />
                <button disabled={name === ''} onClick={()=> handlePlayerName(name)}>Next</button>
            </div>
        );
    }
}