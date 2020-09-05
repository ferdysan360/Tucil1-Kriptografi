import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Typography } from '@material-ui/core';
import { encode, decode, splitByFive } from '../../Backend/StandardVigenereBackend.js';

function StandardVigenere() {
    /*---------------- STATE DECLARAION ------------------*/
    const [value, setValue] = useState("nospaces");
    const [sourceText, setSourceText] = useState("");
    const [keyText, setKeyText] = useState("");
    const [resultText, setResultText] = useState("");
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
        setResultText(encode(sourceText, keyText));
    }

    const handleDecode = (e) => {
        e.preventDefault();
        setResultText(decode(sourceText, keyText));
    }

    const handleTypeChange = (e) => {
        e.preventDefault();
        setValue(e.target.value);
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
        },
        outputtype: {
            marginTop: '20px',
        },
    }));

    const classes = useStyles();

    /*---------------- VIEW ------------------*/
    return (
        <div>
            <Typography variant="h5">Standard Vigenere Cipher</Typography>
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
            <div className={classes.outputtype}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Output Type</FormLabel>
                    <RadioGroup aria-label="input-type" name="input-type" value={value} onChange={handleTypeChange}>
                        <div>
                            <FormControlLabel value="nospaces" control={<Radio />} label="No Spaces" />
                            <FormControlLabel value="splitbyfive" control={<Radio />} label="Split by Five" />
                        </div>
                    </RadioGroup>
                </FormControl>
            </div>
            {
                value === "nospaces" ?
                <TextareaAutosize aria-label="textarea" placeholder="Result Plaintext or CipherText" rowsMin="20" rowsMax="20" className={classes.textarea} value={resultText} />
                :
                <TextareaAutosize aria-label="textarea" placeholder="Result Plaintext or CipherText" rowsMin="20" rowsMax="20" className={classes.textarea} value={splitByFive(resultText)}/>
            }
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

export default StandardVigenere;
