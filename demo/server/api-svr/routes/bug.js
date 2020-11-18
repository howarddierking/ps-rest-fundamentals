const R = require('ramda');
const bugLib = require('../lib/bug');

exports.getPage = R.curry((linkBuilder, dbConnection, req, res, next) => {
    const bugGuid = req.params.bugid;
    
    bugLib.getBug(dbConnection, bugGuid)
    .then(results => {
        debugger;
        const b = results.bug;

        let ret = {
            id: linkBuilder.addSegment('bug').addSegment(b.bugGuid).toString(),        
            title: b.title,
            createdBy: {
                id: linkBuilder.addSegment('user').addSegment(b.createdById).toString(),
                fullName: b.createdByName
            },
            createdOn: b.createdOn,
            modifiedOn: b.modifiedOn,
            assignedTo: {
                id: linkBuilder.addSegment('user').addSegment(b.assignedToId).toString(),
                fullName: b.assignedToName
            },
            status: {
                id: linkBuilder.addSegment('statusFilters').addSegment(b.status).toString()
            },
            comments: results.comments

        };

        res.json(ret);
    });
});
