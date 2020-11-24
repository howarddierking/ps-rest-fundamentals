const R = require('ramda');

const jsonldRepresentationBuilder = exports.jsonldRepresentationBuilder = rep => {
    // because I'm lazy...
    const s = JSON.stringify(rep);
    const rs = s.replace(/"id"/gi, '"@id"');
    const r = JSON.parse(rs);

    // add a context at the top
    context = {
        '@context': {
            '@vocab': 'http://schema.restbugs.com/'
        }
    }

    return R.mergeLeft(r, context);
};

const jsonRepresentationBuilder = exports.jsonRepresentationBuilder = R.identity;
