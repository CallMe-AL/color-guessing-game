let colorArray = [];
let winningColor;
let numOfSquares = 6;
let wins = 0;
let totalGuesses = 0;

let rgb = document.querySelector('#rgb-update');
let gameSet = document.querySelector('.game-settings');
let gsContainer = document.querySelector('.gs-container');
let gameMessage = document.querySelector('.game-message');
let header = document.querySelector('header');
let squares = document.querySelectorAll('.square');

let colorsBtn = document.querySelector('.colorsButton');
let modeBtns = document.querySelectorAll('.mode');
let selected = document.querySelector('.selected');

let counter = document.querySelector('.counter');

colorsBtn.onclick = function() {
    reset();
}

// setting up for a new game
function reset() {
    counter.textContent = `Wins: ${wins} Total Guesses: ${totalGuesses}`;
    header.style.backgroundColor = 'rgb(29, 178, 184)';
    gameMessage.textContent = '';  
    colorsBtn.textContent = 'NEW COLORS'; 
    winningColor = generateColor();     
    rgb.textContent = winningColor;
    squareEvent(winningColor);
    assignColors(winningColor);       
}

// easy or hard mode selection
function btnChoice() {
    for (let i = 0; i < modeBtns.length; i++) {
        modeBtns[i].addEventListener('click', function() {
            for (let i = 0; i < modeBtns.length; i++) {
                modeBtns[i].classList.remove('selected');
            }
            this.classList.add('selected');
            if (this.textContent === 'EASY') {
                numOfSquares = 3;
            }
            else {
                numOfSquares = 6;
            }
            reset();
        });
    }
}

// setting what happens when a square (div) is clicked
function squareEvent(color) {
    for (let i = 0; i < squares.length; i++){
        squares[i].onclick = function() {             
            if (gameMessage.textContent == 'Nice!') {
                return;
            } else if (this.style.backgroundColor == color) {
                changeColors(color);
                wins++;
                totalGuesses++;
                gameMessage.textContent = 'Nice!';
                colorsBtn.textContent = 'PLAY AGAIN';
            } else {
                gameMessage.textContent = 'Nope!';
                this.style.backgroundColor = 'rgb(34, 32, 32)';
                totalGuesses++;
            }
            counter.textContent = `Wins: ${wins} Total Guesses: ${totalGuesses}`;
        }
    }
}

// for changing each square to the winning color
function changeColors(color) {
    for (let i = 0; i < squares.length; i++){
        squares[i].style.backgroundColor = color;
        header.style.backgroundColor = color;
    }
}

// gives each square a color, one of which is the winning color
function assignColors(color) {
    let randomNum = Math.floor(Math.random() * numOfSquares);
    for (let i = 0; i < squares.length; i++) {
        if (i == randomNum &&  i < numOfSquares) {
            squares[i].style.display = 'block';
            squares[i].style.backgroundColor = color;
            continue;
        }

        if (i < numOfSquares){
            squares[i].style.display = 'block';
            squares[i].style.backgroundColor = generateColor();
        } else {
            squares[i].style.display = 'none';
        }
         
    }
}

function generateColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g}, ${b})`;
}

function gameStart() {
    btnChoice();
    reset();    
}

gameStart();