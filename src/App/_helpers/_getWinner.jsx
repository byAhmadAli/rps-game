/** 
*   getWinner Helper
*   to check the hand positions between the players and return the winner
*   @props
*   playerPosition: string value for the player hand position from parent 
*   bootPosition: string value for the boot hand position from parent 
**/

const handPositions = {
    paper: {
        wins: ['rock'],
    },
    rock: {
        wins: ['scissors'],
    },
    scissors: {
        wins: ['paper'],
    },
};

export const getWinner = (playerPosition, bootPosition) => {
    if (playerPosition === bootPosition) return 'equality';
    return handPositions[playerPosition].wins.some(wins => wins === bootPosition) ? 'player' : 'boot';
}