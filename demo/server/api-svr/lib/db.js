const R = require('ramda');
const links = require('./links');

getMySqlDateFormat = exports.getMySqlDateFormat = isoDate => {
    const d = isoDate.split('T')[0];
    const t = isoDate.split('T')[1].split('.')[0]
    return R.join(' ', [d, t]);
}
