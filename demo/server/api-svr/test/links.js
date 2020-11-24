require('chai').should();
const links = require('../lib/links');

describe('lib', () => {
    describe('links', () => {
        describe('builder', () => {
            it('should chain together for segments', () => {
                links.builder('http://localhost:8080')
                    .addSegment('foo')
                    .toString()
                    .should.eq('http://localhost:8080/foo');
            });

            it('should chain together for segments and query', () => {
                links.builder('http://localhost:8080')
                    .addSegment('foo')
                    .addQuery(['q', 'bar'])
                    .toString()
                    .should.eq('http://localhost:8080/foo?q=bar');
            });

            it('should chain together for multiple segments and queries', () => {
               links.builder('http://localhost:8080')
                    .addSegment('foo')
                    .addQuery(['q', 'bar'])
                    .addSegment('bar')
                    .addQuery(['x', 'baz'])
                    .toString()
                    .should.eq('http://localhost:8080/foo/bar?q=bar&x=baz'); 
            });

            it('should support URL extension mappings', () => {
                links.builder('http://localhost:8080', '.json')
                    .addSegment('foo')
                    .addQuery(['q', 'bar'])
                    .addSegment('bar')
                    .addQuery(['x', 'baz'])
                    .toString()
                    .should.eq('http://localhost:8080/foo/bar.json?q=bar&x=baz'); 
            });

            it('should add index token when there\'s an extension', () => {
                links.builder('http://localhost:8080', '.json')
                    .addSegment('/')
                    .toString()
                    .should.eq('http://localhost:8080/index.json');
            });

            it('should enable overriding the default extension', () => {
                links.builder('http://localhost:8080', '.json')
                    .addSegment('/')
                    .overrideExtension('.jsonld')
                    .toString()
                    .should.eq('http://localhost:8080/index.jsonld');
            })
        })
    })
})
