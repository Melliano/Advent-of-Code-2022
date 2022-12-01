import Puzzle from '../../types/AbstractPuzzle';
import * as fs from 'fs';
import readFile from '../../utils/readFile';

export default class ConcretePuzzle extends Puzzle {
	private file = fs.readFileSync('src/days/1/input.txt').toString().split('\n');

	public solveFirst(): string {
		let groupTotal = 0;
		let highestAmount = 0;
		for (const i in this.file) {
			if (this.file[i] != '') {
				groupTotal += parseInt(this.file[i]);
			} else {
				if (groupTotal >= highestAmount) {
					highestAmount = groupTotal;
				}
				groupTotal = 0;
			}
		}
		return highestAmount.toString();
	}

	public getFirstExpectedResult(): string {
		// RETURN EXPECTED SOLUTION FOR TEST 1;
		return 'day 1 solution 1';
	}

	public solveSecond(): string {
		let highestAmounts = [0, 0, 0];
		let groupTotal = 0;

		for (const i in this.file) {
			if (this.file[i] != '') {
				groupTotal += parseInt(this.file[i]);
			} else {
				highestAmounts = highestAmounts.sort((a, b) => a - b);
				if (
					highestAmounts.some((value) => {
						return value < groupTotal;
					})
				) {
					highestAmounts.shift();
					highestAmounts.push(groupTotal);
				}
				groupTotal = 0;
			}
		}
		return `Total calories: ${
			highestAmounts[0] + highestAmounts[1] + highestAmounts[2]
		}`;
	}

	public getSecondExpectedResult(): string {
		// RETURN EXPECTED SOLUTION FOR TEST 2;
		return 'day 1 solution 2';
	}
}
