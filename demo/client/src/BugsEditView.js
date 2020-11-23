import * as R from 'ramda';
import AssigneeSelector from './AssigneeSelector';
import StatusSelector from './StatusSelector';
import React, { useState, useEffect, useRef } from 'react';
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

const mapIndexed = R.addIndex(R.map);

export default function BugsEditView(props){
    // NOTE: hooks should come before other component code

    const [bugId, setBugId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [status, setStatus] = useState('');
    const [comments, setComments] = useState([]);
    const [createdOn, setCreatedOn] = useState('');
    const [commentText, setCommentText] = useState('');
    const [saveControl, setSaveControl] = useState(props.addBugControl);

    const isInitialRender = useRef(true);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        if(isInitialRender.current){
            isInitialRender.current = false;
            return;
        }

        if(props.selectedBugId){
            fetch(props.selectedBugId, { method: 'GET' })
                .then(res => res.json())
                .then(rep => {
                    setBugId(rep.id);
                    setTitle(rep.title);
                    setDescription(rep.description);
                    setAssignedTo(rep.assignedTo.id);
                    setStatus(rep.status.id);
                    setComments(rep.comments);
                    setEditing(true);
                    setCreatedOn(rep.createdOn);
                    setSaveControl(rep.updateBug);
                })
                .catch(err => console.log(err));
        }        
    }, [props.selectedBugId]);

    const classes = useStyles();
    
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

    function resetEditPane(){
        setTitle('');
        setDescription('');
        setAssignedTo('');
        setStatus('');
        setComments([]);
        setCreatedOn('');
        setBugId('');
        setSaveControl(props.addBugControl);
    }

    async function handleAddSave(e){
        const now = new Date().toISOString();

        if(editing){
            let rep = {
                title: title,
                description: description,
                createdBy: {
                    id:  "http://localhost:8080/user/156cb024-e3e4-44c7-bd7a-c6639f989060"   // TODO: fix once authentication is in place
                },
                createdOn: bugId ? createdOn : now,
                modifiedOn: now,
                assignedTo: {
                    id: assignedTo
                },
                status: {
                    id: status
                },
                comments: comments
            };

            if(bugId){
                rep = R.assoc('id', bugId, rep);
            }

            const fetchProperties = {
                method: saveControl.method, 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(rep)
            };

            await fetch(saveControl.id, fetchProperties);  

            resetEditPane();
        } 

        // toggle editing visibility
        setEditing(!editing);
    }

    return (
        <Box>
            <Button variant="contained" color="primary" onClick={handleAddSave}>{editing ? 'Save' : 'Add New Bug'}</Button>

            <Grid container style={{visibility: editing ? 'visible': 'hidden'}}>
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
        </Box>
    )
}
