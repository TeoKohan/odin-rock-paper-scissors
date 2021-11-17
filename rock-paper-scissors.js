const hands = {
	ROCK: "rock",
	PAPER: "paper",
	SCISSORS: "scissors"
};

let results = {
    WIN: "win",
    TIE: "tie",
    LOSE: "lose"
};

let computerPlay = function() {
    let choice = Math.floor(Math.random() * Object.keys(hands).length);
    return hands[Object.keys(hands)[choice]];
};

let playerPlay = function() {
    let player = prompt("Type 'rock', 'paper' or 'scissors' to select your play: ").toLowerCase();
    if (new Set(["rock", "paper", "scissors"]).has(player))
        return player;
    else
        return null;
}

let playRound = function(player, computer) {
    player = player.toLowerCase();

    if (player === computer)
        return results.TIE;

    switch(player) {
        case hands.ROCK:
            if (computer === hands.SCISSORS)
                return results.WIN;
        break;
        case hands.PAPER:
            if (computer === hands.ROCK)
                return results.WIN;
        break;
        case hands.SCISSORS:
            if (computer === hands.PAPER)
                return results.WIN;
        break;
    }

    return results.LOSE;
};

let game = function() {
    let score = [0, 0];
    let rounds = 5;
    while (rounds--) {
        let player = playerPlay();

        while (player === null) {
            console.log("Invalid play, please enter a valid play");
            player = playerPlay();
        }

        let computer = computerPlay();
        let result = playRound(player, computer);
        console.log(`You ${result}! ${player} ${result}s againt ${computer}.`);
        switch(result) {
            case results.WIN:
                score[0]++;
            break;
            case results.LOSE:
                score[1]++;
            break;
            case results.TIE:
            break;
        }
    }

    let result = score[0] > score[1] ? results.WIN :
                 score[0] < score[1] ? results.LOSE :
                 results.TIE;

    console.log(`Final score is: ${score[0]} to ${score[1]}, you ${result}!`);
    let input = prompt(`Play again? y/n`);
    if (input === 'y')
        game();
    return result;
}