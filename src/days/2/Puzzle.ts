import * as fs from 'fs';
import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
    rock = {
        columnOneValue: 'A',
        columnTwoValue: 'X',
        score: 1,
        losers: 'B',
        winner: 'C',
    };
    paper = {
        columnOneValue: 'B',
        columnTwoValue: 'Y',
        score: 2,
        losers: 'C',
        winner: 'A',
    };
    scisscors = {
        columnOneValue: 'C',
        columnTwoValue: 'Z',
        score: 3,
        losers: 'A',
        winner: 'B',
    };
    valuesArray = [this.rock, this.paper, this.scisscors];
    puzzleInput = fs.readFileSync('src/days/2/input.txt').toString().trim().replace(/ /g, '').split('\n');


    public solveFirst(): string {
        let runningTotal = 0;
        for (let x = 0;x < this.puzzleInput.length; x++) { 
            const value = this.valuesArray.find(values => values.columnTwoValue === this.puzzleInput[x].charAt(1));
            const otherValue = this.valuesArray.find(values => values.columnOneValue === this.puzzleInput[x].charAt(0));
            runningTotal += value.score;
            // Draw
            if (value.columnTwoValue === otherValue.columnTwoValue) { 
               runningTotal += 3;
            }
            // Win
            if (value.columnTwoValue !== otherValue.columnTwoValue && value.losers !== otherValue.columnOneValue) {
                runningTotal += 6;
            }
        }
        return `${runningTotal}`; 
    }

    public solveSecond(): string {
        let runningTotal = 0;
        for (let x = 0; x < this.puzzleInput.length; x++) {
            const oppValue = this.valuesArray.find(values => values.columnOneValue === this.puzzleInput[x].charAt(0)); 
            const result = this.puzzleInput[x].charAt(1);
            switch (result) {
                case ('Y'): {
                    runningTotal += oppValue.score + 3;
                    break;
                }
                case ('X'): {
                    runningTotal += this.valuesArray.find(values => values.columnOneValue === oppValue.winner).score; 
                    break;
                }
                case ('Z'): {
                    runningTotal += this.valuesArray.find(values => values.columnOneValue === oppValue.losers).score + 6; 
                    break;
                }
            }
        }
            
        return `${runningTotal}`;
    }
}
