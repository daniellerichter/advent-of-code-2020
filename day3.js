'use strict';

var fs = require('fs');

const fileData = fs.readFileSync('./input/input3.txt').toString();

const lines = fileData.split('\n');

// 969 wide

let multiply = 1;
let slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2]
];

slopes.forEach(slope => {    

    let trees = 0;
    let currentIndex = 0;
    const [ right, down] = slope;
    
    for (let i=0; i<lines.length;i+=down) {
        const line = lines[i];
        let fullLine = line.trim();

        while (fullLine.length < currentIndex+1) {
            fullLine = fullLine + line;
        }
    
        if (fullLine.charAt(currentIndex) === '#') {
            trees++;        
        }
    
        currentIndex+=right;  
    }

    console.log(trees);
    multiply = multiply * trees;
    console.log("multiply", multiply);
})