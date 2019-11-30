import {draw} from "./draw.js";

export function drawGameOver(board) {
    for (let i = 1; i < board.length; i++) {
        for (let j = 4; j <= 5; j++) {
            board[i][j] = 1;
        }
    }
    //GAME
    //G
    board[1][1] = board[1][2] = board[1][3] = board[2][0] = board[3][0] = board[3][2] = board[3][3] = board[4][1] = board[4][3] =
        //A
        board[6][1] = board[6][2] = board[7][0] = board[7][3] = board[8][0] = board[8][1] = board[8][2] = board[8][3] = board[9][0] = board[9][3] =
            //M
            board[11][0] = board[11][3] = board[12][0] = board[12][1] = board[12][2] = board[12][3] = board[13][0] = board[13][1] = board[13][3] = board[14][0] = board[14][3] =
                //E
                board[16][0] = board[16][1] = board[16][2] = board[16][3] = board[17][0] = board[18][0] = board[18][1] = board[18][2] = board[19][0] = board[20][0] = board[20][1] = board[20][2] = board[20][3] = 2;
    //OVER
    //O
    board[1][7] = board[1][8] = board[2][6] = board[2][9] = board[3][6] = board[3][9] = board[4][7] = board[4][8] =
        //V
        board[6][6] = board[6][9] = board[7][6] = board[7][9] = board[8][6] = board[8][9] = board[9][7] = board[9][8] =
            //E
            board[11][6] = board[11][7] = board[11][8] = board[11][9] = board[12][6] = board[13][6] = board[13][7] = board[13][8] = board[14][6] = board[15][6] = board[15][7] = board[15][8] = board[15][9] =
                //R
                board[17][6] = board[17][7] = board[17][8] = board[18][6] = board[18][9] = board[19][6] = board[19][7] = board[19][8] = board[20][6] = board[20][9] = 2;
    //Pikachu in Next
    document.getElementById(`next00`).style.backgroundColor = 'black';
    document.getElementById(`next03`).style.backgroundColor = 'black';
    document.getElementById(`next11`).style.backgroundColor ='#E7314A';
    document.getElementById(`next01`).style.backgroundColor ='#F8EB00';
    document.getElementById(`next02`).style.backgroundColor ='#F8EB00';
    document.getElementById(`next12`).style.backgroundColor ='#F8EB00';
    document.getElementById(`next20`).style.backgroundColor ='#F8EB00';
    document.getElementById(`next21`).style.backgroundColor ='#F8EB00';
    document.getElementById(`next22`).style.backgroundColor ='#F8EB00';
    document.getElementById(`next23`).style.backgroundColor ='#F8EB00';
    document.getElementById(`next30`).style.backgroundColor ='#F8EB00';
    document.getElementById(`next31`).style.backgroundColor ='#F8EB00';
    document.getElementById(`next32`).style.backgroundColor ='#F8EB00';

    for (let i = 1; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            let curPix = document.getElementById(`${i}${j}`);
            if (board[i][j] === 2) {
                curPix.className = 'blinkGameOver';
            }
        }
    }

    draw(board);
}