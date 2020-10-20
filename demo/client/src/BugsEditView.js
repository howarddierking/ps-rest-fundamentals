import * as R from 'ramda';
import AssigneeSelector from './AssigneeSelector';
import StatusSelector from './StatusSelector';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }
}));

const pathOrEmptyString = R.pathOr('');
const pathOrEmptyArray = R.pathOr([]);
const mapIndexed = R.addIndex(R.map);

export default function BugsEditView(props){
    const classes = useStyles();
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [status, setStatus] = useState('');
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');

    if(props.selectedBug){
        setTitle(props.selectedBug.title);
        setDescription(props.selectedBug.description);
        setAssignedTo(props.selectedBug.assignedTo.id);
        setStatus(props.selectedBug.status.id);
        setComments(props.selectedBug.comments);
    }

    function handleAddComment(e){
        const comment = {
            addedOn: new Date(Date.now()).toISOString(),
            commentText: commentText
        }; 

        const newComments = R.append(comment, comments);

        setComments(newComments);
        setCommentText('');
    }

    function handleCommentChange(e){
        setCommentText(e.target.value);
    }

    function handleAssignmentChange(e){
        setAssignedTo(e.assignee);
    }

    function handleStatusChange(e){
        setStatus(e.status);
    }

    function handleSetTitle(e){
        setTitle(e.target.value);
    }

    function handleSetDescription(e){
        setDescription(e.target.value);
    }

    return (
        

        <Grid container style={{visibility: 'visible'}}>
            <Grid item xs={12}>
                <Paper className={classes.paper} elevation={0} >
                    <TextField 
                        label="Title" 
                        value={title} 
                        onChange={handleSetTitle} 
                        fullWidth />
                    <TextField 
                        label="Description" 
                        value={description} 
                        onChange={handleSetDescription} 
                        rows={5} 
                        fullWidth 
                        multiline />
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper className={classes.paper} style={{textAlign: 'left'}} elevation={0}>
                    <AssigneeSelector 
                        possibleAssignees={props.possibleAssignees} 
                        assignedTo={assignedTo} 
                        onSelectorChange={handleAssignmentChange} />
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper className={classes.paper} style={{textAlign: 'left'}} elevation={0}>
                    <StatusSelector 
                        statusFilters={props.statusFilters} 
                        activeFilterStatus={status} 
                        onSelectorChange={handleStatusChange} />
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className={classes.paper} style={{textAlign: 'left'}} elevation={0}>
                    <TextField 
                        value={commentText} 
                        onChange={handleCommentChange} 
                        label="Comments" rows={5} 
                        fullWidth multiline />
                    <Button onClick={handleAddComment}>Add Comment</Button>
                    {
                        mapIndexed((c, i) => (
                            <Box key={i}>
                                <Typography>{c.addedOn}</Typography>
                                <Typography>{c.commentText}</Typography>
                            </Box>
                        ), comments)
                    }                        
                </Paper>
            </Grid>
        </Grid>
        
    )
}
