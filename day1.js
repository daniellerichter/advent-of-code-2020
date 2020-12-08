'use strict';

var fs = require('fs');


console.time();
const fileData = fs.readFileSync('./input/input.txt').toString();


let lines = fileData.split('\n').map(x => Number(x));
lines = lines.sort((a,b) => a-b);

let found = false;

for (let i=0; i< lines.length;i++) {
    for(let j=0; j<lines.length;j++) {
        for(let m=0; m<lines.length; m++) {
            const sum = lines[i] + lines[j] + lines[m];
            if (sum === 2020) {
                console.log(lines[i] * lines[j] * lines[m]);
                found = true;
                break;
            }
            if (sum > 2020) {
                break;
            }
        }

        if (found) {
            break;
        }
    }

    if (found) {
        break;
    }
}


