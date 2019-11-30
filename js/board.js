    const boardContainer = document.getElementById("board-container");
    const column = 10;
    const row = 21;
    const boardMatrix = [];
    for (let j = 0; j < column; j++) {
        const col = boardContainer.style.gridTemplateColumns;
        boardContainer.style.gridTemplateColumns = `${col} 20px`
    }
    for (let i = 0; i < row; i++) {
        boardMatrix.push([]);

        for (let j = 0; j < column; j++) {
            boardMatrix[i][j] = 0;
            if (i){
                let pixel = document.createElement('div');
                pixel.id = `${i}${j}`;
                pixel.style.boxSizing = 'border-box';
                pixel.style.borderStyle = 'ridge';
                pixel.style.borderWidth = '2px';
                pixel.style.height = '20px';
                boardContainer.appendChild(pixel);
            }
        }
    }

    export { boardMatrix } ;