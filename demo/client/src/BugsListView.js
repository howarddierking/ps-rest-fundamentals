import * as R from 'ramda';
import StatusSelector from './StatusSelector';
import BugsTable from './BugsTable';
import BugsTablePager from './BugsTablePager';
import React, { useState, useEffect, useRef } from 'react';
import Box from '@material-ui/core/Box';

export default function BugsListView(props){
    // initial load comes from props
    const [isLoading, setIsLoading] = useState(false);  
    const [statusFilters, setStatusFilters] = useState(props.statusFilters);
    
    const [pageId, setPageId] = useState(props.bugsList.id);
    const [bugsList, setBugsList] = useState(props.bugsList);
    const isInitialRender = useRef(true);

    useEffect(() => {
        if(isInitialRender.current){
            isInitialRender.current = false;
            return;
        }

        fetch(pageId, { method: 'GET' })
            .then(res => res.json())
            .then(rep => {
                setBugsList(rep);
                setIsLoading(false);
            })
            .catch(err => console.log(err));
    }, [pageId]);

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
                <StatusSelector 
                    onSelectorChange={handleFilterChange} 
                    activeFilterStatus={bugsList.activeFilterStatus} 
                    statusFilters={statusFilters}/>

                <BugsTable 
                    bugs={bugsList.items} 
                    onBugSelected={props.onBugSelected} />
                    
                <BugsTablePager 
                    onPage={handlePage} 
                    prev={bugsList.prevPage} 
                    next={bugsList.nextPage} />
            </Box>
        )
    }
}
