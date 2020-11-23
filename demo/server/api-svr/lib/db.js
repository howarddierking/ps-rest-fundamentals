const R = require('ramda');
const links = require('./links');

getMySqlDateFormat = exports.getMySqlDateFormat = isoDate => {
    const d = isoDate.split('T')[0];
    const t = isoDate.split('T')[1].split('.')[0]
    return R.join(' ', [d, t]);
}

getDbRep = exports.getDbRep = representation => {
    let ret = {
        title: representation.title,
        description: representation.description,
        createdBy: links.lastSegment(representation.createdBy.id),
        createdOn: getMySqlDateFormat(representation.createdOn),
        modifiedOn: getMySqlDateFormat(representation.modifiedOn),
        status: links.lastSegment(representation.status.id),
        assignedTo: links.lastSegment(representation.assignedTo.id)
    };

    if(representation.id){
        ret = R.assoc('id', links.lastSegment(representation.id), ret);
    }

    return ret;
}
