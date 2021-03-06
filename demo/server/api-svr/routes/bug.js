const R = require('ramda');

exports.getBug = R.curry((getBug, req, res, next) => {
    const bugGuid = req.params.bugid;
    const lb = res.linkBuilder;
    
    getBug(bugGuid)
    .then(results => {
        const b = results.bug;

        let ret = {
            id: lb.addSegment('bug').addSegment(b.bugGuid).toString(),  
            title: b.title,
            description: b.description,
            createdBy: {
                id: lb.addSegment('user').addSegment(b.createdById).toString(),
                fullName: b.createdByName
            },
            createdOn: b.createdOn,
            modifiedOn: b.modifiedOn,
            assignedTo: {
                id: lb.addSegment('user').addSegment(b.assignedToId).toString(),
                fullName: b.assignedToName
            },
            status: {
                id: lb.addSegment('statusFilters').addSegment(b.status).toString()
            },
            comments: results.comments,
            updateBug: {
                id: lb.addSegment('bug').addSegment(b.bugGuid).toString(),
                method: 'PUT',
                shape: {
                    id: lb.addSegment('schema')
                        .addSegment('saveBug.json')
                        .overrideExtension('')
                        .toString()   // note that this may be relevant only to a content type
                }
            }
        };

        if(b.wasDerivedFrom){
            wasDerivedFrom = {
                id: lb.addSegment('bug').addSegment(b.wasDerivedFrom).toString()
            };

            ret = R.assoc('wasDerivedFrom', wasDerivedFrom, ret);
        }

        res.json(res.representationBuilder(ret));
    });
});

exports.putBug = R.curry((saveBug, req, res, next) => {
    console.info(req.body);

    saveBug(req.body)
    .then(() => {
        res.status(200).send();
    })
    .catch(e => {
        console.error(e);
        res.status(500).send(e.toString());
    });
});
