import TopBar from './TopBar'
import ListEditView from './ListEditView'
import React from 'react';
import Container from '@material-ui/core/Container';

export default function App (props){
    return (
        <Container>
            <TopBar />
            <ListEditView apiIndex={props.apiIndex} />
        </Container>
    );
}
