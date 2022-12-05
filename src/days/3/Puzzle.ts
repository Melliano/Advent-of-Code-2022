import * as fs from 'fs';
import Puzzle from '../../types/AbstractPuzzle';

export default class ConcretePuzzle extends Puzzle {
    puzzleInput = fs.readFileSync('src/days/3/input.txt').toString().trim().split('\n');
    uppercaseSubtract = 38;
    lowercaseSubstract = 96;

    public solveFirst(): string {
        let runningTotal = 0;

        for (let x = 0; x < this.puzzleInput.length; x++) {
            const thisLine = this.puzzleInput[x];
            const firstHalf = this.puzzleInput[x].slice(0, thisLine.length / 2);
            const secondHalf = this.puzzleInput[x].slice(thisLine.length / 2, thisLine.length);
            let lineTotal = 0;

            for (let y = 0; y < firstHalf.length; y++) {
                if (secondHalf.includes(firstHalf[y])) {
                    lineTotal += this.calculateValueAsInt(firstHalf[y]);
                    break;
                }
            }
            runningTotal += lineTotal;
        }

        return `${runningTotal}`;
    }

    public solveSecond(): string {
        let runningTotal = 0;

        for (let x = 0; x < this.puzzleInput.length - 2; x+=3) {
            const thisLine = this.puzzleInput[x];
            const secondLine = this.puzzleInput[x+1];
            const thirdLine = this.puzzleInput[x+2];
            let groupTotal = 0;
            for (let y = 0; y < thisLine.length; y++) {
                if (secondLine.includes(thisLine[y]) && thirdLine.includes(thisLine[y])) {
                    groupTotal += this.calculateValueAsInt(thisLine[y]);
                    break;
                }
            }
            runningTotal += groupTotal;
        }

        return `${runningTotal}`;
    }

    private calculateValueAsInt(character: string) : number {
        const valueAsInt = character.charCodeAt(0);
        return character === character.toUpperCase() 
            ? valueAsInt - this.uppercaseSubtract 
            : valueAsInt - this.lowercaseSubstract;
    }
}

