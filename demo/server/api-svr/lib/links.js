const R = require('ramda');

const lastSegment = exports.lastSegment = id => {
    const t = R.pipe(R.split('/'), R.last)(id);  
    if(t.indexOf('.') > 0){
        return t.slice(0, t.indexOf('.'));
    }
    return t;
};

// writer: String -> [String] -> String
const writer = exports.writer = R.curry((host, segments) => {
    // if there's just one argment, assume it's a FQ URL 
    if(arguments.length === 1)
        return host;

    const path = R.join('/')(segments);
    const u = new URL(path, host);
    return u.toString();
});

const bindMethods = (builder) => {
    builder.addSegment = addSegment(builder);
    builder.addQuery = addQuery(builder);
    builder.overrideExtension = overrideExtension(builder);
    builder.toString = toString(builder);
};

const toString = (builder) => {
    return () => {
        let path = R.join('/', builder.segments);
        if(builder.extension){
            if(path === '' || path === '/'){
                path = 'index';
            }
            path = R.concat(path, builder.extension);
        }
        
        const u = new URL(path, builder.base);
        u.search = R.pipe(R.map(R.join('=')), R.join('&'))(builder.query);
        return u.toString();
    }
};

const addSegment = R.curry((builder, segment) => {
    const s = R.append(segment, builder.segments);
    const b = R.pick(['base', 'extension', 'query'], builder);
    const ret = R.assoc('segments', s, b);

    bindMethods(ret);

    return ret;
});

const addQuery = R.curry((builder, pair) => {
    const q = R.append(pair, builder.query);
    const b = R.pick(['base', 'extension', 'segments'], builder);
    const ret = R.assoc('query', q, b);

    bindMethods(ret);

    return ret;
});

const overrideExtension = R.curry((builder, extension) => {
    const b = R.pick(['base', 'query', 'segments'], builder);
    const ret = R.assoc('extension', extension, b);

    bindMethods(ret);

    return ret;
});

const builder = exports.builder = (base, extension) => {
    const ret = {
        base,
        extension,
        segments: [],
        query: []
    };

    bindMethods(ret);

    return ret;
}
