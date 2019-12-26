import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        background: 'url("/assets/skywalker.jpg") center',
        padding: '4rem 0 2rem',
        minHeight: '700px',
        margin: '0 auto'
    },
    media: {
        height: '150px'
    },
    card: {
        background: '#000000',
        color: 'white',
        height: '400px',
        flexBasis: '30%',
        padding: '10px',
        position: 'relative',
        margin: '10px 1%',
        boxSizing: 'border-box'
    },
    mainGrid: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'flex-start'
    }
}));

function Home() {

    const classes = useStyles();

    const [movies, setMovies] = useState([]);

    useEffect(() => {

        fetch('https://swapi.co/api/films')
            .then(res => res.json())
            .then(response => {
                const movies = response.results.sort((a, b) => a.episode_id > b.episode_id ? 1 : -1)
                setMovies(movies)
            });
    });

    return <section className={classes.root}>
        <Grid
            className={classes.mainGrid}

        >
            {
                movies.map(movie => <Card
                    className={classes.card}
                    key={movie.episode_id}>
                    <CardHeader
                        title={movie.title}
                    ></CardHeader>
                    <CardMedia
                        className={classes.media}
                        image={"/assets/movies/movie_" + movie.episode_id + ".png"}
                        title="Paella dish"
                    />
                    <CardContent>
                        {movie.opening_crawl}
                    </CardContent>
                </Card>)
            }
        </Grid>
    </section>
}

export default Home;