const R = require('ramda');

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
    builder.toString = toString(builder);
};

const toString = (builder) => {
    return () => {
        const u = new URL(R.join('/', builder.segments), builder.base);
        u.search = R.pipe(R.map(R.join('=')), R.join('&'))(builder.query);
        return u.toString();
    }
};

const addSegment = R.curry((builder, segment) => {
    const s = R.append(segment, builder.segments);
    const b = R.pick(['base', 'query'], builder);
    const ret = R.assoc('segments', s, b);

    bindMethods(ret);

    return ret;
});

const addQuery = R.curry((builder, pair) => {
    const q = R.append(pair, builder.query);
    const b = R.pick(['base', 'segments'], builder);
    const ret = R.assoc('query', q, b);

    bindMethods(ret);

    return ret;
});

const builder = exports.builder = (base) => {
    const ret = {
        base,
        segments: [],
        query: []
    };

    bindMethods(ret);

    return ret;
}
