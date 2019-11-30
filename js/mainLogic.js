import {boardMatrix} from "./board.js";
import {figures} from "./figures.js";
import {draw} from "./draw.js";
import {drawGameOver} from "./drawGameOver.js";
import {drawPaused} from "./drawPaused.js";

let timeouts = [];
let currentFigureIndex;
let currentFigure;
let nextFigureIndex;
let nextFigure;
let coordinates = [];
const left = 37;
const up = 38;
const right = 39;
const down = 40;
let delay;
let level;
let score;
let top;
const lblLevel = document.getElementById('level-lbl');
const lblScore = document.getElementById('score-lbl');
const lblTop = document.getElementById('top-lbl');
let isRotated = false;
let isPaused = false;
let fullRowIndices = [];
//let fullRowCount;
if (localStorage.getItem("top") === null) {
    localStorage.setItem("top", "0");
}

//starting execution after clicking Start/Restart button
export function clickStart() {
    level = 1;
    if(score > top) {
        localStorage.setItem("top", `${score}`);
    }
    score = 0;
    top = localStorage.getItem("top");
    lblLevel.innerHTML = level.toString();
    lblScore.innerHTML = score.toString();
    lblTop.innerHTML = top.toString();
    document.getElementById('start-button').innerHTML = 'RESTART';
    //clearing the board
    for (let i = 1; i < boardMatrix.length; i++) {
        for (let j = 0; j < boardMatrix[i].length; j++) {
            boardMatrix[i][j] = 0;
            let curPix = document.getElementById(`${i}${j}`);
            curPix.classList.remove('blinkGameOver');
            curPix.classList.remove('blinkPause');
        }
    }
    //clearing the next container
    clearNext();
    // //resetting pause button
    isPaused = false;
    document.getElementById('pause-button').innerHTML = 'PAUSE';
    //document.getElementById("pause-button").disabled = false;
    document.getElementById('pause-button').style.visibility = "visible";
    //clearing timeouts for landing
    for (let timeout of timeouts) {
        clearTimeout(timeout);
    }
    delay = 1000;
    document.addEventListener('keydown', keyPressLogic);
    //generating a random figure
    currentFigureIndex = Math.floor(Math.random() * figures.length);
    let randomFigure = figures[currentFigureIndex];
    currentFigure = JSON.parse(JSON.stringify(figures[currentFigureIndex]));
    start(randomFigure);
}

//putting the figure on the starting position
function start(figure) {
    //clearing the coordinates of previous figure
    coordinates.length = 0;
    isRotated = false;
    //deleting full rows from boardMatrix
    fullRowIndices.forEach((i) => {
        boardMatrix.splice(i, 1);
    });
    for (let i = 0; i < fullRowIndices.length; i++) {
        boardMatrix.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    }
    //putting the figure on the starting position
    for (let i = 1; i < figure.length - 1; i++) {
        for (let j = 0; j < figure[i].length; j++) {
            if(figure[i][j] === 1) {
                //check if game is over
                if (boardMatrix[i][j + 3] === 1) {
                    if(score > top) {
                        localStorage.setItem("top", `${score}`);
                        lblTop.innerHTML = top.toString();
                    }
                    return GameIsOver();
                }
                boardMatrix[i][j + 3] = 2;
                coordinates.push([i, j + 3]);
                draw(boardMatrix);
            }
        }
    }
    //generating the next figure
    nextFigureIndex = Math.floor(Math.random() * figures.length);
    nextFigure = figures[nextFigureIndex];
    drawNextFigure();
    figureLanding();
}

//figure landing logic
function figureLanding() {
    timeouts.push(setTimeout(landing, delay));
}
function landing() {
        let newCoordinates = checkNewCoordinatesOfMoveOrRotate(down);
        if (newCoordinates.length) {
            timeouts.push(setTimeout(landing, delay));
        } else {
            clearNext();
            for (let i = coordinates.length - 1, j = 0; i >= 0; i--, j++) {
                let x = coordinates[i][0];
                let y = coordinates[i][1];
                boardMatrix[x][y] = 1;
            }
            draw(boardMatrix);
            fullRowCheck();
            let fullRowDelay = 0;
            if (fullRowIndices.length) {
                fullRowDelay = 500;
            }
            if (changeLevel()) {
                delay -= delay / 10;
            }
            currentFigureIndex = nextFigureIndex;
            currentFigure = JSON.parse(JSON.stringify(nextFigure));
            return setTimeout(() => start(nextFigure), fullRowDelay);
        }
        go(newCoordinates);
        draw(boardMatrix);
}

//drawing the next figure
function drawNextFigure() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (nextFigure[i][j] === 1) {
                let nextPixel = document.getElementById(`next${i}${j}`);
                nextPixel.style.backgroundColor = 'green';
            }
        }
    }
}

//clearing the next container
function clearNext() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            let nextPixel = document.getElementById(`next${i}${j}`);
            nextPixel.style.backgroundColor = 'initial';
        }
    }
}

//move keys pressing logic
export function keyPressLogic(event) {
    let direction = event.keyCode;
    let newCoordinates;
    if (direction === up) {
        if (currentFigureIndex) {
            newCoordinates = checkNewCoordinatesOfMoveOrRotate(direction);
            if (newCoordinates.length) {
                rotate(newCoordinates);
                if (currentFigureIndex <= 3) {
                    isRotated = !isRotated;
                }
            }
        }
    } else {
        newCoordinates = checkNewCoordinatesOfMoveOrRotate(direction);
        if(newCoordinates.length){
            go(newCoordinates);
        }
    }
    draw(boardMatrix);
}

//moving figure depending on direction
function go(newCoordinates) {
    coordinates.forEach((coordinate) => {
        let x = coordinate[0];
        let y = coordinate[1];
        boardMatrix[x][y] = 0;
    });
    newCoordinates.forEach((coordinate) => {
        let x = coordinate[0];
        let y = coordinate[1];
        boardMatrix[x][y] = 2;
    });
    coordinates.length = 0;
    coordinates = newCoordinates;
}

function checkNewCoordinatesOfMoveOrRotate(direction) {
    let newCoordinates = [];
    switch (direction) {
        case left : {
            for (let i = 0; i < coordinates.length; i++) {
                let y = coordinates[i][1];
                y--;
                newCoordinates.push([coordinates[i][0], y]);
            }
        }
        break;
        case right : {
            for (let i = 0; i < coordinates.length; i++) {
                let y = coordinates[i][1];
                y++;
                newCoordinates.push([coordinates[i][0], y]);
            }
        }
        break;
        case down : {
            for (let i = 0; i < coordinates.length; i++) {
                let x = coordinates[i][0];
                x++;
                newCoordinates.push([x, coordinates[i][1]]);
            }
        }
        break;
        case up : {
            newCoordinates = !isRotated ? newCoordinatesOfRotateLeft() : newCoordinatesOfRotateRight();
        }
        break;
    }
    return canMoveOrRotate(newCoordinates, direction);
}

function canMoveOrRotate(newCoordinates, direction) {
    if (direction === up) {
        if(!canMoveOrRotate(newCoordinates[0], left).length || !canMoveOrRotate(newCoordinates[0], right).length || !canMoveOrRotate(newCoordinates[0], down).length) {
            return false;
        } else {
            currentFigure = newCoordinates[1];
            return newCoordinates[0];
        }
    } else {
        for (let i = 0; i < newCoordinates.length; i++) {
            let x = newCoordinates[i][0];
            let y = newCoordinates[i][1];
            switch (direction) {
                case left : {
                    if (y < 0) return false;
                }
                    break;
                case right : {
                    if (y > 9) return false;
                }
                    break;
                case down : {
                    if (x > 20) return false;
                }
                    break;
            }
            if(boardMatrix[x][y] === 1) return false;
        }
        return newCoordinates;
    }
}

//check if row is full
function fullRowCheck() {
    //fullRowCount = 0;
    let isFullRow = false;
    fullRowIndices.length = 0;
    for (let i = boardMatrix.length - 1; i >= 0; i--) {
        let sumOfRow = boardMatrix[i].reduce((sum, item) => sum + item, 0);
        if (sumOfRow === 0) {
            if(isFullRow) {
                let combo = (fullRowIndices.length - 1) * 1000;
                score += fullRowIndices.length * 1000 + combo;
                lblScore.innerHTML = score.toString();
            }
            return;
        }
        else if (sumOfRow === 10) {
            for (let j = 0; j < boardMatrix[i].length; j++) {
                document.getElementById(`${i}${j}`).className = 'fullRow';
            }
            //delay += 1000;
            setTimeout(() => {
                for (let j = 0; j < boardMatrix[i].length; j++) {
                    document.getElementById(`${i}${j}`).classList.remove('fullRow');
                }
            }, 1000);
            fullRowIndices.push(i);
            //fullRowCount++;
            //i++;
            isFullRow = true;
        }
    }
}

//game over
function GameIsOver() {
    for (let i = boardMatrix.length - 1; i >= 0; i--) {
        for (let j = 0; j < boardMatrix[i].length; j++) {
            boardMatrix[i][j] = 0;
        }
    }
    document.removeEventListener('keydown', keyPressLogic);
    document.getElementById('pause-button').style.visibility = "hidden";
    drawGameOver(boardMatrix);
}

function changeLevel() {
    let isChanged = false;
    if (Math.floor(score/10000) === level) {
        level++;
        lblLevel.innerHTML = level.toString();
        isChanged = true;
    }
    return isChanged;
}

function newCoordinatesOfRotateLeft() {
    let centerPointCoors = centerPointCoordinates();
    let rotatingFigure = JSON.parse(JSON.stringify(currentFigure));
    let rotatedFigure = JSON.parse(JSON.stringify(currentFigure));
    for (let i = 0; i < 3; i++) {
        for (let j = 1; j <= 3; j++) {
            rotatedFigure[i][j] = rotatingFigure[j - 1][3 - i];
        }
    }
    if (currentFigureIndex === 1) {
        rotatedFigure[3][2] = 1;
        rotatedFigure[1][0] = 0;
    }

    return newCoordinatesOfRotatedFigure(centerPointCoors, rotatedFigure);
}

function newCoordinatesOfRotateRight() {
    let centerPointCoors = centerPointCoordinates();
    let rotatingFigure = JSON.parse(JSON.stringify(currentFigure));
    let rotatedFigure = JSON.parse(JSON.stringify(currentFigure));
    for (let i = 0; i < 3; i++) {
        for (let j = 1; j <= 3; j++) {
            rotatedFigure[i][j] = rotatingFigure[3 - j][i + 1];
        }
    }
    if (currentFigureIndex === 1) {
        rotatedFigure[3][2] = 0;
        rotatedFigure[1][0] = 1;
    }

    return newCoordinatesOfRotatedFigure(centerPointCoors, rotatedFigure);
}

function rotate(newCoordinates) {
    clearCurrentFigureOnBoard();
    coordinates.length = 0;
    coordinates = newCoordinates;
    placeRotatedFigureOnBoard();
}

function centerPointCoordinates() {
    let counterForCenterPointCoors = -1;
    let lengthJ = 4;
    for (let i = 0; i <= 1; i++) {
        for (let j = 0; j < lengthJ; j++) {
            if(currentFigure[i][j] === 1) {
                counterForCenterPointCoors++;
            }
        }
        lengthJ--;
    }
    return coordinates[counterForCenterPointCoors];
}

function clearCurrentFigureOnBoard() {
    for (let i = coordinates.length - 1; i >= 0 ; i--) {
        let x = coordinates[i][0];
        let y = coordinates[i][1];
        boardMatrix[x][y] = 0;
    }
}

function placeRotatedFigureOnBoard() {
    coordinates.forEach(coordinate => {
        let x = coordinate[0];
        let y = coordinate[1];
        boardMatrix[x][y] = 2;
    });
}

function newCoordinatesOfRotatedFigure(centerPointCoors, rotatedFigure) {
    let newCoordinates = [];
    for (let i = 0; i < rotatedFigure.length; i++) {
        for (let j = 0; j < rotatedFigure[i].length; j++) {
            if(rotatedFigure[i][j] === 1) {
                newCoordinates.push([centerPointCoors[0] + i - 1, centerPointCoors[1] + j - 2]);
            }
        }
    }
    return [newCoordinates, rotatedFigure];
}

export function clickPause() {
    isPaused = !isPaused;
    for (let timeout of timeouts) {
        clearTimeout(timeout);
    }
    if(!isPaused) {
        for (let i = 0; i < boardMatrix.length; i++) {
            for (let j = 0; j < boardMatrix[i].length; j++) {
                let curPix = document.getElementById(`${i}${j}`);
                curPix.classList.remove('blinkPause');
            }
        }
        document.getElementById('pause-button').innerHTML = 'PAUSE';
        document.addEventListener('keydown', keyPressLogic);
        timeouts.push(setTimeout(clearNext, 500));
        timeouts.push(setTimeout(drawNextFigure, 500));
        timeouts.push(setTimeout(() => {draw(boardMatrix);}, 500));
        timeouts.push(setTimeout(landing, 500 + delay ));

    } else {
        document.getElementById('pause-button').innerHTML = 'RESUME';
        document.removeEventListener('keydown', keyPressLogic);
        clearNext();
        let pauseBoard = JSON.parse(JSON.stringify(boardMatrix));
        drawPaused(pauseBoard);
    }
}