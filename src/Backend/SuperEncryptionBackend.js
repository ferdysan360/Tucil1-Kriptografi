import { encode, decode } from '../Backend/StandardVigenereBackend.js';

export function superEncode(plainText, vigenereKey, transposeKey) {
    transposeKey = parseInt(transposeKey);
    plainText = cleanText(plainText);
    plainText = paddings(plainText, transposeKey);
    console.log(plainText);
    let vigenereText = encode(plainText, vigenereKey);
    console.log(vigenereText);
    return transform(vigenereText, transposeKey);
}

export function superDecode(cipherText, vigenereKey, transposeKey) {
    cipherText = cleanText(cipherText);
    transposeKey = Math.round(cipherText.length / parseInt(transposeKey));
    console.log(cipherText);
    let transposedText = transform(cipherText, transposeKey);
    console.log(transposedText);
    return decode(transposedText, vigenereKey);
}

// Encode key length
function paddings(text, transposeKey) {
    let padNum = (transposeKey - (((text.length % transposeKey) + transposeKey) % transposeKey)) % transposeKey;
    for (let i = 0; i < padNum; i++) {
        text += 'X';
    }
    
    return text;
}

// Transpose dengan panjang setiap baris 5
function transform(text, transposeKey) {
    let result = "";

    for (let i = 0; i < transposeKey; i++) {
        let j = 0;
        while ((i + j * transposeKey) < text.length) {
            result += text.charAt(i + j * transposeKey);
            j += 1;
        }
    }

    return result;
}

function cleanText(text) {
    text = text.toUpperCase();
    let result = "";

    for (let i = 0; i < text.length; i++) {
        if (text.charCodeAt(i) >= 65 && text.charCodeAt(i) <= 90) {
            result += text.charAt(i);
        }
    }

    return result;
}