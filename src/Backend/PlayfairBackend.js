/**
 * Encode Playfair Cipher
 * Buat matriks 5x5 lalu memanggil getEncodePairs untuk enkripsi setiap huruf
 * 
 * @param {String} plainText 
 * @param {String} key
 * @returns cipherText 
 */
export function encode(plainText, key) {
    let cipherText = "";
    let keyCodes = cleanUpKey(key);
    let keyMatrix = createKeyMatrix(keyCodes);
    let textPairs = cleanText(plainText);

    for (let i = 0; i < textPairs.length; i++) {
        let encodedPair = getEncodePairs(keyMatrix, textPairs[i]);
        cipherText += encodedPair[0];
        cipherText += encodedPair[1];
    }

    return cipherText;
}

/**
 * Decode Playfair Cipher
 * Buat matriks 5x5 lalu memanggil getDecodePairs untuk dekripsi setiap huruf
 * 
 * @param {String} cipherText 
 * @param {String} key 
 */
export function decode(cipherText, key) {
    let plainText = "";
    let keyCodes = cleanUpKey(key);
    let keyMatrix = createKeyMatrix(keyCodes);
    let textPairs = cleanText(cipherText);

    for (let i = 0; i < textPairs.length; i++) {
        let decodePair = getDecodePairs(keyMatrix, textPairs[i]);
        plainText += decodePair[0];
        plainText += decodePair[1];
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

// Cleaning up key (switch J to I and removes letter redundancy)
function cleanUpKey(key) {
    let resultArray = [];
    key = key.toUpperCase();

    for (let i = 0; i < key.length; i++) {
        if (key.charCodeAt(i) >= 65 && key.charCodeAt(i) <= 90) {
            let currentChar = key.charAt(i);
            if (key.charAt(i) === 'J') {
                currentChar = 'I';
            }
            if (!resultArray.includes(currentChar)) {
                resultArray.push(currentChar);
            }
        }
    }

    return resultArray;
}

/**
 * Membuat sebauh key matrix
 * Dibuat dengan menambahkan setiap huruf kecuali J
 * 
 * @param {Object} keyArray
 * @returns resultMatrix 
 */
function createKeyMatrix(keyArray) {
    // Fill the array
    for (let i = 65; i <= 90; i++) {
        let charValue = String.fromCharCode(i).charAt(0);
        if (charValue !== 'J' && !keyArray.includes(charValue)) {
            keyArray.push(charValue);
        }
    }
    // Create matrix
    let resultMatrix = [];
    let matrixRow = [];
    for (let i = 0; i < keyArray.length; i++) {
        matrixRow.push(keyArray[i]);
        if (i !== 0 && i % 5 === 4) {
            resultMatrix.push(matrixRow);
            matrixRow = [];
        }
    }
    return resultMatrix;
}

/**
 * Clean Text khusus untuk Playfair Cipher
 * Digunakan bukan hanya untuk mengubah semuanya jadi Uppercase
 * Mengubah J menjadi I, lalu menghasilkan pairing huruf
 * Jika terdapat dari pair dengan huruf yang sama, maka ganti salah satu menjadi X
 * 
 * @param {String} text
 * @returns result
 */
function cleanText(text) {
    let tempResult = "";
    let result = [];

    // Filtering non-alphabets and change J to I
    text = text.toUpperCase();
    for (let i = 0; i < text.length; i++) {
        if ((text.charCodeAt(i) >= 65 && text.charCodeAt(i) <= 90)) {
            if (text.charAt(i) === 'J') {
                tempResult += 'I';
            } else {
                tempResult += text.charAt(i);
            }
        }
    }

    // Create pairs and preventing same pairs
    let i = 0;
    while (i < (tempResult.length - 1)) {
        let tempPair = [];
        tempPair.push(tempResult.charAt(i));
        tempPair.push(tempResult.charAt(i + 1));

        if (tempPair[0] === tempPair[1]) {
            tempPair[1] = 'X';
            i += 1;
        } else {
            i += 2;
        }
        result.push(tempPair);
    }
    if (i < tempResult.length) {
        let tempPair = [];
        tempPair.push(tempResult.charAt(tempResult.length - 1));
        tempPair.push('X');
        result.push(tempPair);
    }
    return result;
}

/**
 * Get Encode Pairs
 * Encoding dalam sebuah matriks dengan aturan:
 * Pair dalam row sama: Geser ke kanan
 * Pair dalam kolom sama: Geser ke bawah
 * Selain itu: Cari baris pair kiri, dan kolom pair kanan; lalu pair kanan itu titik potong satu lagi
 * 
 * @param {Object} keyMatrix 
 * @param {Object} sourcePair
 * @returns pasangan huruf yang sudah diencode
 */
function getEncodePairs(keyMatrix, sourcePair) {
    let resultPair = [];

    let firstLocation = getLocation(keyMatrix, sourcePair[0]);
    let secondLocation = getLocation(keyMatrix, sourcePair[1]);

    // Kasus dalam baris yang sama
    if (firstLocation[0] === secondLocation[0]) {
        resultPair.push(keyMatrix[firstLocation[0]][(firstLocation[1] + 1) % 5]);
        resultPair.push(keyMatrix[secondLocation[0]][(secondLocation[1] + 1) % 5]);
    }
    // Kasus dalam kolom yang sama
    else if (firstLocation[1] === secondLocation[1]) {
        resultPair.push(keyMatrix[(firstLocation[0] + 1) % 5][firstLocation[1]]);
        resultPair.push(keyMatrix[(secondLocation[0] + 1) % 5][secondLocation[1]]);
    }
    // Kasus sisanya
    else {
        resultPair.push(keyMatrix[firstLocation[0]][secondLocation[1]]);
        resultPair.push(keyMatrix[secondLocation[0]][firstLocation[1]]);
    }

    return resultPair;
}

/**
 * Get Decode Pairs
 * Decoding dalam sebuah matriks dengan aturan:
 * Pair dalam row sama: Geser ke kiri
 * Pair dalam kolom sama: Geser ke atas
 * Selain itu: Cari baris pair kanan, dan kolom pair kiri; lalu pair kanan itu titik potong satu lagi
 * 
 * @param {Object} keyMatrix 
 * @param {Object} sourcePair 
 * @returns pasangan huruf yang sudah didecode
 */
function getDecodePairs(keyMatrix, sourcePair) {
    let resultPair = [];

    let firstLocation = getLocation(keyMatrix, sourcePair[0]);
    let secondLocation = getLocation(keyMatrix, sourcePair[1]);

    // Kasus dalam baris yang sama
    if (firstLocation[0] === secondLocation[0]) {
        resultPair.push(keyMatrix[firstLocation[0]][(firstLocation[1] + 4) % 5]);
        resultPair.push(keyMatrix[secondLocation[0]][(secondLocation[1] + 4) % 5]);
    }
    // Kasus dalam kolom yang sama
    else if (firstLocation[1] === secondLocation[1]) {
        resultPair.push(keyMatrix[(firstLocation[0] + 4) % 5][firstLocation[1]]);
        resultPair.push(keyMatrix[(secondLocation[0] + 4) % 5][secondLocation[1]]);
    }
    // Kasus sisanya
    else {
        resultPair.push(keyMatrix[firstLocation[0]][secondLocation[1]]);
        resultPair.push(keyMatrix[secondLocation[0]][firstLocation[1]]);
    }

    return resultPair;
}

/**
 * Mendapatkan lokasi huruf di matriks pair
 * 
 * @param {Object} keyMatrix 
 * @param {String} letter 
 * @returns lokasi dari key matrix tersebut
 */
function getLocation(keyMatrix, letter) {
    let resultLocation = []
    for (let i = 0; i < keyMatrix.length; i++) {
        for (let j = 0; j < keyMatrix[i].length; j++) {
            if (keyMatrix[i][j] === letter) {
                resultLocation.push(i);
                resultLocation.push(j);
                break;
            }
        }
    }
    return resultLocation;
}