#!/usr/bin/env node
import { getOperations } from './solver.js';
import yargs from 'yargs'


var argv = yargs(process.argv.slice(2))
    .usage('Usage: node $0 -s [solution] -n [[numbers]]')
    .example('node $0 -s 42 -n [2,8,9,25]', 'returns the solution to the problem')
    .demandOption(['s', 'n'])
    .argv;

try {
    const solution = argv.s;
    const numbers = JSON.parse(argv.n);
    getOperations(solution, numbers);
} catch (e) {
    console.error('ERROR: remember s must be an integer and s a list of integers', `Example: node index.js -s 42 -n [2,8,9,25]`);
}
