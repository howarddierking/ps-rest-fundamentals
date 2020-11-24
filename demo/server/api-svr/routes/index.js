const R = require('ramda');
const bugsLib = require('../lib/bugs');
const usersLib = require('../lib/users');

/* GET home resource */
exports.getRoot = R.curry((dbConnection, req, res, next) => {
    const pageNumber = 0;
    const pageSize = 3;
    const lb = res.linkBuilder;

    bugsLib.getBugsPage(dbConnection, pageSize, pageNumber)
    .then(results => {
        // add bugs first page
        let bugsList = {
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
            bugsList = R.assoc('prevPage', lb.addSegment('bugs').addSegment(pageNumber - 1).toString(), bugsList);
        }
        if(results.moreItems){
            bugsList = R.assoc('nextPage', lb.addSegment('bugs').addSegment(pageNumber + 1).toString(), bugsList);   
        }

        // add possible filters
        const statusFilters = [
            { 
                id: "http://localhost:8080/statusFilters/all",
                href: "http://localhost:8080/bugs/all/1.json",
                title: "All" 
            },
            { 
                id: "http://localhost:8080/statusFilters/open", 
                href: "http://localhost:8080/bugs/open/1.json", 
                title: "Open" 
            },
            { 
                id: "http://localhost:8080/statusFilters/closed",
                href: "http://localhost:8080/bugs/closed/1.json",
                title: "Closed" 
            }
        ];

        // add possible assignees
        usersLib.getAllUsers(dbConnection)
        .then(userResults => {
            const possibleAssignees = R.map(u => {
                return {
                    id: lb.addSegment('user').addSegment(u.userGuid).toString(),
                    fullName: u.fullName
                }
            }, userResults.items);

            // combine results and return
            const ret = {
                id: lb.addSegment('/').toString(),
                bugsList,
                statusFilters,
                possibleAssignees,
                addBug: {
                  id: lb.addSegment('bugs').toString(),
                  method: 'POST',
                  shape: {
                    id: lb.addSegment('schema').addSegment('saveBug.json').toString()
                  }
                } 
            };

            res.json(res.representationBuilder(ret));
        });
    });
});
