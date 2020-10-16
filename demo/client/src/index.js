import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBug } from '@fortawesome/free-solid-svg-icons'

const indexResourceId = 'http://localhost:8080/index.json';

function BugsTableRow(props){
    return (
        <tr>
            <th scope="row">{props.bug.title}</th>
            <td>{props.bug.createdBy}</td>
            <td>{props.bug.createdOn}</td>
            <td>{props.bug.modifiedOn}</td>
        </tr>
    );
}

function BugsTable(props){
    const rows = props.bugs.map(bug => <BugsTableRow key={bug.id} bug={bug} />);

    return (
        <table className="table table-hover table-sm">
            <thead className="thead-light">
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Created By</th>
                    <th scope="col">Created On</th>
                    <th scope="col">Modified On</th>
                </tr>
            </thead>
            <tbody>
                { rows }
            </tbody>
        </table>
    )
}

function ListView(props){
    const [isLoading, setIsLoading] = useState(true);
    const [representation, setRepresentation] = useState({});

    const requestParams = {
        method: 'GET'   // build this out when adding conneg
    }; 

    useEffect(() => {
        fetch(indexResourceId, requestParams)
        .then(res => res.json())
        .then(rep => {
            setRepresentation(rep);
            setIsLoading(false);
        })
        .catch(err => console.log(err));
    }, [indexResourceId]);  // this last param is REALLY important to keep out of an infinite loop of re-fetching

    if(isLoading){
        return <div>Loading...</div>
    } else {
        return (
            <div>
                <div className="row">
                    <div className="col">table actions will go here</div>
                </div>
                
                <div className="row">
                    <BugsTable bugs={ representation.bugs } />
                </div>
            </div>
        )    
    }
}

function EditView(props){
    return (
        <div className="row">
            <div className="col">item edit will go here</div>
        </div>
    )
}

const layout = (
    <div>
        <nav className="navbar fixed-top navbar-light bg-light">
            <a className="navbar-brand">
                <FontAwesomeIcon icon={faBug} /> RestBugs
            </a>
        </nav>
        <div className="container-fluid">
            <ListView />
            <EditView />
        </div>
    </div>
);

ReactDOM.render(
    layout,
    document.getElementById('app'));
