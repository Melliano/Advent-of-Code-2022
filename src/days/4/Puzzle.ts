import Puzzle from '../../types/AbstractPuzzle';
import * as fs from 'fs';

interface elfHolder {
    min: number,
    max: number,
}

export default class ConcretePuzzle extends Puzzle {
    puzzleInput = fs.readFileSync('src/days/4/input.txt').toString().trim().split('\n');

    public solveFirst(): string {
        let runningTotal = 0;

        for (let x = 0; x < this.puzzleInput.length; x++) {
            const group = this.puzzleInput[x].split(',');
            const elfOneRange: elfHolder = { min: 0, max: 0 };
            const elfTwoRange: elfHolder = { min: 0, max: 0 };
            const elfOne = group[0].split('-');
            const elfTwo = group[1].split('-');
            elfOneRange.min = parseInt(elfOne[0]);
            elfOneRange.max = parseInt(elfOne[1]);
            elfTwoRange.min = parseInt(elfTwo[0]);
            elfTwoRange.max = parseInt(elfTwo[1]);
            if (elfOneRange.min >= elfTwoRange.min && elfOneRange.max <= elfTwoRange.max 
                || elfTwoRange.min >= elfOneRange.min && elfTwoRange.max <= elfOneRange.max) {
                    runningTotal ++; 
                }
        }

        return `${runningTotal}`; 
    }

    public solveSecond(): string {
        let runningTotal = 0;

        for (let x = 0; x < this.puzzleInput.length; x++) {
            const group = this.puzzleInput[x].split(',');
            const elfOneRange: elfHolder = { min: 0, max: 0 };
            const elfTwoRange: elfHolder = { min: 0, max: 0 };
            const elfOne = group[0].split('-');
            const elfTwo = group[1].split('-');
            elfOneRange.min = parseInt(elfOne[0]);
            elfOneRange.max = parseInt(elfOne[1]);
            elfTwoRange.min = parseInt(elfTwo[0]);
            elfTwoRange.max = parseInt(elfTwo[1]);
            if (!(elfOneRange.min > elfTwoRange.max 
                || elfTwoRange.min > elfOneRange.max)) {
                runningTotal ++;
            }
        }
        return `${runningTotal}`;
    }
}

