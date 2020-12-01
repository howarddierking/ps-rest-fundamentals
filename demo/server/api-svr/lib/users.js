const R = require('ramda');

const getAllUsers = exports.getAllUsers = connection => {
    return () => {
        const userQuery = `select u.userGuid, 
            u.fullName 
        from users as u`;
    
        return new Promise((resolve, reject) => {
            connection.query(userQuery, (err, results, fields) => {
                if(err){
                    reject(err);
                } else {
                    const ret = {
                        items: results,
                        fields: fields
                    }
                    resolve(ret);
                }
            });
        });
    }
};
