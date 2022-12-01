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
				continue;
			}
			highestAmount = groupTotal > highestAmount ? groupTotal : highestAmount;
			groupTotal = 0;
		}
		return `${highestAmount}`;
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
				continue;
			}
			highestAmounts = highestAmounts.sort((a, b) => a - b);

			if (highestAmounts.some((value) => value < groupTotal)) {
				highestAmounts.shift();
				highestAmounts.push(groupTotal);
			}

			groupTotal = 0;
		}
		return `${highestAmounts.reduce((sum, current) => sum + current, 0)}`;
	}

	public getSecondExpectedResult(): string {
		// RETURN EXPECTED SOLUTION FOR TEST 2;
		return 'day 1 solution 2';
	}
}
