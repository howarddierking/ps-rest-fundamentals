import * as R from 'ramda';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    filterSelector: {
        minWidth: 120,
    }
}));

export default function AssigneeSelector(props){
    const classes = useStyles();
    
    function handleStatusChange(e){
        if(props.onSelectorChange)
            props.onSelectorChange({assignee: e.target.value});
    }

    return (
        <FormControl className={classes.margin}>
            <InputLabel>Assign To</InputLabel>
            <Select value={props.assignedTo || ''} className={classes.filterSelector} onChange={handleStatusChange}>
            {
                R.map(sf => (
                    <MenuItem key={sf.id} value={sf.id}>{sf.fullName}</MenuItem>
                ), props.possibleAssignees)
            }
            </Select>
        </FormControl>
    );
}
