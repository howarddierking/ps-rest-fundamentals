import * as R from 'ramda';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/core/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

const indexResourceId = 'http://localhost:8080/index.json';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    margin: {
        margin: theme.spacing(1),
    },
    filterSelector: {
        minWidth: 120,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

function BugsTable(props){
    return (
        <TableContainer component={Paper}>
            <Table size="small" aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell align="right">Created By</TableCell>
                    <TableCell align="right">Created On</TableCell>
                    <TableCell align="right">Modified On</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {
                R.map(bug => (
                    <TableRow key={bug.id} hover>
                        <TableCell component="th" scope="row">{bug.title}</TableCell>
                        <TableCell align="right">{bug.createdBy}</TableCell>
                        <TableCell align="right">{bug.createdOn}</TableCell>
                        <TableCell align="right">{bug.modifiedOn}</TableCell>
                    </TableRow> 
                ), props.bugs)
            }
            </TableBody>
            </Table>
        </TableContainer>
    )
}

function StatusSelector(props){
    const classes = useStyles();
    
    function handleStatusChange(e){
        if(props.onSelectorChange)
            props.onSelectorChange({status: e.target.value});
    }

    return (
        <FormControl className={classes.margin}>
            <InputLabel>Status</InputLabel>
            <Select value={props.activeFilterStatus} className={classes.filterSelector} onChange={handleStatusChange}>
            {
                R.map(sf => (
                    <MenuItem key={sf.id} value={sf.id}>{sf.title}</MenuItem>
                ), props.statusFilters)
            }
            </Select>
        </FormControl>
    );
}

function AssigneeSelector(props){
    const classes = useStyles();
    
    function handleStatusChange(e){
        if(props.onSelectorChange)
            props.onSelectorChange({assignee: e.target.value});
    }

    return (
        <FormControl className={classes.margin}>
            <InputLabel>Assign To</InputLabel>
            <Select value={props.assignedTo} className={classes.filterSelector} onChange={handleStatusChange}>
            {
                R.map(sf => (
                    <MenuItem key={sf.id} value={sf.id}>{sf.fullName}</MenuItem>
                ), props.possibleAssignees)
            }
            </Select>
        </FormControl>
    );
}

function BugsTablePager(props){
    return (
        <div style={{textAlign: 'right'}}>
            { props.prev && (
            <IconButton onClick={ () => { props.onPage({direction: 'previous', pageId: props.prev}) }}>
                <FontAwesomeIcon icon={faArrowLeft} />
            </IconButton> )}
            { props.next && (
            <IconButton onClick={ () => { props.onPage({direction: 'next', pageId: props.next}) }}>
                <FontAwesomeIcon icon={faArrowRight} />
            </IconButton> )}
        </div>
    );
}

function BugsListView(props){
    const classes = useStyles();

    // initial load comes from props
    const [isLoading, setIsLoading] = useState(false);  
    const [statusFilters, setStatusFilters] = useState(props.statusFilters);
    const [pageId, setPageId] = useState(props.bugsList.id);
    const [bugsList, setBugsList] = useState(props.bugsList);

    useEffect(() => {
        fetch(pageId, { method: 'GET' })
        .then(res => res.json())
        .then(rep => {
            setBugsList(rep);
            setIsLoading(false);
        })
        .catch(err => console.log(err));
    }, [pageId]);  // this last param is REALLY important to keep out of an infinite loop of re-fetching

    function handlePage(e){
        setIsLoading(true);
        setPageId(e.pageId);
    }

    function handleFilterChange(e){
        setIsLoading(true);
        const statusInfo = R.find(R.propEq('id', e.status), statusFilters);
        setPageId(statusInfo.href);
    }

    if(isLoading){
        return <div>Loading...</div>
    } else {
        return (
            <Box>
                <StatusSelector onSelectorChange={handleFilterChange} activeFilterStatus={bugsList.activeFilterStatus} statusFilters={statusFilters}/>
                <BugsTable bugs={bugsList.items} />
                <BugsTablePager onPage={handlePage} prev={bugsList.prevPage} next={bugsList.nextPage} />
            </Box>
        )
    }
}

function BugsEditView(props){
    const classes = useStyles();
    const [editModeActive, setEditModeActive] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]);
    const [assignmentId, setAssignmentId] = useState('');
    const [statusId, setStatusId] = useState('');

    function handleAddSave(e){
        setEditModeActive(true);
    }

    function handleAddComment(e){
        const comment = {
            addedOn: new Date(Date.now()),
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
        setAssignmentId(e.assignee);
    }

    function handleStatusChange(e){
        setStatusId(e.status);
    }

    return (
        <Box>
        <Button variant="contained" onClick={handleAddSave}>
            { editModeActive ? "Save" : "Add New Bug" }
        </Button>
        <br/>


        <Grid container style={{visibility: editModeActive ? 'visible' : 'hidden'}}>
            <Grid item xs={12}>
                <Paper className={classes.paper} elevation={0} >
                    <TextField label="Title" fullWidth />
                    <TextField label="Description" rows={5} fullWidth multiline />
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper className={classes.paper} style={{textAlign: 'left'}} elevation={0}>
                    <AssigneeSelector possibleAssignees={props.possibleAssignees} assignedTo={assignmentId} onSelectorChange={handleAssignmentChange} />
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper className={classes.paper} style={{textAlign: 'left'}} elevation={0}>
                    <StatusSelector statusFilters={props.statusFilters} activeFilterStatus={statusId} onSelectorChange={handleStatusChange} />
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className={classes.paper} style={{textAlign: 'left'}} elevation={0}>
                    <TextField value={commentText} onChange={handleCommentChange} label="Comments" rows={5} fullWidth multiline />
                    <Button onClick={handleAddComment}>Add Comment</Button>
                    {
                        R.map(c => (
                            <Box>
                                <Typography>{c.addedOn.toISOString()}</Typography>
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

function App (props){
    const classes = useStyles();

    
    
    const [editBugId, setEditBugId] = useState(''); // should be null?
    



    // note that id is a url here and it's an integer in the index resource
    // DEMO:  change the int to a URL without breaking the client

    // TODO: change created by user to reflect the object definition rather than literal
    const fakeBug = {
        id: 'http://localhost:8080/bug/e04de755-7b1e-43d5-8857-bcf5faea9dba.json',
        title: 'first bug',
        description: 'lorem ipsum',
        createdBy: {
            id: 'http://localhost:8080/user/debf8087-b65f-4135-83d3-2803bd0f8848.json',
            fullName: 'Howard Dierking'
        },
        createdOn: '2014-01-01T23:28:56.782Z',
        modifiedOn: '2014-01-01T23:28:56.782Z',
        status: {
            id: 'open'
        },
        comments: [
            {
                addedOn: '2014-01-01T23:28:56.782Z',
                commentText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
            }
        ]
    }

    

    return (
        <Container>
            <AppBar>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <FontAwesomeIcon icon={faBug} />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        RestBugs
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <BugsListView statusFilters={props.apiIndex.statusFilters} bugsList={props.apiIndex.bugsList} />
            
            <BugsEditView statusFilters={props.apiIndex.statusFilters} possibleAssignees={props.apiIndex.possibleAssignees} />


        </Container>
    );
}


// load the index resource
fetch(indexResourceId, { method: 'GET' })
        .then(res => res.json())
        .then(rep => {
            ReactDOM.render(
                <App apiIndex={rep}/>,
                document.getElementById('app'));
        })
        .catch(err => console.log(err));
