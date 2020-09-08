# ps-rest-fundamentals
Assets for my Pluralsight course, REST Fundamentals (2020 revision)

## General
The original course launched in the spring of 2012 and even today is useful in helping folks understand the theory behind the REST architectural style. A few things that I want to improve in this refresh include the following.

* do a better job bridging the theoretical to the practical by adding a reference implementation to each major conceptual topic
* drive home the point that REST describes a complete system architecture and not just the server
* address some of the [typically practical] questions that have come up since I first recorded the course
* include commentary on my own experience in the last 8 years as an implementer of these ideas
* introduce some of the principles of linked data as a natural progression of REST

## Builders Pivot
1. Introduction
1. A REST Primer (theory)
1. Getting to Working - Introducing RESTbugs
1. Beyond GET - Mutations
1. Optimizing for the Cloud
1. A Broader Look // Beyond REST

## Architectural Pivot
1. Introduction
    1. some history
    1. goals and stuff
    1. introducing approach for practicum
1. REST primer
    1. other architectures considered
    1. constraints, and challenges addressed by each
    1. elements of REST
1. Design for Robustness
    1. client-server constraint enables client to evolve without breaking server
    1. uniform interface enables server to evolve without breaking client
1. Design for scale
    1. client-server constraint enables growth in number and diversity of clients
    1. layered system manages complexity in spite of system growth
1. A changing architectural landscape
    1. architectural innovations (e.g. EDA)
    1. impact of cloud computing

## Fielding+Topical Pivot 
1. Introduction
1. Client-Server
1. Stateless
    1. Security
1. Cache
    1. Versioning (tentative: the thinking here is that applying versioning in more novel ways than the resource ID will have an inversely proportional relationship to the cacheability of resources)
1. Uniform Interface
    1. Resources
        1. Resource Design
    1. Representations
        1. Which content type to use?
    1. Self-Describing messages
    1. Hypermedia
        1. Documentation (really becomes a discussion about strong vs. generic typing)
1. Layered System
1. Code On-Demand
1. Conclusion

## Notes
* Topics that folks want covered
    * versioning - really more a discussion about change more generally and what kinds of changes require what type of versioning (versioning is always disruptive to clients, it should be implemented at the resource level, and orientation [function vs data] determines how much versioning will be necessary)
    * resource design
    * documentation
    * what about technoglogy X (e.g. graphql)?
    * content negotiation
    * content type selection
    * security (authN/authZ)
* I would like to talk about the difference between function-orientation and data-orientation

_in general, I'm not super happy with this outline yet (though it follows the original version of the course). Want to explore a strategy of mixing in the practicum with the conceptual more._

