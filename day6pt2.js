'use strict';

var fs = require('fs');

const fileData = fs.readFileSync('./input/input6.txt').toString();

const forms = fileData.split('\n\n');
let sum =0;

forms.forEach(form => {
    const individuals = form.split('\n');
    let answers = [...individuals[0]];
    individuals.forEach(response => {
        answers = answers.filter(answer => response.includes(answer));
    });

    sum = sum + answers.length;
})

console.log('sum', sum);

