/**
 * Affine encryption
 * Cj = (Ai * Pj + Ki) mod 26
 * 
 * @param {String} plainText 
 * @param {Number} affineKey 
 * @param {Number} key 
 */
export function encode(plainText, affineKey, key) {
    let cipherText = "";
    let keyNum = parseInt(key);
    let affineKeyNum = parseInt(affineKey);
    plainText = cleanText(plainText);

    for (let i = 0; i < plainText.length; i++) {
        let charNum = plainText.charCodeAt(i) - 65;
        charNum = (((charNum * affineKeyNum + keyNum) % 26) + 26) % 26;
        charNum = charNum + 65;
        cipherText += String.fromCharCode(charNum);
    }
    return cipherText;
}

/**
 * Affine decryption
 * Syarat Affine Key merupakan coprime dari 26
 * Pj = (ModInverse(Ai) * Cj - Ki)
 * 
 * @param {String} cipherText 
 * @param {Number} affineKey 
 * @param {Number} key 
 */
export function decode(cipherText, affineKey, key) {
    let plainText = "";
    let keyNum = parseInt(key);
    let affineKeyNum = parseInt(affineKey);
    cipherText = cleanText(cipherText);

    let reverseAffineKeyNum = modInverse(affineKeyNum, 26);

    for (let i = 0; i < cipherText.length; i++) {
        let charNum = cipherText.charCodeAt(i) - 65;
        charNum = (((reverseAffineKeyNum * (charNum - keyNum)) % 26) + 26) % 26;
        charNum = charNum + 65;
        plainText += String.fromCharCode(charNum);
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
    text = text.toUpperCase();
    for (let i = 0; i < text.length; i++) {
        if ((text.charCodeAt(i) >= 65 && text.charCodeAt(i) <= 90)) {
            result += text.charAt(i);
        }
    }
    return result;
}

// Fungsi untuk modulus inverse
function modInverse(affineKey, totalLetter) {
    for (let i = 1; i < totalLetter; i++) {
        if ((affineKey * i) % totalLetter === 1) {
            return i;
        }
    }
    return -1;
}