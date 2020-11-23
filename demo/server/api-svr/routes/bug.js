const R = require('ramda');
const bugLib = require('../lib/bug');

exports.getBug = R.curry((linkBuilder, dbConnection, req, res, next) => {
    const bugGuid = req.params.bugid;
    
    bugLib.getBug(dbConnection, bugGuid)
    .then(results => {
        const b = results.bug;

        let ret = {
            id: linkBuilder.addSegment('bug').addSegment(b.bugGuid).toString(),  
            wasDerivedFrom: linkBuilder.addSegment('bug').addSegment(b.wasDerivedFrom).toString(),      
            title: b.title,
            description: b.description,
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
            comments: results.comments,
            updateBug: {
                id: linkBuilder.addSegment('bug').addSegment(b.bugGuid).toString(),
                method: 'PUT',
                shape: {
                    id: linkBuilder.addSegment('schema').addSegment('saveBug.json').toString()
                }
            }
        };

        res.json(ret);
    });
});

exports.putBug = R.curry((linkBuilder, dbConnection, req, res, next) => {
    console.info(req.body);

    bugLib.saveBug(dbConnection, req.body)
    .then(() => {
        res.status(200).send();
    })
    .catch(e => {
        console.error(e);
        res.status(500).send(e.toString());
    });
});
