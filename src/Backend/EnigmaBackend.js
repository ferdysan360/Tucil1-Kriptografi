import {EnigmaMachine} from "../Backend/EnigmaMachine.js";

/*---------------- CIPHERING FUNCTION ------------------*/
/* Encoding */
export function encode(plainText, machineSeed) {
    let cipherText = "";
    let machine = new EnigmaMachine(machineSeed);
    plainText = cleanText(plainText);

    for (let i = 0; i < plainText.length; i++) {
        let charNum = plainText.charCodeAt(i) - 65;

        if (charNum >= 0 && charNum <= 25) {
            charNum = machine.encodeLetter(charNum);
            charNum = charNum + 65;
            cipherText += String.fromCharCode(charNum);
        }
    }
    return cipherText;
}

/* Decoding */
export function decode(cipherText, machineSeed) {
    let plainText = "";
    let machine = new EnigmaMachine(machineSeed);
    cipherText = cleanText(cipherText);

    for (let i = 0; i < cipherText.length; i++) {
        let charNum = cipherText.charCodeAt(i) - 65;

        if (charNum >= 0 && charNum <= 25) {
            charNum = machine.decodeLetter(charNum);
            charNum = charNum + 65;
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
    text = text.toUpperCase();
    for (let i = 0; i < text.length; i++) {
        if ((text.charCodeAt(i) >= 65 && text.charCodeAt(i) <= 90)) {
            result += text.charAt(i);
        }
    }
    return result;
}