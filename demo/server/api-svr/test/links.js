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
            })
        })
    })
})
