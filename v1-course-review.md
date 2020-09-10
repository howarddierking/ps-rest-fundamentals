# Looking through the v1 course
## Introduction
* Why REST
* Properties of a RESTful system
* What is REST (what it is not + what it is)
    * related to RPC
    * related to HTTP

## The Constraints
* constraints vs requirements
    * I'm pretty happy with using the fallacies of distributed computing as the constraining forces
* client-server
* stateless
* cache
* uniform interface
* layered sysetm
* code on-demand

## The Elements
* Components
* Connectors 
    * I'm not really convinced that the discussion of components and connectors is all that necessary 
* Resource
    * Resource Identifier
* Metadata
    * resource metadata
    * represenation metadata
    * control data (e.g. cache control, conditional requests)
* Representation
* Hypermedia

## RESTful Service Design
* The paper tray analogy
* Introducing bug tracking system
    * let's assume that we're going to build Trello
* Look at requirements
* Identify resources
* Design the representation
    * Using HTML
* Dynamically modify the workflow
* Versioning
* Touched on content negotiation

## RESTful Client Design
* REST clients are harder - Tradeoffs
* Client design process
* Entry point resource (I don't really buy into this anymore)
* conditional requests and optimistic concurrency 
* content negotiation
    * I actually showed versioning with server driven conneg - geez I was naive
* deeper dive into links
    * types: embedded, outgoing, templated, idempotent, non-idempotent (I don't remember why these distinctions were important)
    * link relations
    * link locations

## REST and the cloud
* Cloud goals and characteristics
    * scalability
    * efficiency
    * resiliency
    * economies of scale
* some "futurist" scenarios
