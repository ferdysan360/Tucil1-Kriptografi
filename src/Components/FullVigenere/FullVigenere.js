import React, {useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import { generateTable, encode, decode, splitByFive } from '../../Backend/FullVigenereBackend.js';

function FullVigenere() {

    const [table,  setTable] = useState([]);

    let fileReader;

    useEffect(() => {
        setTable(generateTable())
    }, [])

    const [sourceText, setSourceText] = useState("");
    const [keyText, setKeyText] = useState("");
    const [resultText, setResultText] = useState("");

    function download(data, filename, type) {
        var file = new Blob([data], { type: type });
        if (window.navigator.msSaveOrOpenBlob) // IE10+
            window.navigator.msSaveOrOpenBlob(file, filename);
        else { // Others
            var a = document.createElement("a"),
                url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function () {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        }
    }

    const handleFileRead = (e) => {
        e.preventDefault()

        const content = fileReader.result;
        setSourceText(content);
    }

    const handleFileChosen = (file) => {
        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(file);
    }

    const handleEncode = (e) => {
        e.preventDefault();
        setResultText(splitByFive(encode(sourceText, keyText, table)));
    }

    const handleDecode = (e) => {
        e.preventDefault();
        setResultText(splitByFive(decode(sourceText, keyText, table)));
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
        },
        input: {
            display: "none",
        }
    }));

    const classes = useStyles();

    return (
        <div>
            <Typography variant="h5">Full Vigenere Cipher</Typography>
            <TextareaAutosize aria-label="textarea" placeholder="Input Plaintext or Ciphertext" rowsMin="20" rowsMax="20" className={classes.textarea} onChange={e => setSourceText(e.target.value)} value={sourceText}/>
            <div>
                <input
                    accept=".txt"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={e => handleFileChosen(e.target.files[0])}
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span">
                        Upload
                    </Button>
                </label>
            </div>
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
            <div>
                <label htmlFor="contained-download-file">
                    <Button variant="contained" color="primary" component="span" onClick={() => download(resultText, "Ciphertext", "txt")}>
                        Save To File
                    </Button>
                </label>
            </div>
        </div>
    );
}

export default FullVigenere;
