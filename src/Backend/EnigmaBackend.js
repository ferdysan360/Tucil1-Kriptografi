import { EnigmaMachine } from "../Backend/EnigmaMachine.js";

/**
 * Enigma backend
 * Encode and decode enigma
 * 
 * @param {String} plainText - will be encoded
 * @param {String} enigmaReflectorText - Which number will the reflector be (1 - 5) 
 * @param {String} enigmaPlugboardText - Plugboard swaps (pairs of letters)
 * @param {String} enigmaRotorText - List of rotors that will be created
 * @returns result hasil dari enkripsi atau dekripsi mesin enigma
 */
export function execute(plainText, enigmaReflectorText, enigmaPlugboardText, enigmaRotorText) {
    let cipherText = "";
    plainText = cleanText(plainText);

    let machine = getMachine(enigmaReflectorText, enigmaPlugboardText, enigmaRotorText);

    for (let i = 0; i < plainText.length; i++) {
        let charNum = plainText.charCodeAt(i) - 65;
        if (charNum >= 0 && charNum <= 25) {
            console.log("Pre: " + charNum)
            charNum = machine.executeEnigma(charNum);
            console.log("Post: " + charNum);
            charNum = charNum + 65;
            cipherText += String.fromCharCode(charNum);
        }
    }
    return cipherText;
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

/**
 * Membuat sebuah machine enigma dengan spesifikasi yang sudah diberikan
 * 
 * @param {String} enigmaReflectorText 
 * @param {String} enigmaPlugboardText 
 * @param {String} enigmaRotorText 
 * @returns {Object} mesin Enigma
 */
function getMachine(enigmaReflectorText, enigmaPlugboardText, enigmaRotorText) {
    let machine = new EnigmaMachine();
    machine.setReflector(parseInt(enigmaReflectorText));
    machine.setPlugboard(enigmaPlugboardText);

    let newRotors = enigmaRotorText.split(" ");
    for (let i = 0; i < newRotors.length; i++) {
        let seed = newRotors[i].charAt(0);
        let spinCount = parseInt(newRotors[i].charAt(1));
        let shiftLetter = newRotors[i].charCodeAt(2) - 65;
        if (shiftLetter < 0 || shiftLetter > 25) {
            shiftLetter = 0;
        }
        machine.addRotor(seed, spinCount, shiftLetter);
    }

    return machine;
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