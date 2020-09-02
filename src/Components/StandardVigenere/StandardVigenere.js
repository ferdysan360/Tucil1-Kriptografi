import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

function StandardVigenere() {
    const [sourceText, setSourceText] = useState("");
    const [keyText, setKeyText] = useState("");
    const [resultText, setResultText] = useState("");

    /* Encoding */
    function encode(plainText, key) {
        let cipherText = "";
        let keyCodes = getKeys(key);
        plainText = cleanText(plainText).toLowerCase();

        console.log(keyCodes);
    
        for (let i = 0; i < plainText.length; i++) {
            let charNum = plainText.charCodeAt(i) - 97;
            let currentKey = keyCodes[i % keyCodes.length];

            if (charNum >= 0 && charNum <= 25) {
                charNum = (((charNum + currentKey) % 26) + 26) % 26;
                charNum = charNum + 65;
                cipherText += String.fromCharCode(charNum);
            }
        }
    
        return cipherText;
    }
    
    /* Decoding */
    function decode(cipherText, key) {
        let plainText = "";
        let keyCodes = getKeys(key);
        cipherText = cleanText(cipherText).toUpperCase();

        for (let i = 0; i < cipherText.length; i++) {
            let charNum = cipherText.charCodeAt(i) - 65;
            let currentKey = keyCodes[i % keyCodes.length];

            if (charNum >= 0 && charNum <= 25) {
                charNum = (((charNum - currentKey) % 26) + 26) % 26;
                // console.log(charNum);
                charNum = charNum + 65;
                plainText += String.fromCharCode(charNum);
            }
        }
    
        return plainText;
    }

    function cleanText(text) {
        let result = "";
        
        for (let i = 0; i < text.length; i++) {
            if ((text.charCodeAt(i) >= 65 && text.charCodeAt(i) <= 90) || (text.charCodeAt(i) >= 97 && text.charCodeAt(i) <= 122)) {
                result += text.charAt(i);
            }
        }

        return result;
    }

    function getKeys(text) {
        let result = [];

        for (let i = 0; i < text.length; i++) {
            let charNum = text.charCodeAt(i) - 97;
            if (charNum < 0) {
                charNum += 32;
            }

            if (charNum >= 0 && charNum <= 25) {
                result.push(charNum);
            }
        }

        return result;
    }
    
    function splitByFive(text) {
        let result = "";
    
        for (let i = 0; i < text.length; i++) {
            if (i % 5 === 0 && i !== 0) {
                result += " ";
            }
            result += text.charAt(i);
        }

        return result;
    }

    const handleEncode = (e) => {
        e.preventDefault();
        console.log("Test encode");
        setResultText(splitByFive(encode(sourceText, keyText)));
    }

    const handleDecode = (e) => {
        console.log("Test decode");
        e.preventDefault();
        setResultText(splitByFive(decode(sourceText, keyText)));
    }

    const useStyles = makeStyles((theme) => ({
        buttongroup: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        textfield: {
            '& > *': {
                margin: theme.spacing(1),
                width: '800px',
            },
        },
        textarea: {
            width: '800px',
        },
        divider: {
            marginTop: '40px',
            marginBottom: '40px',
        }
    }));

    const classes = useStyles();

    return (
        <div>
            <Typography variant="h5">Standard Vigenere Cipher</Typography>
            <TextareaAutosize aria-label="textarea" placeholder="Input Plaintext or Ciphertext" rowsMin="20" rowsMax="20" className={classes.textarea} onChange={e => setSourceText(e.target.value)}/>
            <div className={classes.textfield}>
                <TextField id="standard-basic" label="Key" onChange={e => setKeyText(e.target.value)}/>
            </div>
            <div className={classes.buttongroup}>
                <Button variant="contained" onClick={handleEncode}>
                    Encrypt
                </Button>
                <Button variant="contained" onClick={handleDecode}>
                    Decrypt
                </Button>
            </div>
            <div className={classes.divider}>
                <Divider />
            </div>
            <TextareaAutosize aria-label="textarea" placeholder="Result Plaintext or CipherText" rowsMin="20" rowsMax="20" className={classes.textarea} value={resultText}/>
        </div>
    );
}

export default StandardVigenere;
