import seedrandom from 'seedrandom';

export class EnigmaMachine {
    constructor() {
        this.firstRotor = EnigmaRotor();
        this.secondRotor = EnigmaRotor();
        this.thirdRotor = EnigmaRotor();
        this.fourthRotor = EnigmaRotor();

        this.firstRotorSpinCount = 0;
        this.secondRotorSpinCount = 0;
        this.thirdRotorSpinCount = 0;
        this.fourthRotorSpinCount = 0;
    }

    encodeLetter(charNum) {
        let processedCharNum = this.firstRotor.searchCipher(charNum);
        processedCharNum = this.secondRotor.searchCipher(processedCharNum);
        processedCharNum = this.thirdRotor.searchCipher(processedCharNum);
        processedCharNum = this.fourthRotor.searchCipher(processedCharNum);

        this.rotateRotors();
    }

    decodeLetter(charNum) {
        let processedCharNum = this.fourthRotor.searchPlain(charNum);
        processedCharNum = this.thirdRotor.searchPlain(processedCharNum);
        processedCharNum = this.secondRotor.searchPlain(processedCharNum);
        processedCharNum = this.firstRotor.searchPlain(processedCharNum);

        this.rotateRotors();
    }

    rotateRotors() {
        this.fourthRotor.spinRotor();
        this.fourthRotorSpinCount++;

        if (this.fourthRotorSpinCount >= 26) {
            this.fourthRotorSpinCount = 0;
            this.fourthRotor.spinRotor();
            this.thirdRotorSpinCount++;
            if (this.fourthRotorSpinCount >= 26) {
                this.thirdRotorSpinCount = 0;
                this.thirdRotor.spinRotor();
                this.secondRotorSpinCount++;
                if (this.secondRotorSpinCount >= 26) {
                    this.secondRotorSpinCount = 0;
                    this.secondRotor.spinRotor();
                    this.firstRotorSpinCount++;
                    if (this.firstRotorSpinCount >= 26) {
                        this.firstRotorSpinCount = 0;
                        this.firstRotor.spinRotor();
                    }
                }
            }
        }
    }

}

export class EnigmaRotor {
    constructor() {
        this.leftRotor = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
            10, 11, 12, 13, 14, 15, 16, 17,
            18, 19, 20, 21, 22, 23, 24, 25
        ];

        const rng = seedrandom();
        let rightRotor = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
            10, 11, 12, 13, 14, 15, 16, 17,
            18, 19, 20, 21, 22, 23, 24, 25
        ];
        rightRotor.sort(() => rng.quick() - 0.5);
        this.rightRotor = rightRotor;
    }

    spinRotor() {
        this.leftRotor.push(this.leftRotor.shift());
        this.rightRotor.unshift(this.rightRotor.pop());
    }

    searchCipher(charNum) {
        let rotorKey = this.leftRotor[charNum];
        let rotorIdx = -1;
        for (let i = 0; i < this.rightRotor.length; i++) {
            if (this.rightRotor[i] === rotorKey) {
                rotorIdx = i;
                break;
            }
        }
        return rotorIdx;
    }

    searchPlain(charNum) {
        let rotorKey = this.rightRotor[charNum];
        let rotorIdx = -1;
        for (let i = 0; i < this.leftRotor.length; i++) {
            if (this.leftRotor[i] === rotorKey) {
                rotorIdx = i;
                break;
            }
        }
        return rotorIdx;
    }
}