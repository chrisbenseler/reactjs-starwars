import React, { useState, useEffect, useCallback } from 'react'
import { useMediaQuery } from 'react-responsive';
import { makeStyles } from '@material-ui/core/styles';
import useFetch from '../services/useFetch'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { useHistory } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandedList from '../shared/ExpandedList';

import {
  BrowserRouter as Router,
  useParams
} from "react-router-dom";

const plainFields = {
  height: { label: 'Height' },
  mass: { label: 'Mass' },
  hair_color: { label: 'Hair color' },
  skin_color: { label: 'Skin color' },
  eye_color: { label: 'Eye color' },
  birth_year: { label: 'Birth year' },
  gender: { label: 'Gender' },
  homeworld: { label: 'Home world', link: true}
}

function People() {

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
            width: 'calc(100% - 10px)'
        }
    }));

  const history = useHistory();

  const classes = useStyles();

  let { id } = useParams()

  const query = 'https://swapi.co/api/people/' + id
  const people = useFetch(query)

  return <section className={classes.mainGrid}>

    {people ? <Card
    className={classes.card}
    >
      <CardHeader
        title={people.name}
      ></CardHeader>
      <CardContent>

      <List>
        {Object.keys(plainFields).map(key => <ListItem key={key}>
        <ListItemText
            primary={plainFields[key].label}
            secondary={people[key]}
        />
        </ListItem>)}
    </List>

      { people.films.length > 0 && 
        <ExpandedList
            items={people.films}
            title="Movies"
            callback={ (item) => { 
                const id = item.split('https://swapi.co/api/films/')[1]
                history.push('/films/' + id)
            }}
        />
        }
        {people.vehicles.length > 0 &&
          <ExpandedList items={people.vehicles} title="Vehicles" />
        }
        {people.species.length > 0 &&
          <ExpandedList items={people.species} title="Species" />
        }
        {people.starships.length > 0 &&
          <ExpandedList items={people.starships} title="Starships" />
        }
      </CardContent>
    </Card> :
      <span>loading...</span>
    }
  </section>
}

export default People;