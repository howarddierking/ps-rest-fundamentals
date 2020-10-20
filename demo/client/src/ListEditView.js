import BugsListView from './BugsListView';
import BugsEditView from './BugsEditView';
import React, { useState, useEffect, useRef } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

export default function ListEditView(props){
    const [editModeActive, setEditModeActive] = useState(false);    // TODO: should this really use state?
    const [selectedBug, setSelectedBug] = useState('');
    const [selectedBugId, setSelectedBugId] = useState('');
    const isInitialRender = useRef(true);

    useEffect(() => {
        if(isInitialRender.current){
            isInitialRender.current = false;
            return;
        }

        fetch(selectedBugId, { method: 'GET' })
            .then(res => res.json())
            .then(rep => {
                setSelectedBug(rep);
            })
            .catch(err => console.log(err));
    }, [selectedBugId]);


    function handleBugSelected(e){
        if(e.selectedBugId){
            setSelectedBugId(e.selectedBugId);
        }
    }

    function handleAddSave(e){
        // if(editModeActive) {
        //     // save
        //     setEditModeActive(false)
        // } else {
        //     // edit
        //     setEditModeActive(true);
        // }
    }

    return (
        <Box>
            <BugsListView 
                statusFilters={props.apiIndex.statusFilters} 
                bugsList={props.apiIndex.bugsList} 
                onBugSelected={handleBugSelected} />

            <Button variant="contained" color="primary">Add New Bug</Button>

            <BugsEditView 
                selectedBug={selectedBug} 
                statusFilters={props.apiIndex.statusFilters} 
                possibleAssignees={props.apiIndex.possibleAssignees} />
        </Box>
    )
}
