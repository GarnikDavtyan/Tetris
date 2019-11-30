import {draw} from "./draw.js";

export function drawPaused(board) {
    for (let i = 1; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            board[i][j] = 0;
        }
    }
    for (let i = 1; i < board.length; i++) {
        for (let j = 4; j <= 5; j++) {
            board[i][j] = 1;
        }
    }
    //PAU
    //P
    board[1][0] = board[1][1] = board[1][2] = board[2][0] = board[2][3] = board[3][0] = board[3][3] = board[4][0] = board[4][1] = board[4][2] = board[5][0] = board[6][0] =
        //A
        board[8][1] = board[8][2] = board[9][0] = board[9][3] = board[10][0] = board[10][3] = board[11][0] = board[11][1] = board[11][2] = board[11][3] = board[12][0] = board[12][3] = board[13][0] = board[13][3] =
            //U
            board[15][0] = board[15][3] = board[16][0] = board[16][3] = board[17][0] = board[17][3] = board[18][0] = board[18][3] = board[19][0] = board[19][3] = board[20][0] = board[20][1] = board[20][2] = board[20][3] = 2;
    //SED
    //S
    board[1][7] = board[1][8] = board[2][6] = board[2][9] = board[3][7] = board[4][8] = board[5][6] = board[5][9] = board[6][7] = board[6][8] =
        //E
        board[8][6] = board[8][7] = board[8][8] = board[8][9] = board[9][6] = board[10][6] = board[10][7] = board[10][8] = board[11][6] = board[11][7] = board[11][8] = board[12][6] = board[13][6] = board[13][7] = board[13][8] = board[13][9] =
            //D
            board[15][6] = board[15][7] = board[15][8] = board[16][6] = board[16][9] = board[17][6] = board[17][9] = board[18][6] = board[18][9] = board[19][6] = board[19][9] = board[20][6] = board[20][7] = board[20][8] = 2;
    //Pause in Next
    document.getElementById(`next01`).style.backgroundColor ='#F8EB00';
    document.getElementById(`next03`).style.backgroundColor ='#F8EB00';
    document.getElementById(`next11`).style.backgroundColor ='#F8EB00';
    document.getElementById(`next13`).style.backgroundColor ='#F8EB00';
    document.getElementById(`next21`).style.backgroundColor ='#F8EB00';
    document.getElementById(`next23`).style.backgroundColor ='#F8EB00';
    document.getElementById(`next31`).style.backgroundColor ='#F8EB00';
    document.getElementById(`next33`).style.backgroundColor ='#F8EB00';

    for (let i = 1; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            let curPix = document.getElementById(`${i}${j}`);
            if (board[i][j] === 2) {
                curPix.className = 'blinkPause';
            }
        }
    }

    draw(board);
}