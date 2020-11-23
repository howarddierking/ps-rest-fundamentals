import BugsListView from './BugsListView';
import BugsEditView from './BugsEditView';
import React, { useState } from 'react';
import Box from '@material-ui/core/Box';

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
                addBugControl={props.apiIndex.addBug} 
                statusFilters={props.apiIndex.statusFilters} 
                possibleAssignees={props.apiIndex.possibleAssignees} />
        </Box>
    )
}
