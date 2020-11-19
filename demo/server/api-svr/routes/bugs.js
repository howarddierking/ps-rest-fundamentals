const R = require('ramda');
const bugsLib = require('../lib/bugs');

exports.getPage = R.curry((linkBuilder, dbConnection, req, res, next) => {
    const pageNumber = parseInt(req.params.pagekey);
    const pageSize = 3;
    
    bugsLib.getBugsPage(dbConnection, pageSize, pageNumber)
    .then(results => {
        let ret = {
            id: linkBuilder.addSegment('bugs').addSegment(pageNumber).toString(),
            activeFilterStatus: "http://localhost:8080/statusFilters/all",
            items: R.map(r => {
                return {
                    id: linkBuilder.addSegment('bug').addSegment(r.bugGuid).toString(),
                    title: r.title,
                    createdBy: r.createdBy,
                    createdOn: r.createdOn,
                    modifiedOn: r.modifiedOn
                }
            }, results.items)
        };

        if(pageNumber > 0){
            ret = R.assoc('prevPage', linkBuilder.addSegment('bugs').addSegment(pageNumber - 1).toString(), ret);
        }
        if(results.moreItems){
            ret = R.assoc('nextPage', linkBuilder.addSegment('bugs').addSegment(pageNumber + 1).toString(), ret);   
        }

        res.json(ret);
    });
});

exports.postBug = R.curry((dbConnection, req, res, next) => {
    debugger
    console.info(req.body);

    res.status(200).send();
});
