import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

// const indexResourceId = 'https://api.restbugs.com';
const indexResourceId = 'http://localhost:8080';

// load the index resource
fetch(indexResourceId, { method: 'GET' })
        .then(res => res.json())
        .then(rep => {
            ReactDOM.render(
                <Auth0Provider
                    domain="project-phoenix.auth0.com"
                    clientId="DI3vofbUx1xhkG5GQuYqziwEzIrCCC56"
                    redirectUri={window.location.origin} 
                    audience="https://project-phoenix.auth0.com/api/v2/"
                    scope="read:current_user update:current_user_metadata">
                    
                    <App apiIndex={rep}/>
                    
                </Auth0Provider>,
                document.getElementById('app'));
        })
        .catch(err => console.log(err));
