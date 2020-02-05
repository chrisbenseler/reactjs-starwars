import React from 'react'
import { useMediaQuery } from 'react-responsive';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


function About() {

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

    const classes = useStyles();

    return <section className={classes.mainGrid}>

        <Card
            className={classes.card}
        >
            <CardHeader
                title='About'
            ></CardHeader>

            <CardContent>
                <Typography variant="body2" component="p">
                    This app has been developed used <a href="React" target="_blank">React</a> and 
                    the <a href="https://swapi.co/" target="_blank">Star Wars API</a><br />
                    The source code is available at <a href="https://github.com/chrisbenseler/reactjs-starwars" target="_blank">https://github.com/chrisbenseler/reactjs-starwars</a>
                </Typography>
                
            </CardContent>
        </Card> 
    </section>
}

export default About;