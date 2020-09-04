import { encode, decode } from '../Backend/StandardVigenereBackend.js';

export function superEncode(plainText, vigenereKey, transposeKey) {
    transposeKey = parseInt(transposeKey);
    let vigenereText = encode(plainText, vigenereKey);
    return transform(vigenereText, transposeKey);
}

export function superDecode(cipherText, vigenereKey, transposeKey) {
    transposeKey = Math.ceil(cipherText.length / parseInt(transposeKey));
    let transposedText = transform(cipherText, transposeKey);
    return decode(transposedText, vigenereKey);
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