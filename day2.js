'use strict';

var fs = require('fs');

const fileData = fs.readFileSync('./input2.txt').toString();

const lines = fileData.split('\n');

let validPasswords = 0;

lines.forEach(line => {
    const [ requirements, password ] = line.split(':');
    
    const [numbers, letter] = requirements.split(' ');

    const passwordSearch = Array.from(password);

    const [min, max] = numbers.split('-');    

    const matches = passwordSearch.filter(char => char === letter);
    
    if (matches.length >= min && matches.length <= max) {
        validPasswords++;
    }
})

console.log('valid passwords', validPasswords); 