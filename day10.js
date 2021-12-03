'use strict';

var fs = require('fs');

const fileData = fs.readFileSync('./input/input10.txt').toString();

const adapters = fileData.split('\n').map(adapter => parseInt(adapter));

adapters.sort((a, b) => a-b);
const personalAdapter = parseInt(adapters[adapters.length-1]) + 3;
adapters.push(personalAdapter);

function part1() {
    const seatAdapter = 0;
    const adapterDiffs = {
        1: 0,
        2: 0,
        3: 0
    };
    
    let currentAdapter = seatAdapter;
    
    for(let i=0;i<adapters.length;i++) {
        let test = adapters[i];
        let diff = test - currentAdapter;
        if (diff <= 3) {
            adapterDiffs[diff]++;
        }
        currentAdapter = test;
    }
    
    console.log(adapterDiffs[1] * adapterDiffs[3]);
}

function part2() {
    const seatAdapter = 0;    
    let currentAdapter = seatAdapter;

    adapters.forEach(adapter => {
        console.log(adapter);
        let window = adapters.filter((val, index) => {
            return val - adapter <= 3 && val > adapter && (adapters[index + 1] - val <= 3);
        });
        console.log('window', window);

    })
}

part2();