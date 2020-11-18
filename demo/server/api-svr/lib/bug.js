const R = require('ramda');

const getBug = exports.getBug = (connection, bugGuid) => {

/*
    select b.bugGuid,
        b.title,
        b.description,
        b.createdBy createdById,
        ucb.fullName createdByName,
        b.createdOn,
        b.modifiedOn,
        b.assignedTo assignedToId,
        uat.fullName assignedToName,
        b.status
    from bugs as b
    inner join users as ucb
        on b.createdBy=ucb.userGuid
    inner join users as uat
        on b.assignedTo=uat.userGuid
    where b.bugGuid="273f40d1-f694-4581-81a0-5823fbe5e9b3"
*/

    const pageQuery = `select b.bugGuid,
        b.title,
        b.description,
        b.createdBy createdById,
        ucb.fullName createdByName,
        b.createdOn,
        b.modifiedOn,
        b.assignedTo assignedToId,
        uat.fullName assignedToName,
        b.status
    from bugs as b
    inner join users as ucb
        on b.createdBy=ucb.userGuid
    inner join users as uat
        on b.assignedTo=uat.userGuid
    where b.bugGuid="${bugGuid}"`;

    return new Promise((resolve, reject) => {
        connection.query(pageQuery, (err, results, fields) => {
            if(err){
                reject(err);
            } else {
                const ret = {
                    bug: results[0],
                    comments: []    // TODO    
                }

                resolve(ret);
            }
        });
    });
};
