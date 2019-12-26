import React from 'react';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    
  },
  toolbar: {
    backgroundColor: '#000000',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center'
  },
  button: {
    margin: '0 1rem'
  }
}));

function Menu() {

  const classes = useStyles();
  
  return <header className={classes.root}>
    <Toolbar className={classes.toolbar}>
      <Button
        variant="outlined"
        color="primary"
        component={Link}
        to="/home"
        classes={{
          root: classes.button
        }}
      >Movies
      </Button>
      <Button
        variant="outlined"
        color="primary"
        component={Link}
        to="/planets"
        classes={{
          root: classes.button
        }}
      >Planets
      </Button>
  </Toolbar>
  </header>
}

export default Menu;