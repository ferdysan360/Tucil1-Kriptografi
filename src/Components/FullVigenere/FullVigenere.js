import React, {useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

function FullVigenere() {

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
            <TextareaAutosize aria-label="textarea" placeholder="Input Plaintext or Ciphertext" rowsMin="20" rowsMax="20" className={classes.textarea} />
            <div className={classes.textfield}>
                <TextField id="standard-basic" label="Key" />
            </div>
            <div className={classes.buttongroup}>
                <Button variant="contained">
                    Encrypt
                </Button>
                <Button variant="contained">
                    Decrypt
                </Button>
            </div>
            <div className={classes.divider}>
                <Divider />
            </div>
            <TextareaAutosize aria-label="textarea" placeholder="Result Plaintext or CipherText" rowsMin="20" rowsMax="20" className={classes.textarea} />
        </div>
    );
}

export default FullVigenere;
