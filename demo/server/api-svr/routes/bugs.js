const R = require('ramda');

exports.getPage = R.curry((getBugsPage, req, res, next) => {
    const pageNumber = parseInt(req.params.pagekey);
    const pageSize = 3;
    const lb = res.linkBuilder;
    
    getBugsPage(pageSize, pageNumber)
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

exports.postBug = R.curry((saveBug, req, res, next) => {
    saveBug(req.body)
    .then(() => {
        res.status(200).send();
    })
    .catch(e => {
        console.error(e);
        res.status(500).send(e.toString());
    });
});
