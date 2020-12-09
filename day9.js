'use strict';

var fs = require('fs');

const fileData = fs.readFileSync('./input/input9.txt').toString();

const values = fileData.split('\n').map(val => parseInt(val));

function part2(searchNum) {
    
    for(let i=0;i<values.length;i++) {
        let sum=values[i];      

        for(let j=i+1;j<values.length;j++) {
            sum = sum + values[j];

            if (sum > searchNum) {
                break;
            }

            if (sum === searchNum) {
                console.log('found it!', i, j);
                const range = values.slice(i, j+1);
                range.sort();
                const sum = range[0] + range[range.length-1];
                console.log(sum);
            }
        }
    }

}

function part1() {
    for (let i=25;i<values.length;i++) {
        let found = false;
        let subset = values.slice(i-25, i);
        let number = values[i];
    
        for (let j=0;j<subset.length;j++) {
            const compare = subset[j];        
            
            let compareValues = [...subset];
            compareValues.splice(j, 1);
            let difference = number - compare;
    
    
            if (compareValues.includes(difference)) {   
                found = true;
                // console.log(`Found pairs for ${number} = ${difference} + ${compare}`);    
                break;
            }
        }
    
        if (!found) {
            console.log('found it', number);
            break;
        }
    }
}

part1()
part2(248131121);