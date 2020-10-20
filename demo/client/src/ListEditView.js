import BugsListView from './BugsListView';
import BugsEditView from './BugsEditView';
import React, { useState, useEffect, useRef } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

export default function ListEditView(props){
    const [selectedBugId, setSelectedBugId] = useState('');

    function handleBugSelected(e){
        setSelectedBugId(e.selectedBugId);
    }

    return (
        <Box>
            <BugsListView 
                statusFilters={props.apiIndex.statusFilters} 
                bugsList={props.apiIndex.bugsList} 
                onBugSelected={handleBugSelected} />

            <BugsEditView 
                selectedBugId={selectedBugId}
                statusFilters={props.apiIndex.statusFilters} 
                possibleAssignees={props.apiIndex.possibleAssignees} />
        </Box>
    )
}
