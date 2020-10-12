const fs = require('fs');
const statusMessage = require('../statusMessage');
const scrabble = require('@nosweat/scrabble')
var CryptoJS = require("crypto-js");

function jumbler(word) {
    const answers = scrabble.find(word)
    return answers
}

function randomAlpha(req, res) {
    var permutations = [];
    var result = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for (var i = 0; i < 7; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    finalResult = []
    jumbledArray = []
    jumbledArray = jumbler(result)
    a = false;
    for (var j = 0; j < jumbledArray.length; j++) {
        a = fetchwords(jumbledArray[j])
        if (a == true && jumbledArray[j].length > 2) {
            finalResult.push(jumbledArray[j])
        }
    }
    if (finalResult.length >= 10) {

        // Encrypt
        var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(new statusMessage.Status("Random Alphabets", result, finalResult)), 'secret key 123').toString();

        res.end(ciphertext);
    }
    else {
        randomAlpha(req, res)
    }
}

function fetchwords(word) {

    // Returns the path to the word list which is separated by `\n`
    const wordListPath = require('word-list');

    const wordArray = fs.readFileSync(wordListPath, 'utf8').split('\n');

    return (wordArray.indexOf(word) > -1);

}


function permut(string) {
    if (string.length < 3) return string; // This is our break condition

    var permutations = []; // This array will hold our permutations
    for (var i = 0; i < string.length; i++) {
        var char = string[i];

        // Cause we don't want any duplicates:
        if (string.indexOf(char) != i) // if char was used already
            continue; // skip it this time

        var remainingString = string.slice(0, i) + string.slice(i + 1, string.length); //Note: you can concat Strings via '+' in JS

        for (var subPermutation of permut(remainingString)) {
            permutations.push(char + subPermutation)
        }

    }
    return permutations;
}


module.exports = {
    randomAlpha
};