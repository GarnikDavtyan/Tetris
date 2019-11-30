export function draw(board) {
    for (let i = 1; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            let curPix = document.getElementById(`${i}${j}`);
            if(board[i][j] === 2) {
                curPix.style.backgroundColor = 'red';
            } else if(board[i][j] === 1) {
                curPix.style.backgroundColor = '#043260';
            } else {
                curPix.style.backgroundColor = 'initial';
            }
        }
    }
}