'use strict';

var fs = require('fs');

const fileData = fs.readFileSync('./input/input7.txt').toString();

const rules = fileData.split('.\n');
const ruleMap = {};

rules.map(rule => {
    let [bag, containedBags] = rule.split(' bags contain ');
    containedBags = containedBags.replace(/bags*\.*/g, '');    
    // containedBags = containedBags.replace(/[0-9]*/g, '');
    ruleMap[bag] = containedBags.split(',').map(bag => bag.trim());
});

function part1() {
    let total = 0;
    Object.keys(ruleMap).forEach(key => {
        let containing = getContaining(ruleMap[key]);
    
        
        if (containing) {
            total++;
        }
    });
    
    console.log('total bags', total);
}

function part2() {
    let sum =0;
    ruleMap['shiny gold'].forEach(rule => {
        const number = rule.match(/[0-9]/g);
        const color = rule.replace(/[0-9]/g, '').trim();
        const values = getContainedValues(ruleMap[color]);
        console.log(`!!${color} ${number} ${values}`);
        sum = sum + Number(number) + (number * values);
    });

    console.log('sum', sum);
}

function getContainedValues(values) {
    let innerSum = 0;

    if (!values || values[0] === 'no other') {
        return 1;
    }

    values.forEach(value => {
        const number = value.match(/[0-9]/g);
        const color = value.replace(/[0-9]/g, '').trim();
        const innerValues = getContainedValues(ruleMap[color]);
        console.log(`${color} ${number} ${innerValues}`)
        innerSum = Number(number) + (number * innerValues);
        console.log(`${color} contains ${innerSum}`);
    })

    return innerSum;
}


function getContaining(containing) {
    let contains = false;
    if (!containing) {
        return false;
    }

    let values = containing.map(val => val.replace(/[0-9]*/g, '').trim());
    if (values.includes('shiny gold')) {
        return true;
    } 

    for(let i=0; i<values.length; i++) {      
        contains = contains || getContaining(ruleMap[values[i]]) ;
    }

    
    return contains;
}

part2();