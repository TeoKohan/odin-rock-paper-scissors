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

function computerPlay () {
    let choice = Math.floor(Math.random() * Object.keys(hands).length);
    return hands[Object.keys(hands)[choice]];
};

function combat (player, computer) {

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

function playRound (player) {
    
    let computer = computerPlay();
    set_combatant(combatants[1], computer);
    let result = combat(player, computer);

    console.log(`${player} vs ${computer} : ${result}`);

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

    update_score();

    if (score[0] < rounds && score[1] < rounds) {
        prompt.textContent = `${result}!`;
        delay(500).then(
            () => {
                enable_buttons();
                prompt.textContent = '';
                clear_combatants();
            }
        );
        return;
    }

    if (score[0] > score[1])
        prompt.textContent = `Congratulations you win!`;
    else 
        prompt.textContent = `Game Over`;
    return result;
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function shuffle(times = 10) {
    set_combatant(combatants[1], hands.ROCK);
    for (let i = 1; i <= times; ++i)
        delay(100 * i).then(() => set_combatant(combatants[1], hands[Object.keys(hands)[i%Object.keys(hands).length]]));
    return delay(100*(times));
}

const rounds = 5;
let score = [0, 0];

let prompt     = document.querySelector('.prompt');
let scoreboard = [document.querySelector('#player .score'), document.querySelector('#cpu .score')];
let combatants    = [document.querySelector('#player-choice'), document.querySelector('#cpu-choice')];

let rock_btn     = document.querySelector('#rock');
let paper_btn    = document.querySelector('#paper');
let scissors_btn = document.querySelector('#scissors');

function disable_buttons() {
    rock_btn.disabled = true; 
    paper_btn.disabled = true; 
    scissors_btn.disabled = true; 
}

function enable_buttons() {
    rock_btn.disabled = false; 
    paper_btn.disabled = false; 
    scissors_btn.disabled = false; 
}

function set_combatant(combatant, to) {
    combatant.style['display'] = 'block';
    switch (to) {
        case hands.ROCK:
            combatant.src = './images/rock.png';
        break;
        case hands.PAPER:
            combatant.src = './images/paper.png';
        break;
        case hands.SCISSORS:
            combatant.src = './images/scissors.png';
        break;
    }
}

function clear_combatants() {
    combatants[0].style['display'] = 'none';
    combatants[1].style['display'] = 'none';
}

function update_score() {
    scoreboard[0].textContent = score[0];
    scoreboard[1].textContent = score[1];
}

rock_btn.addEventListener('click', function(e) {
    set_combatant(combatants[0], hands.ROCK)
    disable_buttons();
    shuffle().then(() => playRound(hands.ROCK));
});

paper_btn.addEventListener('click', function(e) {
    set_combatant(combatants[0], hands.PAPER)
    disable_buttons();
    shuffle().then(() => playRound(hands.PAPER));
});

scissors_btn.addEventListener('click', function(e) {
    set_combatant(combatants[0], hands.SCISSORS)
    disable_buttons();
    shuffle().then(() => playRound(hands.SCISSORS));
});