import Puzzle from '../../types/AbstractPuzzle';
import * as fs from 'fs';

interface elfRange {
    min: number,
    max: number,
}

export default class ConcretePuzzle extends Puzzle {
    puzzleInput = fs.readFileSync('src/days/4/input.txt').toString().trim().split('\n');

    public solveFirst(): string {
        let runningTotal = 0;
        for (let x = 0; x < this.puzzleInput.length; x++) {
            const elfRanges = 
                this.sortData([{ min: 0, max: 0 }, { min: 0, max: 0 }]
                             , this.puzzleInput[x]);
            if (elfRanges[0].min >= elfRanges[1].min && elfRanges[0].max <= elfRanges[1].max 
                || elfRanges[1].min >= elfRanges[0].min && elfRanges[1].max <= elfRanges[0].max) {
                    runningTotal ++; 
                }
        }

        return `${runningTotal}`; 
    }

    public solveSecond(): string {
        let runningTotal = 0;

        for (let x = 0; x < this.puzzleInput.length; x++) {
            const elfRanges = 
                this.sortData([{ min: 0, max: 0 }, { min: 0, max: 0 }]
                             , this.puzzleInput[x]);
            if (!(elfRanges[0].min > elfRanges[1].max 
                || elfRanges[1].min > elfRanges[0].max)) {
                runningTotal ++;
            }
        }
        return `${runningTotal}`;
    }

    private sortData(elfRanges: elfRange[], elfGroup: string): elfRange[] {
        const group = elfGroup.split(',');
        const elfOne = group[0].split('-');
        const elfTwo = group[1].split('-');
        elfRanges[0].min = parseInt(elfOne[0]);
        elfRanges[0].max = parseInt(elfOne[1]);
        elfRanges[1].min = parseInt(elfTwo[0]);
        elfRanges[1].max = parseInt(elfTwo[1]);

        return elfRanges;
    } 
}

