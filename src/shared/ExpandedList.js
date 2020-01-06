import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function ExpandedList(props) {

    return <ExpansionPanel>
        <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            id={"panel1a-header-" + props.title}
        >
            <Typography>{props.title}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <List>
                {props.items.map(item => <ListItem
                    onClick={ () => props.callback != null ? props.callback(item) : {} }
                    key={item}>
                    <ListItemText primary={item} />
                </ListItem>)}
            </List>
        </ExpansionPanelDetails>
    </ExpansionPanel>
}

export default ExpandedList;