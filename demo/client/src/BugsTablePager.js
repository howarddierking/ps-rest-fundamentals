import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import IconButton from '@material-ui/core/IconButton';

export default function BugsTablePager(props){
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
