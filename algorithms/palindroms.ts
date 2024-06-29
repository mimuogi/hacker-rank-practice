'use strict';

import { WriteStream, createWriteStream } from "fs";
process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString: string = '';
let inputLines: string[] = [];
let currentLine: number = 0;

process.stdin.on('data', function(inputStdin: string): void {
    inputString += inputStdin;
});

process.stdin.on('end', function(): void {
    inputLines = inputString.split('\n');
    inputString = '';

    main();
});

function readLine(): string {
    return inputLines[currentLine++];
}

function checkPalindrome(nameString: string): boolean {
    const length = nameString.length;
    for (let i = 0; i < length / 2; i++) {
        if (nameString.charAt(i) !== nameString.charAt(length - 1 - i)) {
            return false;
        }
    }
    return true;
}

function computeEncodedProductName(nameString: string): string {
    if (nameString.length < 1 || nameString.length > Number.MAX_SAFE_INTEGER) {
        return '';
    }
    if (!checkPalindrome(nameString)) {
        return '';
    }

    const charOptions: { [key: string]: number } = {};
    for (let i = 97; i <= 122; i++) {
        charOptions[String.fromCharCode(i)] = 0;
    }

    for (let i = 0; i < nameString.length; i++) {
        const character = nameString.charAt(i);
        charOptions[character] += 1;
    }

    const halfPalindrome: string[] = [];
    let middleChar = '';

    for (let i = 97; i <= 122; i++) {
        const char = String.fromCharCode(i);
        while (charOptions[char] > 1) {
            halfPalindrome.push(char);
            charOptions[char] -= 2;
        }
        if (charOptions[char] === 1) {
            middleChar = char;
        }
    }

    const solvedName = halfPalindrome.join('') + middleChar + halfPalindrome.reverse().join('');
    return solvedName;
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);
    const nameString: string = readLine();
    const result: string = computeEncodedProductName(nameString);
    ws.write(result + '\n');
    ws.end();
}
