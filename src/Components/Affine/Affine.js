import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { Typography, FormLabel, FormControlLabel, FormControl, RadioGroup, Radio } from '@material-ui/core';
import { encode, decode, splitByFive } from '../../Backend/AffineBackend.js';

function Affine() {
    /*---------------- STATE DECLARAION ------------------*/
    const [value, setValue] = useState("nospaces");
    const [sourceText, setSourceText] = useState("");
    const [affineKeyText, setAffineKeyText] = useState("");
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
        setResultText(encode(sourceText, affineKeyText, keyText));
    }

    const handleDecode = (e) => {
        e.preventDefault();
        setResultText(decode(sourceText, affineKeyText, keyText));
    }

    const handleAffineKeyChange = (e) => {
        setAffineKeyText(e.target.value);
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
            <Typography variant="h5">Affine Cipher</Typography>
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
            <div className={classes.buttongroup} >
                <FormLabel component="legend"><b>Affine Key</b></FormLabel>
                <RadioGroup row aria-label="Affine Key" name="key" onChange={handleAffineKeyChange} style={{justifyContent: 'center'}}>
                    <FormControlLabel value="1" control={<Radio />} label="1" />
                    <FormControlLabel value="3" control={<Radio />} label="3" />
                    <FormControlLabel value="5" control={<Radio />} label="5" />
                    <FormControlLabel value="7" control={<Radio />} label="7" />
                    <FormControlLabel value="9" control={<Radio />} label="9" />
                    <FormControlLabel value="11" control={<Radio />} label="11" />
                    <FormControlLabel value="15" control={<Radio />} label="15" />
                    <FormControlLabel value="17" control={<Radio />} label="17" />
                    <FormControlLabel value="19" control={<Radio />} label="19" />
                    <FormControlLabel value="21" control={<Radio />} label="21" />
                    <FormControlLabel value="23" control={<Radio />} label="23" />
                    <FormControlLabel value="25" control={<Radio />} label="25" />
                </RadioGroup>
            </div>
            <div className={classes.textfield}>
                <TextField id="standard-basic" label="Key" type="number" onChange={e => setKeyText(e.target.value)}/>
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

export default Affine;
