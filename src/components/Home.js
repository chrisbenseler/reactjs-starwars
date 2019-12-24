import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundImage: 'url("/assets/skywalker.jpg")',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        padding: '4rem 0 2rem'
    },
    mainGrid: {
        
        
    },
    tile: {
        padding: theme.spacing(3),
        textAlign: 'center'
    },
}));

function Home() {

    function FormRow() {
        const items = [1, 2, 3];
        return (
            <Grid container>

                {items.map(item => 
                    <div className={classes.tile}>
                        <img src={ '/assets/movies/movie_' + item + '.png' } />
                    </div>
                    
                )
                }
            </Grid>
        )
    }

    const classes = useStyles();

    return <section className={classes.root}>
        <Grid
        className={classes.mainGrid}
        
        >
            <FormRow pa />
            <FormRow />
            <FormRow />
        </Grid>
    </section>
}

export default Home;