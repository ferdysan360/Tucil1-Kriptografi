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
import { encode, decode, encodeFile, decodeFile, splitByFive } from '../../Backend/ExtendedVigenereBackend.js';

function ExtendedVigenere() {
    const [outputType, setOutputType] = useState("nospaces");
    const [value, setValue] = useState("text");
    const [sourceText, setSourceText] = useState("");
    const [sourceBytes, setSourceBytes] = useState(null);
    const [keyText, setKeyText] = useState("");
    const [resultText, setResultText] = useState("");
    const [resultBytes, setResultBytes] = useState(null);
    const [inputFile, setInputFile] = useState(null);
    let fileReader;

    function downloadText(data, filename, type) {
        let newFilename = filename.split('.')[0];
        var file = new Blob([data], { type: type });
        if (window.navigator.msSaveOrOpenBlob) // IE10+
            window.navigator.msSaveOrOpenBlob(file, newFilename);
        else { // Others
            var a = document.createElement("a"),
                url = URL.createObjectURL(file);
            a.href = url;
            a.download = newFilename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function () {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        }
    }

    function download(data, filename, type) {
        data = data.buffer;
        console.log(data);
        let newFilename = filename.split('.')[0];
        var file = new Blob([data], { type: type });
        if (window.navigator.msSaveOrOpenBlob) // IE10+
            window.navigator.msSaveOrOpenBlob(file, newFilename);
        else { // Others
            var a = document.createElement("a"),
                url = URL.createObjectURL(file);
            a.href = url;
            a.download = newFilename;
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
        
        console.log(fileReader)
        const content = fileReader.result;
        setSourceBytes(content);
    }

    const handleFileChosen = (file) => {
        setInputFile(file)
        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsArrayBuffer(file);
        console.log(file);
        
    }

    const handleTextFileRead = (e) => {
        e.preventDefault()

        console.log(fileReader)
        const content = fileReader.result;
        setSourceText("");
        setSourceText(content);
    }

    const handleTextFileChosen = (file) => {
        fileReader = new FileReader();
        fileReader.onloadend = handleTextFileRead;
        fileReader.readAsText(file);
        console.log(file);

    }
    
    const handleEncode = (e) => {
        e.preventDefault();
        console.log("Test encode");
        setResultText(encode(sourceText, keyText));
    }
    
    const handleDecode = (e) => {
        console.log("Test decode");
        e.preventDefault();
        setResultText(decode(sourceText, keyText));
    }
    
    const handleEncodeFile = (e) => {
        e.preventDefault();
        setResultBytes(encodeFile(sourceBytes, keyText));
    }

    const handleDecodeFile = (e) => {
        e.preventDefault();
        setResultBytes(decodeFile(sourceBytes, keyText));
    }

    const handleTypeChange = (e) => {
        e.preventDefault();
        setValue(e.target.value);
    }

    const handleOutputTypeChange = (e) => {
        e.preventDefault();
        setOutputType(e.target.value);
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
        inputtype: {
            marginTop: '20px',
        },
        input: {
            display: "none",
        },
        outputtype: {
            marginTop: '20px',
        },
    }));

    const classes = useStyles();

    return (
        <div>
            <Typography variant="h5">Extended Vigenere Cipher</Typography>
            <div className={classes.inputtype}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Input Type</FormLabel>
                    <RadioGroup aria-label="input-type" name="input-type" value={value} onChange={handleTypeChange}>
                        <div>
                            <FormControlLabel value="text" control={<Radio />} label="Text Input" />
                            <FormControlLabel value="file" control={<Radio />} label="File Input" />
                        </div>
                    </RadioGroup>
                </FormControl>
            </div>
            {
                value === "text" ? 
                <div>
                    <TextareaAutosize aria-label="textarea" placeholder="Input Plaintext or Ciphertext" rowsMin="20" rowsMax="20" className={classes.textarea} onChange={e => setSourceText(e.target.value)} value={sourceText} />
                    <div>
                        <input
                            accept=".txt"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={e => handleTextFileChosen(e.target.files[0])}
                        />
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" color="primary" component="span">
                                Upload
                    </Button>
                        </label>
                    </div>
                </div>
                :
                <div className={classes.buttongroup}>
                    <input
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
                    <div>
                        {
                            inputFile === null ? "No File Selected"
                            : "File uploaded: " + inputFile.name
                        }
                    </div>
                </div>
            }
            <div className={classes.textfield}>
                <TextField id="standard-basic" label="Key" onChange={e => setKeyText(e.target.value)} />
            </div>
            {
                value === "text" ?
                <div className={classes.buttongroup}>
                    <Button variant="contained" onClick={handleEncode}>
                        Encrypt
                    </Button>
                    <Button variant="contained" onClick={handleDecode}>
                        Decrypt
                    </Button>
                </div>
                :
                <div className={classes.buttongroup}>
                    <Button variant="contained" onClick={handleEncodeFile}>
                        Encrypt File
                    </Button>
                    <Button variant="contained" onClick={handleDecodeFile}>
                        Decrypt File
                    </Button>
                </div>
            }
            <div className={classes.divider}>
                <Divider />
            </div>
            {
                value === "text" ?
                <div>
                    <div className={classes.outputtype}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Output Type</FormLabel>
                            <RadioGroup aria-label="input-type" name="input-type" value={outputType} onChange={handleOutputTypeChange}>
                                <div>
                                    <FormControlLabel value="nospaces" control={<Radio />} label="No Spaces" />
                                    <FormControlLabel value="splitbyfive" control={<Radio />} label="Split by Five" />
                                </div>
                            </RadioGroup>
                        </FormControl>
                    </div>
                    {
                        outputType === "nospaces" ?
                            <TextareaAutosize aria-label="textarea" placeholder="Result Plaintext or CipherText" rowsMin="20" rowsMax="20" className={classes.textarea} value={resultText} />
                            :
                            <TextareaAutosize aria-label="textarea" placeholder="Result Plaintext or CipherText" rowsMin="20" rowsMax="20" className={classes.textarea} value={splitByFive(resultText)} />
                    }
                    <div className={classes.buttongroup}>
                        <Button variant="contained" color="primary" component="span" onClick={() => downloadText(resultText, "Ciphertext", "")}>
                            Save Text To File
                        </Button>
                    </div>
                </div>
                :
                <div>
                    <div className={classes.buttongroup}>
                        <Button variant="contained" color="primary" component="span" onClick={() => download(resultBytes, "crypt" + inputFile.name, inputFile.type)}>
                            Save To File
                        </Button>
                        <div>
                            {
                                resultBytes === null ? "No File Result"
                                    : "File ready: crypt" + inputFile.name.split('.')[0]
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default ExtendedVigenere;
