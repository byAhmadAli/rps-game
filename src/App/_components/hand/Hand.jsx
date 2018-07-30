/** 
*   Hand Component
*   to init the hand of user
*   @props
*   position: string value from the parent component to change the position of 'hand.png' sprite image
*	user: string value to know this hand for whom
**/

import React from 'react';

import '@styles/components/hand.scss';

export class Hand extends React.Component {
    constructor(props) {
    	super(props);


    }

    render() {
    	const { position, user } = this.props;

        return (
        	<div className={`hand shake-${user} ${position}-${user} ${user}`}></div>
        );
    }
}