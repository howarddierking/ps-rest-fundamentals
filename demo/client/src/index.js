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
    }
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

function BugsFilters(props){
    const classes = useStyles();
    
    function handleStatusChange(e){
        props.onFilterChange({status: e.target.value});
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
                <BugsFilters onFilterChange={handleFilterChange} activeFilterStatus={bugsList.activeFilterStatus} statusFilters={statusFilters}/>
                <BugsTable bugs={bugsList.items} />
                <BugsTablePager onPage={handlePage} prev={bugsList.prevPage} next={bugsList.nextPage} />
            </Box>
        )
    }
}

function App (props){
    const classes = useStyles();
//TODO: put status filters in state at the app level, since they'll be used in the edit dialog as well
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
