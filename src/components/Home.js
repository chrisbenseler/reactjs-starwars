import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { useHistory } from 'react-router-dom';

import useFetch from '../services/useFetch'


function Home() {

    const history = useHistory()

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-device-width: 1224px)'
    })
    const isBigScreen = useMediaQuery({ query: '(min-device-width: 1824px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const isTabletOrMobileDevice = useMediaQuery({
        query: '(max-device-width: 1224px)'
    })
    const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
    const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })

    const useStyles = makeStyles(theme => ({
        root: {
            background: 'url("/assets/skywalker.jpg") center no-repeat',
            padding: '4rem 1rem 2rem',
            minHeight: '700px',
            margin: '0 auto',
            backgroundSize: 'cover'
        },
        media: {
            height: '150px'
        },
        card: {
            background: '#000000',
            color: 'white',
            flexBasis: '30%',
            padding: '10px',
            position: 'relative',
            margin: '10px 1%',
            boxSizing: 'border-box'
        },
        mainGrid: {
            display: 'flex',
            flexFlow: 'row wrap',
            justifyContent: 'flex-start',
            flexDirection: isTabletOrMobile ? 'column' : 'row',
            width: isTabletOrMobile ? '100%' : '1224px',
            margin: '0 auto'
        }
    }));

    const classes = useStyles()

    const query = 'https://swapi.co/api/films'
    const data = useFetch(query)
    
    const movies = !!data ? data.results : []

    return <section className={classes.root}>

        <Grid
            className={classes.mainGrid}
        >
            {
                movies.map(movie => <Card
                    className={classes.card}
                    onClick={ () => {
                        history.push('/films/' + movie.episode_id)
                    }}
                    key={movie.episode_id}>
                    <CardHeader
                        title={movie.title}
                    ></CardHeader>
                    <CardMedia
                        className={classes.media}
                        image={"/assets/movies/movie_" + movie.episode_id + ".png"}
                        title={movie.title}
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