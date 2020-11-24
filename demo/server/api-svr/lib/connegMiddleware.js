const R = require('ramda');
const links = require('./links');
const repBuilders = require('./representationBuilders');


const contentTypeInfo = {
    json: {
        contentType: 'application/json',
        extension: '.json',
        representationBuilder: repBuilders.jsonRepresentationBuilder
    },
    jsonld: {
        contentType: 'application/ld+json',
        extension: '.jsonld',
        representationBuilder: repBuilders.jsonldRepresentationBuilder
    }
};


const defaultContentType = contentTypeInfo.json;


const contentTypeExtensions = exports.contentTypeExtensions = (req, res, next) => {
    // if the URL has a file extension
    if(/\.\w+$/.test(req.path)){
        // strip off file extension before matching routes
        const extension = req.path.slice(req.path.lastIndexOf('.'));
        let normalizedPath = req.path.slice(0, req.path.lastIndexOf('.'));
        if(normalizedPath.endsWith('index')){
            normalizedPath = normalizedPath.slice(0, normalizedPath.lastIndexOf('index'));
        }
        const topLevelParts = req.url.split('?');

        req.url = topLevelParts.length > 1 
            ? [normalizedPath, topLevelParts[1]].join('?')
            : normalizedPath;

        // set accept header based on file extension (or default to json)
        const ctInfo = R.find(R.propEq('extension', extension))(R.values(contentTypeInfo));
        req.headers.accept = ctInfo.contentType || defaultContentType.contentType;
    }

    next();
};


const negotiate = exports.negotiate = (req, res, next) => {
    const host = process.env['API_SVR_HOST'];
    const acceptHeader = req.get('Accept');
    const supportedContentTypes = R.values(contentTypeInfo);
    
    const selectedContentTypeInfo = R.find(
        R.propEq('contentType', acceptHeader),
        supportedContentTypes) || defaultContentType;

    res.representationBuilder = selectedContentTypeInfo.representationBuilder;
    res.linkBuilder = links.builder(process.env['API_SVR_HOST'], selectedContentTypeInfo.extension);

    // add link header to enable agent-driven content negotiation

    // create links for canonical and about relationships
    res.links({
        canonical: res.linkBuilder.addSegment(req.url).toString(),
        about: res.linkBuilder.addSegment(req.url).overrideExtension('')
    });

    // create alternate links for all other supported content types
    const notSelectedType = R.complement(R.propEq('contentType', acceptHeader));
    const otherSupportedContentTypes = R.filter(notSelectedType, supportedContentTypes);
    R.forEach(i => {
        res.links({
            alternate: res.linkBuilder.addSegment(req.url).overrideExtension(i.extension)
        })
    }, otherSupportedContentTypes);

    next();
};
