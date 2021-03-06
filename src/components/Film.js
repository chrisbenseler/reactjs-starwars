import React, { useState, useEffect, useCallback } from 'react'
import { useMediaQuery } from 'react-responsive';
import { makeStyles } from '@material-ui/core/styles';
import useFetch from '../services/useFetch'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';

import ExpandedList from '../shared/ExpandedList';

import {
  BrowserRouter as Router,
  useParams
} from "react-router-dom";

const plainFields = {
  director: { label: 'Director' },
  producer: { label: 'Producer' },
  release_date: { label: 'Release Date' }
}

function Film() {

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
    mainGrid: {
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'flex-start',
      flexDirection: isTabletOrMobile ? 'column' : 'row',
      width: isTabletOrMobile ? '100%' : '1224px',
      margin: '0 auto'
    },
    card: {
      padding: '10px',
      position: 'relative',
      margin: '10px 1%',
      boxSizing: 'border-box',
      maxWidth: 'calc(100% - 10px)'
    }
  }));

  const history = useHistory();

  const classes = useStyles();

  let { id } = useParams()

  const query = 'https://swapi.co/api/films/' + id
  const movie = useFetch(query)

  return <section className={classes.mainGrid}>

    {movie ? <Card
      className={classes.card}
    >
      <CardHeader
        title={movie.title}
      ></CardHeader>
      <CardMedia
        image={"/assets/movies/movie_" + movie.episode_id + ".png"}
        title={movie.title}
      />
      <CardContent>
        <Typography variant="body2" component="span">
          {movie.opening_crawl.replace(/[\r\n]+/gm, "")}
        </Typography>

        <List>
          {Object.keys(plainFields).map(key => <ListItem key={key}>
            <ListItemText
              primary={plainFields[key].label}
              secondary={movie[key]}
            />
          </ListItem>)}
        </List>
        {movie.characters.length > 0 &&
          <ExpandedList
            items={movie.characters}
            title="Characters"
            callback={(item) => {
              const id = item.split('https://swapi.co/api/people/')[1]
              history.push('/people/' + id)
            }}
          />
        }
        {movie.planets.length > 0 &&
          <ExpandedList
            items={movie.planets}
            title="Planets"
            callback={(item) => {
              const id = item.split('https://swapi.co/api/planets/')[1]
              history.push('/planets/' + id)
            }}
          />
        }
        {movie.starships.length > 0 &&
          <ExpandedList items={movie.starships} title="Starships" />
        }
        {movie.vehicles.length > 0 &&
          <ExpandedList
            items={movie.vehicles}
            title="Vehicles"
            callback={(item) => {
              const id = item.split('https://swapi.co/api/vehicles/')[1]
              history.push('/vehicles/' + id)
            }}
          />
        }
        {movie.species.length > 0 &&
          <ExpandedList
            items={movie.species}
            title="Species"
          />
        }
      </CardContent>
    </Card> :
      <span>loading...</span>
    }
  </section>
}

export default Film;