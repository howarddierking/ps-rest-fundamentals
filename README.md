# ps-rest-fundamentals
Assets for my Pluralsight course, REST Fundamentals (2020 revision)

## General
The original course launched in the spring of 2012 and even today is useful in helping folks understand the theory behind the REST architectural style. A few things that I want to improve in this refresh include the following.

* do a better job bridging the theoretical to the practical by adding a reference implementation to each major conceptual topic
* drive home the point that REST describes a complete system architecture and not just the server
* address some of the [typically practical] questions that have come up since I first recorded the course
* include commentary on my own experience in the last 8 years as an implementer of these ideas
* introduce some of the principles of linked data as a natural progression of REST

## Outline
1. Introduction
    1. Juxtaposed architectures
    1. The WWW 
1. A REST Primer (theory)
    1. Constraints - what and why
    1. Elements
1. Getting to Working - Introducing RESTbugs
    1. Uniform interface constraint means that we can change the server without breaking the client, meaning that we can start without needing a server implementation
    1. entry point resource
    1. resource modeling
    1. data modeling - representation discussion
    1. cache control headers
    1. content negotiation, agent-driven
1. Beyond GET - Mutations
    1. Scaffolding out a server in Node.js
    1. Driving workflow through hypermedia - something novel or use hydra?
    1. Add security (OIDC via Auth0) - show how the IdP is an example of code-on-demand
    1. Optimistic concurrency using conditional requests
    1. Versioning / lineage
1. Optimizing for the Cloud
    1. Hot/Cold strategy using cloud storage - show how hypermedia enables client to function seamlessly
1. A Broader Look // Beyond REST
    1. Duplex channel (HTTP/2)
    1. Event-driven architecture
    1. Overall usability

## Key Takeaways
* REST describes the entire system - not just APIs
* URIs are important for providing a stable, globally scoped, unique identifier - they are not important for communicating semantics
* Optimize for immutable, static resources
* URIs are cheap. Don't fear minting them.
* There's an inversely proportionality between cleverness and usability - especially when it comes to using   protocol features. Err on the side of simplicity and expressivity.
* For most implementations, every change to the representation is a potentially breaking change to the resource. Versions belong in the URI. 
    * Additionally, more novel ways of versioning (e.g. metadata) only add to caching complexity, which may not be consistently supported by all cache connectors
* server-driven content negotation should be a convenience on top of agent-driven, but should _never_ be the only option. 
* "RESTful APIs" (e.g. just the server part of the client-server) often do not yield RESTful systems as they place an often outsized burden on clients. If you have clients that expect to interact with your data as a set of function calls, consider data-forward RPC approaches such as GraphQL.

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
* Fun fact - REST was a key part of the early definition of micro-services (2005 Peter Rodgers talk at Web Services Edge conference)
* Brief mention of components and connectors - both are roles. The difference is that components define the role of a process in the overall system (e.g. user agent, proxy, gateway, etc) while the connector defines the role of the process in a specific network interaction (e.g. client, server, cache)
* Documentation really becomes a discussion about strong vs. generic typing
