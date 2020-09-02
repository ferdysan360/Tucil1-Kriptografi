function encode(plainText, key) {
    let cipherText = "";
    plainText = plainText.toLowerCase();

    for (let i = 0; i < plainText.length; i++) {
        let charNum = plainText.charCodeAt(0) - 97;
        let currentKey = key.charCodeAt(i % key);

        charNum = (((charNum + currentKey) % 26) + 26) % 26;
        charNum = charNum + 65;
        
        cipherText += String.fromCharCode(charNum);
    }

    return cipherText;
}

function decode(cipherText, key) {
    let plainText = "";
    cipherText = cipherText.toLowerCase();

    for (let i = 0; i < cipherText.length; i++) {
        let charNum = cipherText.charCodeAt(0) - 65;
        let currentKey = key.charCodeAt(i % key);

        charNum = (((charNum - currentKey) % 26) + 26) % 26;
        charNum = charNum + 65;
        
        plainText += String.fromCharCode(charNum);
    }

    return plainText;
}

function splitByFive(text) {
    let result = "";

    for (let i = 0; i < text.length; i++) {
        if (i % 5 === 0 && i !== 0) {
            result += " ";
        }
        result += text.charAt(i);
    }
}