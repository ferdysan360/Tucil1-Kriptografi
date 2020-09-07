export class EnigmaMachine {
    constructor() {
        this.rotors = [];
        this.reflector = new EnigmaReflector(0);
        this.plugboard = new EnigmaPlugboard("");
    }

    /*** ROTOR, REFLECTOR, PLUGBOARD ***/
    resetRotors() {
        this.rotors = []
    }
    addRotor(seed, spinCount, shiftLetter) {
        let newRotor = new EnigmaRotor(seed, spinCount, shiftLetter);
        this.rotors.push(newRotor)
    }

    setReflector(reflectorNum) {
        reflectorNum = parseInt(reflectorNum);
        this.reflector = new EnigmaReflector(reflectorNum);
    }

    setPlugboard(swappers) {
        this.plugboard = new EnigmaPlugboard(swappers);
    }

    /*** ENCODE AND DECODE ***/
    executeEnigma(charNum) {
        console.log(this.rotors);
        console.log(this.reflector);
        console.log(this.plugboard);
        // Forward
        let result = this.plugboard.plugboardExecute(charNum);
        console.log("1 = " + result);
        for (let i = 0; i < this.rotors.length; i++) {
            result = this.rotors[i].searchCipher(result);
        }
        console.log(this.rotors.length);
        console.log("2 = " + result);

        // Reflector
        result = this.reflector.reflect(result);
        console.log("3 = " + result);

        // Backward
        for (let i = (this.rotors.length - 1); i >= 0; i--) {
            result = this.rotors[i].searchPlain(result);
        }
        console.log("4 = " + result);

        result = this.plugboard.plugboardExecute(result);
        console.log("5 = " + result);

        this.rotateRotors();

        return result;
    }

    rotateRotors() {
        let i = 0;
        while (i < this.rotors.length) {
            this.rotors[i].spinRotor();
            this.rotors[i].spinCount++;
            if (this.rotors[i].spinCount >= 26) {
                this.rotors[i].spinCount = 0;
            }
            if (this.rotors[i].spinCount === this.rotors[i].rotorShiftNum) {
                i++;
            } else {
                break;
            }
        }
    }
}

class EnigmaRotor {
    constructor(seed, spinCount, rotorShiftNum) {
        this.leftRotor = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
            10, 11, 12, 13, 14, 15, 16, 17,
            18, 19, 20, 21, 22, 23, 24, 25
        ];

        let shuffleSeed = require('shuffle-seed');
        let rightRotor = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
            10, 11, 12, 13, 14, 15, 16, 17,
            18, 19, 20, 21, 22, 23, 24, 25
        ];
        rightRotor = shuffleSeed.shuffle(rightRotor, seed);
        this.rightRotor = rightRotor;

        spinCount = parseInt(spinCount);
        for (let i = 0; i < spinCount; i++) {
            this.spinRotor();
        }
        this.spinCount = spinCount;
        this.rotorShiftNum = parseInt(rotorShiftNum);
    }

    spinRotor() {
        this.leftRotor.push(this.leftRotor.shift());
        this.rightRotor.unshift(this.rightRotor.pop());
    }

    searchCipher(charNum) {
        console.log(charNum);
        let rotorKey = this.leftRotor[charNum];
        console.log("Rotor key = " + rotorKey);
        let rotorIdx = -1;
        for (let i = 0; i < this.rightRotor.length; i++) {
            if (this.rightRotor[i] === rotorKey) {
                rotorIdx = i;
                break;
            }
        }
        console.log(rotorIdx);
        return rotorIdx;
    }

    searchPlain(charNum) {
        console.log(charNum);
        let rotorKey = this.rightRotor[charNum];
        console.log("Rotor key = " + rotorKey);
        let rotorIdx = -1;
        for (let i = 0; i < this.leftRotor.length; i++) {
            if (this.leftRotor[i] === rotorKey) {
                rotorIdx = i;
                break;
            }
        }
        console.log(rotorIdx);
        return rotorIdx;
    }
}

class EnigmaPlugboard {
    constructor(swappers) {
        this.plugboard = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
            10, 11, 12, 13, 14, 15, 16, 17,
            18, 19, 20, 21, 22, 23, 24, 25
        ];
        this.setPlugboard(swappers);
        this.swappers = swappers;
    }

    resetPlugboard() {
        this.plugboard = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
            10, 11, 12, 13, 14, 15, 16, 17,
            18, 19, 20, 21, 22, 23, 24, 25
        ];
    }

    setPlugboard(swappers) {
        this.resetPlugboard();
        swappers = swappers.toUpperCase();
        let swapperList = swappers.split(" ");
        this.swappers = swappers;

        for (let i = 0; i < swapperList.length; i++) {
            let firstCharNum = swapperList[i].charCodeAt(0) - 65;
            let secondCharNum = swapperList[i].charCodeAt(1) - 65;

            if (this.plugboard[firstCharNum] === firstCharNum && this.plugboard[secondCharNum] === secondCharNum) {
                this.plugboard[firstCharNum] = secondCharNum;
                this.plugboard[secondCharNum] = firstCharNum;
            }
        }
    }

    plugboardExecute(charNum) {
        return this.plugboard[charNum];
    }
}

class EnigmaReflector {
    constructor(reflectorNum) {
        let reflectorNumber = parseInt(reflectorNum);
        this.reflector = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
            10, 11, 12, 13, 14, 15, 16, 17,
            18, 19, 20, 21, 22, 23, 24, 25
        ];
        this.setReflector(reflectorNumber);
    }

    resetReflector() {
        this.reflector = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
            10, 11, 12, 13, 14, 15, 16, 17,
            18, 19, 20, 21, 22, 23, 24, 25
        ];
    }

    setReflector(reflectorNumber) {
        this.reflectorNum = parseInt(reflectorNumber);
        switch(reflectorNumber) {
            case 1:
                this.setReflectorInner("KGWNTRBLQPAHYDVJIFXEZOCSMU");
                break;
            case 2:
                this.setReflectorInner("UORYTQSLWXZHNMBVFCGEAPIJDK");
                break;
            case 3:
                this.setReflectorInner("HLNRSKJAMGFBICUQPDEYOZXWTV");
                break;
            case 4:
                this.setReflectorInner("KPTXIGFMESAUHYQBOVJCLRZDNW");
                break;
            case 5:
                this.setReflectorInner("XDYBPWOSMUZRIQGENLHVJTFACK");
                break;
            default:
                this.swapArrayElement(this.reflector, 0, 25);
        }
    }

    setReflectorInner(reflectorKey) {
        reflectorKey = reflectorKey.toUpperCase();
        this.resetReflector();
        for (let i = 0; i < reflectorKey.length; i++) {
            if (this.reflector[i] === i) {
                let charNum = reflectorKey.charCodeAt(i) - 65
                this.reflector[i] = charNum;
            }
        } 
    }

    reflect(charNum) {
        return this.reflector[charNum];
    }

    /* Swap array element use for swapping element */
    swapArrayElement(idxOne, idxTwo) {
        let arraySource = this.reflector;
        let valOne = arraySource[idxOne];
        arraySource[idxOne] = arraySource[idxTwo];
        arraySource[idxTwo] = valOne;
    }
}
