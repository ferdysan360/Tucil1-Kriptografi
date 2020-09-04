import { matrix, multiply, inv, det, round } from 'mathjs';

/*---------------- CIPHERING FUNCTION ------------------*/
/* Encoding */
export function encodeHill(plainText, key) {
    let cipherText = "";
    let keyCodes = getKeys(key);
    let size = Math.sqrt(keyCodes.length);
    let N = plainText.length;

    plainText = cleanText(plainText).toLowerCase();

    let keyMatrix = [];
    for (let i = 0; i < size; i++) {
        let keyArray = [];

        for (let j = 0; j < size; j++) {
            let keyElement = keyCodes.shift();
            keyArray.push(keyElement);
        }
        
        keyMatrix.push(keyArray);
    }

    const keyMathMatrix = matrix(keyMatrix);

    for (let i = 0; i < Math.ceil(N / size); i++) {
        let arrayPlainText = [];
        
        for (let j = 0; j < size; j++) {
            let charNum = plainText.charCodeAt(0) - 97;
            plainText = plainText.substring(1);
            arrayPlainText.push(charNum);
        }
        
        let arrayCipherText = multiply(keyMathMatrix, arrayPlainText)._data;
        
        for (let j = 0; j < size; j++) {
            let charNum = arrayCipherText[j];
            charNum = ((charNum % 26) + 26) % 26;
            charNum = charNum + 65
            cipherText += String.fromCharCode(charNum);
        }
    }

    return cipherText;
}

/* Decoding */
export function decodeHill(cipherText, key) {
    let plainText = "";
    let keyCodes = getKeys(key);
    let size = Math.sqrt(keyCodes.length);
    let N = cipherText.length;

    cipherText = cleanText(cipherText).toUpperCase();

    let keyMatrix = [];
    for (let i = 0; i < size; i++) {
        let keyArray = [];

        for (let j = 0; j < size; j++) {
            let keyElement = keyCodes.shift();
            keyArray.push(keyElement);
        }

        keyMatrix.push(keyArray);
    }

    let keyMathMatrix = inv(matrix(keyMatrix));
    let determinant = round(det(matrix(keyMatrix)));

    keyMathMatrix = multiply(determinant, keyMathMatrix);

    determinant = ((determinant % 26) + 26) % 26;

    determinant = modInverse(determinant, 26);

    console.log(determinant);

    keyMathMatrix = multiply(determinant, keyMathMatrix);

    for (let i = 0; i < Math.ceil(N / size); i++) {
        let arrayCipherText = [];

        for (let j = 0; j < size; j++) {
            let charNum = cipherText.charCodeAt(0) - 65;
            cipherText = cipherText.substring(1);
            arrayCipherText.push(charNum);
        }

        let arrayPlainText = multiply(keyMathMatrix, arrayCipherText)._data;

        for (let j = 0; j < size; j++) {
            let charNum = arrayPlainText[j];
            charNum = ((charNum % 26) + 26) % 26;
            charNum = charNum + 65
            plainText += String.fromCharCode(charNum);
        }
    }
    
    return plainText;
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

function modInverse(hillKey, totalLetter) {
    for (let i = 1; i < totalLetter; i++) {
        if ((hillKey * i) % totalLetter === 1) {
            return i;
        }
    }
    return -1;
}
