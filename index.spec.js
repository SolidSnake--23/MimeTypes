const {readdirSync, readFileSync} = require('fs');
const {join} = require('path');
const {expect} = require('chai');

const solver = require('./solver');

const INPUT_FOLDER = 'input';
const OUTPUT_FOLDER = 'output';

describe('Solution', () => {
    let tests;

    beforeEach(() => {
        const parseFilesInFolder = (folder) =>
            readdirSync(folder)
            .map(file => readFileSync(join(folder, file)))
            .map(file => file.toString())
            .map(content => content.split(/\r?\n/));
        const outputs = parseFilesInFolder(OUTPUT_FOLDER);
        tests = parseFilesInFolder(INPUT_FOLDER).map((input, index) => ({input, output: outputs[index]}));
    });


    const readline = (input) => {
        const read = (function*() {
            for (let i =0; i < input.length; i++) {
                yield input[i];
            }
        })();

        return () => read.next().value;
    };

    const print = (output) => {
        const read = (function*() {
            for (let i=0; i < output.length; i++) {
                console.log(`expect for line ${i}`);
                yield output[i];
            }
        })();
        return (line) => expect(read.next().value).to.equals(line);
    };

    it('should works', () => {
        tests.forEach(({input, output}, testIndex) => {
            console.log(`Tests for case ${testIndex}`);
            const printGenerator = print(output);
            const readlineGenerator = readline(input);
            solver(readlineGenerator, printGenerator);
            // To be sure all lines have been called;
            printGenerator();
        });
    });
});