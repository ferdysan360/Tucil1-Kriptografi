import seedrandom from 'seedrandom';

export function generateTable() {
    let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        10, 11, 12, 13, 14, 15, 16, 17,
        18, 19, 20, 21, 22, 23, 24, 25
    ];

    let table = [];

    var rng = seedrandom();

    for (let i = 0; i < 26; i++) {
        array.sort(() => rng.quick() - 0.5);
        let arrayTemp = array.slice();
        table.push(arrayTemp);
    }

    console.log(table)
    return table;
}

/* Encoding */
export function encode(plainText, key, table) {
    let cipherText = "";
    let keyCodes = getKeys(key);
    plainText = cleanText(plainText).toLowerCase();

    console.log(keyCodes);

    for (let i = 0; i < plainText.length; i++) {
        let charNum = plainText.charCodeAt(i) - 97;
        let currentKey = keyCodes[i % keyCodes.length];

        if (charNum >= 0 && charNum <= 25) {
            charNum = table[currentKey][charNum];
            //console.log(charNum)
            charNum = charNum + 65;
            cipherText += String.fromCharCode(charNum);
        }
    }

    return cipherText;
}

/* Decoding */
export function decode(cipherText, key, table) {
    let plainText = "";
    let keyCodes = getKeys(key);
    cipherText = cleanText(cipherText).toUpperCase();

    for (let i = 0; i < cipherText.length; i++) {
        let charNum = cipherText.charCodeAt(i) - 65;
        let currentKey = keyCodes[i % keyCodes.length];

        if (charNum >= 0 && charNum <= 25) {
            let j = 0;
            let found = false;
            while (!found && j < 26) {
                if (table[currentKey][j] === charNum) {
                    found = true;
                    charNum = j;
                }
                else {
                    j++;
                }
            }
            // console.log(charNum);
            charNum = charNum + 65;
            plainText += String.fromCharCode(charNum);
        }
    }

    return plainText;
}

function cleanText(text) {
    let result = "";

    for (let i = 0; i < text.length; i++) {
        if ((text.charCodeAt(i) >= 65 && text.charCodeAt(i) <= 90) || (text.charCodeAt(i) >= 97 && text.charCodeAt(i) <= 122)) {
            result += text.charAt(i);
        }
    }

    return result;
}

function getKeys(text) {
    let result = [];

    for (let i = 0; i < text.length; i++) {
        let charNum = text.charCodeAt(i) - 97;
        if (charNum < 0) {
            charNum += 32;
        }

        if (charNum >= 0 && charNum <= 25) {
            result.push(charNum);
        }
    }

    return result;
}

export function splitByFive(text) {
    let result = "";

    for (let i = 0; i < text.length; i++) {
        if (i % 5 === 0 && i !== 0) {
            result += " ";
        }
        result += text.charAt(i);
    }

    return result;
}