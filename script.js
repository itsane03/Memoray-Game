const symbol_array = ['❤️','🎶','😎','🤦‍♀️','💖','👍','💕','😭'];
let card_array = [...symbol_array, ...symbol_array]; 



function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array;
}

let firstCard = null;
let secondCard = null;
let isBoardLocked = false;




function createBoard() {
    const gameboard = document.getElementById('game-board');
    card_array = shuffle(card_array); 

    card_array.forEach(symbol => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol; 
        card.innerHTML = '?';  
        card.addEventListener('click', flipCard); 
        gameboard.appendChild(card); 
    });
}



function flipCard() {
    if (isBoardLocked) return;  
    if (this === firstCard) return; 

    this.classList.add('flipped');
    this.innerHTML = this.dataset.symbol;  

    if (!firstCard) {
        firstCard = this; 
    } else {
        secondCard = this;  
        checkForMatch(); 
    }
}


function checkForMatch() {
    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        resetBoard();  // Reset after a match
    } else {
        isBoardLocked = true;
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.innerHTML = '?';
            secondCard.innerHTML = '?';
            resetBoard(); 
        }, 1000);
    }
}


function resetBoard() {
    [firstCard, secondCard] = [null, null];  
    isBoardLocked = false;  
}

createBoard();
