# Single Resource REST API
**Matthew Ringel**  
**11 Novemeber, 2015**  
**sea-d45-javascript**  

**Submitting this before the due date.  Testing and validation are incomplete.  I will resubmit once those are done.**

**Updated with tests for all the basic CRUD actions.  Currently no test for my non-crud match route.  Also included some very basic validation requiring that all cryptid documents in the db have a [name] property**

This API is designed as a cryptid matchmaking dating service.  A sasquatch, yeti, or abominable snowman can input their details through the POST at /api/cryptids, update their info through PUT at /api/cryptids, delete their details through DELETE at /api/cryptids/[name], and get a listing of all cryptids in the database through GET at api/cryptids.

If a cryptid sees someone in the database they think they might be a match with they can make a GET request at api/cyptids/[their name]/[other name] and the API will check to make sure neither cryptid has rabies, are both single, and that they have at least one shared interest.  If they are a match the database updates them both to not single and puts their match's id in their partner field,




## Citations

Array Intersection code used from:
http://stackoverflow.com/questions/1885557/simplest-code-for-array-intersection-in-javascript

Base code for routes and server from Tyler's code at https://github.com/codefellows/sea-d45-javascript/tree/master/week_3/nov_10_mongo_and_express/inclass_code
