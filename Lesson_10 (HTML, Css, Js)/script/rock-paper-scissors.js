const choices = ['rock', 'paper', 'scissors'];
let playerChoice= '';
let result = JSON.parse(localStorage.getItem('result')) || {
  win: 0,
  lose: 0,
  tie: 0
};

function changeEmoji(choose) {
  let result = '';
  if (choose === 'rock') {
    result = 'images/rock-emoji.png'; 
  } else if (choose === 'paper') {
    result = 'images/paper-emoji.png'; 
  } else {
    result = 'images/scissors-emoji.png'; 
  }
  return result;
}

function playGame (playerChoice) {
  const computerChoice = choices[Math.floor(Math.random() * 3)];

  function updateScoreElement () {
        
    document.querySelector('.choose').innerHTML = 
      `You chose: <img src="${changeEmoji(playerChoice)}" class="move-emoji">, 
      Computer chose: <img src="${changeEmoji(computerChoice)}" class="move-emoji">`;

    document.querySelector('.score-result').innerHTML = 
      `Wins: ${result.win}, Losses: ${result.lose}, Ties: ${result.tie}`;
    }

  if (playerChoice === 'restart') {
    document.querySelector('.choose').innerHTML = '';
    document.querySelector('.return').innerHTML = "Your scores are reseted.";
    result = {win:0, lose: 0, tie: 0};
    localStorage.setItem('result', JSON.stringify(result));
    document.querySelector('.score-result').innerHTML = 
      `Wins: ${result.win}, Losses: ${result.lose}, Ties: ${result.tie}`;

  } else if (playerChoice === computerChoice) {
    result.tie++;
    document.querySelector('.return').innerHTML = `<p class="result-state">It is tie!<p/>`;
    updateScoreElement();

  } else if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
    result.win++;
    document.querySelector('.return').innerHTML =  `<p class="result-state">You Win!</p>`;
    updateScoreElement();

  } else {
    result.lose++;
    document.querySelector('.return').innerHTML =  `<p class="result-state">You Lose!</p>`;
    updateScoreElement();

  }
  localStorage.setItem('result', JSON.stringify(result));
}