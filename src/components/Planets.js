import React, { useState, useEffect, useCallback } from 'react';
import { useMediaQuery } from 'react-responsive';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useHistory } from 'react-router-dom';

import ExpandedList from '../shared/ExpandedList';

const plainFields = {
    rotation_period: { label: 'Rotation period' },
    orbital_period: { label: 'Orbital period' },
    diameter: { label: 'Diameter' },
    climate: { label: 'Climate' },
    gravity: { label: 'Gravity' },
    terrain: { label: 'Terrain' },
    surface_water: { label: 'Surface water' },
    population: { label: 'Population' },
}

function Planets() {

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
        mainGrid: {
            display: 'flex',
            flexFlow: 'row wrap',
            justifyContent: 'flex-start',
            flexDirection: isTabletOrMobile ? 'column' : 'row',
            width: isTabletOrMobile ? '100%' : '1224px',
            margin: '0 auto'
        },
        card: {
            flexBasis: '48%',
            padding: '10px',
            position: 'relative',
            margin: '10px 1%',
            boxSizing: 'border-box',
            maxWidth: 'calc(100% - 10px)'
        },
        footer: {
            padding: '30px 0'
        }
    }));

    const classes = useStyles();

    const [firstRender, setFirstRender] = useState(true)

    const [planets, setPlanets] = useState([])
    const [isFetching, setIsFetching] = useState(true)
    const [nextUrl, setNextUrl] = useState('https://swapi.co/api/planets')

    const fetchMoreListItems = useCallback(async () => {
        const response = await fetch(nextUrl)
        const json = await response.json()
        setPlanets(prevState => ([...prevState, ...json.results]))
        setNextUrl(json.next)
        setIsFetching(false)
    }, [nextUrl])

    useEffect(() => {
        if (firstRender)
            fetchMoreListItems();
        setFirstRender(false)

    }, [firstRender, fetchMoreListItems]);

    return <section >
        Planets

        <Grid
        className={classes.mainGrid}
        >
            {
                planets.map((planet, index) => <Card
                    className={classes.card}
                    key={index}>
                    <CardHeader
                        title={planet.name}
                    ></CardHeader>

                    <CardContent>
                    <List>
                        { Object.keys(plainFields).map( key => <ListItem key={key}>
                            <ListItemText
                                primary={plainFields[key].label}
                                secondary={planet[key]}
                            />
                        </ListItem> )}
                    </List>
                    { planet.films.length > 0 && 
                    <ExpandedList
                        items={planet.films}
                        title="Movies"
                        callback={ (item) => { 
                            const id = item.split('https://swapi.co/api/films/')[1]
                            history.push('/films/' + id)
                        }}
                    />
                    }
                    { planet.residents.length > 0 && 
                    <ExpandedList
                        items={planet.residents}
                        title="Residents"
                        callback={ (item) => { 
                            const id = item.split('https://swapi.co/api/people/')[1]
                            history.push('/people/' + id)
                        }}
                    />
                    }

                    </CardContent>
                </Card>)
            }
        </Grid>
        {!isFetching && nextUrl &&
            <footer
            className={classes.footer}
            >
            <Button
                
                color="secondary"
                onClick={() => { fetchMoreListItems(nextUrl) }}
                to="/home"
                classes={{
                root: classes.button
                }}
            >Load more
            </Button>
            </footer>
        }

    </section>
}

export default Planets;