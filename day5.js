'use strict';

var fs = require('fs');

const fileData = fs.readFileSync('./input5.txt').toString();

const passes = fileData.split('\n');

const rows = {};
const seatIds = [];

passes.forEach(pass => {    
    const passValues = Array.from(pass);
    let min = 0;
    let max = 127;
    for(let i =0; i<7; i++) {
        const val = passValues[i];

        if (val === 'F') {         
            max = max - Math.ceil((max-min)/2);
        } else {
            min = min + Math.ceil((max-min)/2);
        }        
    }

    let minCol = 0;
    let maxCol = 7;
    for(let i =7; i<10; i++) {
        const val = passValues[i];

        if (val === 'L') {         
            maxCol = maxCol - Math.ceil((maxCol-minCol)/2);
        } else {
            minCol = minCol + Math.ceil((maxCol-minCol)/2);
        }        
    }

    if (rows[min]) {
        rows[min].push(minCol);
    } else {
        rows[min] = [minCol];
    }

    const seatId = (min * 8) + minCol;
    seatIds.push(seatId);
})


Object.keys(rows).forEach(key => {
    const row = rows[key];
    if (row.length < 8) {
        const remaining = [7,6,5,4,3,2,1,0].filter(x => !row.includes(x));
        
        remaining.forEach(remainRow => {
            const seatId = (key*8) + remainRow;
            if (seatIds.includes(seatId+1) && seatIds.includes(seatId-1)) {
                console.log('your seat id is', seatId);
            }
        })
    }
})