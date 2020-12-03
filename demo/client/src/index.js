import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'

const indexResourceId = 'https://api.restbugs.com';

// load the index resource
fetch(indexResourceId, { method: 'GET' })
        .then(res => res.json())
        .then(rep => {
            ReactDOM.render(
                <App apiIndex={rep}/>,
                document.getElementById('app'));
        })
        .catch(err => console.log(err));
