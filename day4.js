'use strict';

var fs = require('fs');

const fileData = fs.readFileSync('./input/input4.txt').toString();

const passports = fileData.split('\n\n');

console.log(passports.length);

const requiredFields = [
    'byr',
    'iyr',
    'eyr',
    'hgt',
    'hcl',
    'ecl',
    'pid'];

let valid = 0;
passports.forEach((passport, index) => {
    let invalid = false;
    let fields = passport.split(/\s/);    
    
    if (fields.length < 7) {
        return;
    }

    let passportObj = {};
   fields.forEach(field => {
        const [property, value] = field.split(':');
        passportObj[property] =  value;
    });

    console.log(Object.keys(passportObj));
    
    requiredFields.forEach(reqField => {
        if (!Object.keys(passportObj).includes(reqField)) {
            invalid = true;
        } else {
            if (!validateField(reqField, passportObj[reqField])) {
                invalid = true;
            }
        }
    });

    if (!invalid) {
        valid++;
    }

})

console.log('valid', valid);
console.log('total', passports.length);

function validateField(field, value) {
    switch(field) {
        case 'byr':
            return value.length === 4 && Number(value) >= 1920 && Number(value) <= 2002;
        case 'iyr':
            return value.length === 4 && Number(value) >= 2010 && Number(value) <= 2020;
        case 'eyr':
            return value.length === 4 && Number(value) >= 2020 && Number(value) <= 2030;
        case 'hgt':
            if (value.includes('cm')) {
                const heightCm = value.replace('cm', '');
                return heightCm >= 150 && heightCm <= 193;
            } 

            if (value.includes('in')) {
                const heightIn = value.replace('in', '');
                return heightIn >= 59 && heightIn <= 76;
            }

            return false;
        case 'hcl':
            return (/^#([a-f0-9]){6}$/).test(value);
        case 'ecl':
            return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value);
        case 'pid':
            return value.length === 9;
    }
}