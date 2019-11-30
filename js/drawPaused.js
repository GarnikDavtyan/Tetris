import {draw} from "./draw.js";

export function drawPaused(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            board[i][j] = 0;
        }
    }
    for (let i = 0; i < board.length; i++) {
        for (let j = 4; j <= 5; j++) {
            board[i][j] = 1;
        }
    }
    //PAU
    //P
    board[0][0] = board[0][1] = board[0][2] =/* board[0][3] = */board[1][0] = board[1][3] = board[2][0] = board[2][3] = board[3][0] = board[3][1] = board[3][2] =/* board[3][3] = */board[4][0] = board[5][0] =
        //A
        /*board[7][0] = */board[7][1] = board[7][2] = /*board[7][3] = */board[8][0] = board[8][3] = board[9][0] = board[9][3] = board[10][0] = board[10][1] = board[10][2] = board[10][3] = board[11][0] = board[11][3] = board[12][0] = board[12][3] =
            //U
            board[14][0] = board[14][3] = board[15][0] = board[15][3] = board[16][0] = board[16][3] = board[17][0] = board[17][3] = board[18][0] = board[18][3] = board[19][0] = board[19][1] = board[19][2] = board[19][3] = 2;
    //SED
    //S
    board[0][7] = board[0][8] = board[1][6] = board[1][9] = board[2][7] = board[3][8] = board[4][6] = board[4][9] = board[5][7] = board[5][8] =
        //E
        board[7][6] = board[7][7] = board[7][8] = board[7][9] = board[8][6] = board[9][6] = board[9][7] = board[9][8] = board[10][6] = board[10][7] = board[10][8] = board[11][6] = board[12][6] = board[12][7] = board[12][8] = board[12][9] =
            //D
            board[14][6] = board[14][7] = board[14][8] = board[15][6] = board[15][9] = board[16][6] = board[16][9] = board[17][6] = board[17][9] = board[18][6] = board[18][9] = board[19][6] = board[19][7] = board[19][8] = 2;
    //Pause in Next
    document.getElementById(`next01`).style.backgroundColor ='#F8EB00';
    document.getElementById(`next03`).style.backgroundColor ='#F8EB00';
    document.getElementById(`next11`).style.backgroundColor ='#F8EB00';
    document.getElementById(`next13`).style.backgroundColor ='#F8EB00';
    document.getElementById(`next21`).style.backgroundColor ='#F8EB00';
    document.getElementById(`next23`).style.backgroundColor ='#F8EB00';
    document.getElementById(`next31`).style.backgroundColor ='#F8EB00';
    document.getElementById(`next33`).style.backgroundColor ='#F8EB00';

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            let curPix = document.getElementById(`${i}${j}`);
            if (board[i][j] === 2) {
                curPix.className = 'blinkPause';
            }
        }
    }

    draw(board);
}