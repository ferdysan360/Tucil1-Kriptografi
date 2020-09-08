/**
 * Encode AutoKey Vigenere
 * Cj = (Pj + Ki) mod 26
 * Dengan key diperpanjang dengan Pj setelah 
 * 
 * @param {String} plainText 
 * @param {String} key 
 * @returns {String} cipherText
 */
export function encode(plainText, key) {
    let cipherText = "";
    let keyCodes = getKeys(key);
    plainText = cleanText(plainText).toLowerCase();

    let end = plainText.length - keyCodes.length;
    for (let i = 0; i < end; i++) {
        let charNum = plainText.charCodeAt(i) - 97;
        if (charNum < 0) {
            charNum += 32;
        }

        if (charNum >= 0 && charNum <= 25) {
            keyCodes.push(charNum);
        }
    }

    for (let i = 0; i < plainText.length; i++) {
        let charNum = plainText.charCodeAt(i) - 97;
        let currentKey = keyCodes[i % keyCodes.length];

        if (charNum >= 0 && charNum <= 25) {
            charNum = (((charNum + currentKey) % 26) + 26) % 26;
            charNum = charNum + 65;
            cipherText += String.fromCharCode(charNum);
        }
    }

    return cipherText;
}

/**
 * Decode AutoKey Vigenere
 * Pj = (Cj - Ki) mod 26
 * Dengan Key akan diperpanjangan dengan hasil translate
 * 
 * @param {String} cipherText 
 * @param {String} key
 * @returns {String} plainText 
 */
export function decode(cipherText, key) {
    let plainText = "";
    let keyCodes = getKeys(key);
    cipherText = cleanText(cipherText).toUpperCase();

    for (let i = 0; i < cipherText.length; i++) {
        let charNum = cipherText.charCodeAt(i) - 65;
        let currentKey = keyCodes[i];

        if (charNum >= 0 && charNum <= 25) {
            charNum = (((charNum - currentKey) % 26) + 26) % 26;
            // console.log(charNum);
            if (keyCodes.length < cipherText.length) {
                keyCodes.push(charNum);
            }
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