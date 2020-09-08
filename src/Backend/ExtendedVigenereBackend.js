/**
 * Encode Extended Vigenere Text
 * Cj = (Pj + Ki) mod 256
 * 
 * @param {String} plainText 
 * @param {String} key 
 * @returns {String} cipherText
 */
export function encode(plainText, key) {
    let cipherText = "";
    let keyCodes = getKeys(key);

    for (let i = 0; i < plainText.length; i++) {
        let charNum = plainText.charCodeAt(i);
        let currentKey = keyCodes[i % keyCodes.length];

        charNum = (((charNum + currentKey) % 256) + 256) % 256;
        cipherText += String.fromCharCode(charNum);
    }

    return cipherText;
}

/**
 * Decode Extended Vigenere Text
 * Pj = (Cj - Ki) mod 256
 * 
 * @param {String} cipherText
 * @param {String} key 
 * @returns {String} plainText
 */
export function decode(cipherText, key) {
    let plainText = "";
    let keyCodes = getKeys(key);

    for (let i = 0; i < cipherText.length; i++) {
        let charNum = cipherText.charCodeAt(i);
        let currentKey = keyCodes[i % keyCodes.length];

        charNum = (((charNum - currentKey) % 256) + 256) % 256;
        plainText += String.fromCharCode(charNum);
    }

    return plainText;
}

/**
 * Encode Extended Vigenere File
 * Cj = (Pj + Ki) mod 256
 * Uses Int8Array as the byte arrays
 * 
 * @param {String} plainText 
 * @param {String} key 
 * @returns {String} cipherText
 */
export function encodeFile(plainText, key) {
    let cipherText = [];
    plainText = new Int8Array(plainText);
    
    let keyCodes = getKeys(key);
    for (let i = 0; i < plainText.length; i++) {
        let charNum = plainText[i];
        let currentKey = keyCodes[i % keyCodes.length];

        charNum = (((charNum + currentKey) % 256) + 256) % 256;
        cipherText.push(charNum);
    }
    
    let int8cipherText = new Int8Array(cipherText);
    return int8cipherText;
}

/**
 * Decode Extended Vigenere Text
 * Pj = (Cj - Ki) mod 256
 * Using Int8Array as byte arrays
 * 
 * @param {String} cipherText
 * @param {String} key 
 * @returns {String} plainText
 */
export function decodeFile(cipherText, key) {
    let plainText = [];
    cipherText = new Int8Array(cipherText);
    
    let keyCodes = getKeys(key);

    for (let i = 0; i < cipherText.length; i++) {
        let charNum = cipherText[i];
        let currentKey = keyCodes[i % keyCodes.length];

        charNum = (((charNum - currentKey) % 256) + 256) % 256;
        plainText.push(charNum);
    }

    let int8plainText = new Int8Array(plainText);
    return int8plainText;
}

function getKeys(text) {
    let result = [];

    for (let i = 0; i < text.length; i++) {
        let charNum = text.charCodeAt(i);
        result.push(charNum);
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