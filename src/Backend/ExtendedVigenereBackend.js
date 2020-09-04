/* Encoding */
export function encode(plainText, key) {
    let cipherText = "";
    let keyCodes = getKeys(key);

    console.log(keyCodes);

    for (let i = 0; i < plainText.length; i++) {
        let charNum = plainText.charCodeAt(i);
        let currentKey = keyCodes[i % keyCodes.length];

        charNum = (((charNum + currentKey) % 256) + 256) % 256;
        cipherText += String.fromCharCode(charNum);
    }

    return cipherText;
}

/* Decoding */
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

export function encodeFile(plainText, key) {
    let cipherText = []
    plainText = new Int8Array(plainText);
    
    let keyCodes = getKeys(key);
    console.log(plainText);
    for (let i = 0; i < plainText.length; i++) {
        let charNum = plainText[i];
        let currentKey = keyCodes[i % keyCodes.length];

        charNum = (((charNum + currentKey) % 256) + 256) % 256;
        cipherText.push(charNum);
    }
    
    let int8cipherText = new Int8Array(cipherText);

    console.log(int8cipherText)

    return int8cipherText;
}

/* Decoding */
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

/*
function cleanText(text) {
    let result = "";

    for (let i = 0; i < text.length; i++) {
        if ((text.charCodeAt(i) >= 65 && text.charCodeAt(i) <= 90) || (text.charCodeAt(i) >= 97 && text.charCodeAt(i) <= 122)) {
            result += text.charAt(i);
        }
    }

    return result;
}
*/

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