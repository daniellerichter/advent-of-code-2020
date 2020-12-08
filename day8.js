'use strict';

var fs = require('fs');

const fileData = fs.readFileSync('./input/input8.txt').toString();

const instructions = fileData.split('\n');

function part2() {
    let structs = [...instructions];
    let done = false;
    let changedIndex = 0;
    while(!done) {
        let {terminated, acc} = checkForEnd(structs);
        if (terminated) {
            done = true;
            console.log('terminated!', acc);
        } else {
            const {list, index} = getNewList(changedIndex, instructions);
            structs = [...list];
            changedIndex = index;
        }    
        
    }

}

function getNewList(changedIndex, originalList) {
    let structs = [...originalList];
    let found = false;
    while(!found) {
        const [command, val] =  structs[changedIndex].split(' ');
        if (command === 'nop') {        
            structs[changedIndex] = 'jmp' + ' ' + val;
            changedIndex++;
            found = true;
        } else if (command === 'jmp') {
            structs[changedIndex] = 'nop' + ' ' + val;
            changedIndex++;
            found = true;
        } else {
            changedIndex++;
        }
    }

    return {list: structs, index: changedIndex};
}

function checkForEnd(instructionList) {
    let acc = 0;
    let found = false;
    let terminated = false;
    let index = 0;
    const visitedIndexes = [];
    while (!terminated && !found) {

        const [command, val] = instructionList[index].split(' ');
        
        if (index === instructionList.length -1) {
            terminated = true;
        }

        switch(command) {
            case 'nop':
                index++;
                break;
            case 'acc':
                acc += parseInt(val);
                index++;
                break;
            case 'jmp':
                index += parseInt(val);
                break;
        }

        if (visitedIndexes.includes(index)) {
            found = true;
            return {terminated: false, acc: 0};
        } else {
            visitedIndexes.push(index);
        }
    }

    return {terminated, acc};
}

function part1() {
    let acc = 0;
    let found = false;
    let index = 0;
    const visitedIndexes = [];
    while (!found) {
        if (visitedIndexes.includes(index)) {
            found = true;
            console.log('acc is', acc);
            return;
        } else {
            visitedIndexes.push(index);
        }

        const [command, val] = instructions[index].split(' ');
        
        switch(command) {
            case 'nop':
                index++;
                break;
            case 'acc':
                acc += parseInt(val);
                index++;
                break;
            case 'jmp':
                index += parseInt(val);
                break;
        }
    }
}

part1();
part2();