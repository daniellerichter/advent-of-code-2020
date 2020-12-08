'use strict';

var fs = require('fs');

const fileData = fs.readFileSync('./input/input2.txt').toString();

const lines = fileData.split('\n');

let validPasswords = 0;

lines.forEach(line => {
    const [ requirements, password ] = line.split(':');
    
    const [numbers, letter] = requirements.split(' ');

    const passwordSearch = Array.from(password.trim());

    const [first, second] = numbers.split('-');        
    
    const occurrences = [passwordSearch[first-1], passwordSearch[second-1]].filter(item => item === letter);

    if (occurrences.length === 1) {
        console.log(`${password} contains ${letter} at position ${first} or ${second}`);
        validPasswords++;
    }    
})

console.log('valid passwords', validPasswords); 