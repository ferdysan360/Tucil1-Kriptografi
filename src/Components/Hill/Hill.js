import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { Typography, FormLabel } from '@material-ui/core';
import { encode, decode, splitByFive } from '../../Backend/HillBackend.js';

function Hill() {
    /*---------------- STATE DECLARAION ------------------*/
    const [sourceText, setSourceText] = useState("");
    const [keyMatrix, setKeyMatrix] = useState([[]]);
    const [resultText, setResultText] = useState("");

    const [sizeText, setSizeText] = useState("");
    const [sizeView, setSizeView] = useState(0);

    let fileReader;

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

    /*---------------- GUI HANDLERS ------------------*/
    const handleSizeText = (e) => {
        setSizeText(e.target.value);
    }

    const handleCreateMatrix = (e) => {
        e.preventDefault();
        let size = parseInt(sizeText);
        
        let tempKeyMatrix = [];
        for (let i = 0; i < size; i++) {
            let tempMatrixRow = [];
            for (let j = 0; j < size; j++) {
                tempMatrixRow.push(0);
            }
            tempKeyMatrix.push(tempMatrixRow);
        }
        setKeyMatrix(tempKeyMatrix);
        setSizeView(size);
    }

    const handleFileRead = (e) => {
        e.preventDefault();

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
        setResultText(splitByFive(encode(sourceText, keyMatrix)));
    }

    const handleDecode = (e) => {
        e.preventDefault();
        setResultText(splitByFive(decode(sourceText, keyMatrix)));
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

    /*---------------- VIEW ------------------*/
    return (
        <div>
            <Typography variant="h5">Hill Cipher</Typography>
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
            <div className={classes.divider}>
                <Divider />
            </div>
            <div>
                <FormLabel component="legend"><b>Key Matrix</b></FormLabel>
                <TextField id="standard-basic" label="Matrix Size" type="number" onChange={handleSizeText}/>
                <div className={classes.buttongroup}>
                    <Button variant="contained" onClick={handleCreateMatrix}>
                        Create Matrix
                    </Button>
                </div>
            </div>
            <div className={classes.divider} />
            <div>
                {sizeView <= 0 ? 
                    <FormLabel component="legend">Matrix Size Not Positive</FormLabel> :
                    keyMatrix.map((keyRow, rowIdx) => (
                        keyRow.map((keyCell, colIdx) => (
                            <div key={`${rowIdx},${colIdx}`}>
                                Test
                            </div>
                        ))
                    ))
                }
            </div>
            <div className={classes.divider} />
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

export default Hill;
