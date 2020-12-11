const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

let field = 1;
let remainingRows = 0;
let cells = [];

rl.on('line', line => {
    if (remainingRows === 0) {
        if (cells.length) {
            printField();
            cells = [];
            field++;
        }
        remainingRows = parseInt(line.split(' ')[0]);
    } else {
        cells.push(line);
        remainingRows--;
    }
});

function printField() {
    process.stdout.write(`Field #${field}:\n`);
    for (let row = 0; row < cells.length; row++) {
        for (let col = 0; col < cells[row].length; col++) {
            if (cells[row][col] === '*') {
                process.stdout.write('*');
            } else {
                let mineCount = 0;
                mineCount += countMines(cells[row - 1], col);
                mineCount += countMines(cells[row], col);
                mineCount += countMines(cells[row + 1], col);
                process.stdout.write(mineCount.toString());
            }
        }
        process.stdout.write('\n');
    }
    process.stdout.write('\n');
}

function countMines(cellRow, col) {
    if (!cellRow) return 0;
    const neighbourhood = cellRow.slice(Math.max(0, col - 1), col + 2);
    return Array.from(neighbourhood).reduce((count, cell) => cell === '*' ? count + 1 : count, 0);
}
