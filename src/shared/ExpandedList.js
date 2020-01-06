import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%'
    },
}));

function ExpandedList(props) {

    const classes = useStyles();

    return <ExpansionPanel>
        <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            id={"panel1a-header-" + props.title}
        >
            <Typography>{props.title}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        
            <List
            className={classes.root}
            >
                {props.items.map(item => <ListItem
                    button
                    onClick={() => props.callback != null ? props.callback(item) : {}}
                    key={item}>
                    <ListItemText primary={item} />
                    {props.callback && <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="Film">
                            <ArrowForwardIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                    }
                </ListItem>)}
            </List>
        </ExpansionPanelDetails>
    </ExpansionPanel>
}

export default ExpandedList;