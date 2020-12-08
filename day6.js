'use strict';

var fs = require('fs');

const fileData = fs.readFileSync('./input/input6.txt').toString();

const forms = fileData.split('\n\n');
let sum =0;

forms.forEach(form => {
    const individuals = form.split('\n').join('');
    const set = new Set(Array.from(individuals));
    sum = sum + set.size;
})

console.log('sum', sum);