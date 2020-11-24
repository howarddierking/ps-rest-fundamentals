const R = require('ramda');
const bugsLib = require('../lib/bugs');
const bugLib = require('../lib/bug');

exports.getPage = R.curry((dbConnection, req, res, next) => {
    const pageNumber = parseInt(req.params.pagekey);
    const pageSize = 3;
    const lb = res.linkBuilder;
    
    bugsLib.getBugsPage(dbConnection, pageSize, pageNumber)
    .then(results => {
        let ret = {
            id: lb.addSegment('bugs').addSegment(pageNumber).toString(),
            activeFilterStatus: "http://localhost:8080/statusFilters/all",
            items: R.map(r => {
                return {
                    id: lb.addSegment('bug').addSegment(r.bugGuid).toString(),
                    title: r.title,
                    createdBy: r.createdBy,
                    createdOn: r.createdOn,
                    modifiedOn: r.modifiedOn
                }
            }, results.items)
        };

        if(pageNumber > 0){
            ret = R.assoc('prevPage', lb.addSegment('bugs').addSegment(pageNumber - 1).toString(), ret);
        }
        if(results.moreItems){
            ret = R.assoc('nextPage', lb.addSegment('bugs').addSegment(pageNumber + 1).toString(), ret);   
        }

        res.json(res.representationBuilder(ret));
    });
});

exports.postBug = R.curry((dbConnection, req, res, next) => {
    bugLib.saveBug(dbConnection, req.body)
    .then(() => {
        res.status(200).send();
    })
    .catch(e => {
        console.error(e);
        res.status(500).send(e.toString());
    });
});
