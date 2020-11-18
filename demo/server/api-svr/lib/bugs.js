const R = require('ramda');

const getBugsPage = exports.getBugsPage = R.curry((connection, pageSize, pageNumber) => {
    const pageQuery = `select b.bugGuid, 
        b.title, 
        u.fullName createdBy, 
        b.createdOn, 
        b.modifiedOn 
    from bugs as b 
    inner join users as u 
        on b.createdBy=u.userGuid
    limit ${pageSize + 1}
    offset ${pageNumber * pageSize}`;

    return new Promise((resolve, reject) => {
        connection.query(pageQuery, (err, results, fields) => {
            if(err){
                reject(err);
            } else {
                const ret = {
                    moreItems: results.length > pageSize,
                    items: R.take(pageSize, results),
                    fields: fields
                }
                resolve(ret);
            }
        });
    });
});
