import {draw} from "./draw.js";

export function drawGameOver(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 4; j <= 5; j++) {
            board[i][j] = 1;
        }
    }
    //GAME
    //G
    board[0][1] = board[0][2] = board[0][3] = board[1][0] = board[2][0] = board[2][2] = board[2][3] = board[3][1] = board[3][3] =
        //A
        board[5][1] = board[5][2] = board[6][0] = board[6][3] = board[7][0] = board[7][1] = board[7][2] = board[7][3] = board[8][0] = board[8][3] =
            //M
            board[10][0] = board[10][3] = board[11][0] = board[11][1] = board[11][2] = board[11][3] = board[12][0] = board[12][1] = board[12][3] = board[13][0] = board[13][3] =
                //E
                board[15][0] = board[15][1] = board[15][2] = board[15][3] = board[16][0] = board[17][0] = board[17][1] = board[17][2] = /*board[17][3] =*/ board[18][0] = board[19][0] = board[19][1] = board[19][2] = board[19][3] = 2;
    //OVER
    //O
    board[0][7] = board[0][8] = board[1][6] = board[1][9] = board[2][6] = board[2][9] = board[3][7] = board[3][8] =
        //V
        board[5][6] = board[5][9] = board[6][6] = board[6][9] = board[7][6] = board[7][9] = board[8][7] = board[8][8] =
            //E
            board[10][6] = board[10][7] = board[10][8] = board[10][9] = board[11][6] = board[12][6] = board[12][7] = board[12][8] = /*board[12][9] = */board[13][6] = board[14][6] = board[14][7] = board[14][8] = board[14][9] =
                //R
                board[16][6] = board[16][7] = board[16][8] = board[17][6] = board[17][9] = board[18][6] = board[18][7] = board[18][8] = board[19][6] = board[19][9] = 2;
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

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            let curPix = document.getElementById(`${i}${j}`);
            if (board[i][j] === 2) {
                curPix.className = 'blinkGameOver';
            }
        }
    }

    draw(board);
}