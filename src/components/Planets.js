import React, { useState, useEffect, useCallback } from 'react';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

function Planets() {

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
        //className={classes.mainGrid}
        >
            {
                planets.map((planet, index) => <Card
                    //className={classes.card}
                    key={index}>
                    <CardHeader
                        title={planet.name}
                    ></CardHeader>

                    <CardContent>

                    </CardContent>
                </Card>)
            }
        </Grid>
        {!isFetching && nextUrl &&
            <button onClick={() => { fetchMoreListItems(nextUrl) }}>próximo</button>
        }

    </section>
}

export default Planets;