import React, {useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


function Home() {
    const [cipherId, setCipherId] = useState(0)

    const drawerWidth = 240;

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerContainer: {
            overflow: 'auto',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    }));

    const classes = useStyles();

    const cipherList = [
        "Standard Vigenere Cipher",
        "Full Vigenere Cipher",
        "Auto-Key Vigenere Cipher",
        "Extended Vigenere Cipher",
        "Playfair Cipher",
        "Super Encryption",
        "Affine Cipher",
        "Hill Cipher",
        "Enigma Cipher"
    ];

    function test(index) {
        if (index === 0) {
            setCipherId(0);
        }
        else if (index === 1) {
            setCipherId(1);
        }
        else if (index === 2) {
            setCipherId(2);
        }
        else if (index === 3) {
            setCipherId(3);
        }
        else if (index === 4) {
            setCipherId(4);
        }
        else if (index === 5) {
            setCipherId(5);
        }
        else if (index === 6) {
            setCipherId(6);
        }
        else if (index === 7) {
            setCipherId(7);
        }
        else if (index === 8) {
            setCipherId(8);
        }
    }

  return (
    <div className="App">
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              CryptTools
          </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />
          <div className={classes.drawerContainer}>
            <List>
              {cipherList.map((text, index) => (
                <ListItem button key={text} onClick={() => test(index)}>
                  {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>
        <main className={classes.content}>
          <Toolbar />
          <Typography paragraph>
            {
                cipherId === 0 ? "Standar Vigenere Cipher"
                :cipherId === 1 ? "Full Vigenere Cipher"
                :cipherId === 2 ? "Auto-Key Vigenere Cipher"
                :cipherId === 3 ? "Extended Vigenere Cipher"
                :cipherId === 4 ? "Playfair Cipher"
                :cipherId === 5 ? "Super Encryption"
                :cipherId === 6 ? "Affine Cipher"
                :cipherId === 7 ? "Hill Cipher"
                :cipherId === 8 ? "Enigma Cipher"
                :null
            }
          </Typography>
        </main>
      </div>
    </div>
  );
}

export default Home;
