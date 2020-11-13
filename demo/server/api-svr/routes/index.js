const express = require('express');
const router = express.Router();
const R = require('ramda');

const writeId = R.curry((host, relative) => {
    const u = new URL(relative, host);
    return u.toString();
});

const writeIdFromRelative = writeId(process.env.HOST);

const resource = {
    id: writeIdFromRelative('/index.json'),
    bugsList: {
        id: writeIdFromRelative('/bugs/all/1.json'),
        nextPage: writeIdFromRelative('/bugs/all/2.json'),
        activeFilterStatus: writeIdFromRelative('/statusFilters/all'),
        items: [
            {
                id: writeIdFromRelative('/bug/e04de755-7b1e-43d5-8857-bcf5faea9dba.json'),
                title: 'first bug',
                createdBy: 'Howard Dierking',
                createdOn: '2014-01-01T23:28:56.782Z',
                modifiedOn: '2014-01-01T23:28:56.782Z'
            },
            {
                id: writeIdFromRelative('/bug/af7a25df-d47d-49ea-98c8-8866c4b7b4e7.json'),
                title: 'second bug',
                createdBy: 'John Smith',
                createdOn: '2014-01-01T23:28:56.782Z',
                modifiedOn: '2014-01-01T23:28:56.782Z'
            },
            {
                id: writeIdFromRelative('/bug/5f9c7840-0424-4187-9d56-1e6daa2455a7.json'),
                title: 'third bug',
                createdBy: 'Jane Doe',
                createdOn: '2014-01-01T23:28:56.782Z',
                modifiedOn: '2014-01-01T23:28:56.782Z'
            }
        ]
    },
    statusFilters: [
        { 
            id: writeIdFromRelative('/statusFilters/all'),
            href: writeIdFromRelative('/bugs/all/1.json'),
            title: 'All' 
        },
        { 
            id: writeIdFromRelative('/statusFilters/open'), 
            href: writeIdFromRelative('/bugs/open/1.json'), 
            title: 'Open' 
        },
        { 
            id: writeIdFromRelative('/statusFilters/closed'),
            href: writeIdFromRelative('/bugs/closed/1.json'),
            title: 'Closed' 
        }
    ],
    possibleAssignees: [
        {
            id: writeIdFromRelative('/user/debf8087-b65f-4135-83d3-2803bd0f8848.json'),
            fullName: 'Howard Dierking'
        },
        {
            id: writeIdFromRelative('/user/cb8f8a5c-de32-43b5-a022-b3f65e313393.json'),
            fullName: 'John Smith'
        },
        {
            id: writeIdFromRelative('/user/8e2438ee-2284-49e6-8d87-1d7943cb5d39.json'),
            fullName: 'Jane Doe'
        }
    ]
};


/* GET home page. */
router.get('/', function(req, res, next) {
    debugger
  res.json(resource);
});

module.exports = router;
