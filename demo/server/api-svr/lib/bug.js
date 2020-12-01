const R = require('ramda');
const { v4: uuidv4 } = require('uuid');
const dbutils = require('./db');
const links = require('./links');

getDbRep = exports.getDbRep = representation => {
    let ret = {
        title: representation.title,
        description: representation.description,
        createdBy: links.lastSegment(representation.createdBy.id),
        createdOn: dbutils.getMySqlDateFormat(representation.createdOn),
        modifiedOn: dbutils.getMySqlDateFormat(representation.modifiedOn),
        status: links.lastSegment(representation.status.id),
        assignedTo: links.lastSegment(representation.assignedTo.id)
    };

    if(representation.id){
        ret = R.assoc('id', links.lastSegment(representation.id), ret);
    }

    return ret;
}

const getBug = exports.getBug = R.curry((connection, bugGuid) => {
    const bugQuery = `select b.bugGuid,
        b.wasDerivedFrom,
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
    where b.bugGuid=?`;

    return new Promise((resolve, reject) => {
        connection.query(bugQuery, [bugGuid], (err, results, fields) => {
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
});

const createBug = (connection, representation) => {
    return new Promise((resolve, reject) => {
        connection.query(`insert into bugs (
            bugGuid,
            title,
            description,
            createdBy,
            createdOn,
            modifiedOn,
            status,
            assignedTo) 
        values (?, ?, ?, ?, ?, ?, ?, ?)`, [
            uuidv4(),
            representation.title,
            representation.description,
            representation.createdBy,
            representation.createdOn,
            representation.modifiedOn,
            representation.status,
            representation.assignedTo],
        (err, results, fields) => {
            if(err){
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

// const updateBug = (connection, representation) => {
//     console.info(representation);
//     return new Promise((resolve, reject) => {
//         connection.query(`update bugs 
//         set 
//             title=?,
//             description=?,
//             createdBy=?,
//             createdOn=?,
//             modifiedOn=?,
//             status=?,
//             assignedTo=?
//         where bugGuid=?`, [
//             representation.title,
//             representation.description,
//             representation.createdBy,
//             representation.createdOn,
//             representation.modifiedOn,
//             representation.status,
//             representation.assignedTo,
//             representation.id
//         ],
//         (err, results, fields) => {
//             if(err){
//                 reject(err);
//             } else {
//                 resolve();
//             }
//         });
//     });
// };

const incrementBug = (connection, representation) => {
    return new Promise((resolve, reject) => {
        connection.query(`insert into bugs (
            bugGuid,
            wasDerivedFrom,
            title,
            description,
            createdBy,
            createdOn,
            modifiedOn,
            status,
            assignedTo) 
        values (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
            uuidv4(),
            representation.id,
            representation.title,
            representation.description,
            representation.createdBy,
            representation.createdOn,
            representation.modifiedOn,
            representation.status,
            representation.assignedTo],
        (err, results, fields) => {
            if(err){
                reject(err);
            } else {
                resolve();
            }
        });
    });
};


const saveBug = exports.saveBug = R.curry(async (connection, representation) => {
    // create the entity for persistence
    // TODO: add comments
    const entity = getDbRep(representation);

    if(entity.id){
        // return await updateBug(connection, entity);
        return await incrementBug(connection, entity);
    } else {
        return await createBug(connection, entity);
    }
});
