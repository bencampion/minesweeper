const stdin = require('mock-stdin').stdin();

const input = `4 4
*...
....
.*..
....
3 5
**...
.....
.*...
0 0
`;

const output = `Field #1:
*100
2210
1*10
1110

Field #2:
**100
33200
1*100

`;

it('prints expected output', () => {
    jest.spyOn(process.stdout, 'write')
    require('./minesweeper');
    stdin.send(input);
    expect(process.stdout.write.mock.calls.flat().join('')).toEqual(output);
});
