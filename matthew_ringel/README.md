# Cryptid Match (aka eSasquatchHarmony)
**Matthew Ringel**  
**sea-d45-javascript**  

**Update 13 December**  
Added:

- a basic directive for making a form to add a new cryptid (which could potentially be used for updating as well, but this isn't implemented yet).

- A service for querying an individual cryptid to see if it is rabid or not.  Simple and not very useful, but it's a service and it works.  Currently not set up to output to the DOM, it just appends to the error array.

- A simple text_box directive that uses transclusion to turn a ```<p>``` into an article with a heading.  Again, not very useful, but more structure could be added to the template to turn the text_box into a reusable building block.  This directive is currently used for the intro text block.

- A function passing directive that creates a button that calls the function being passed to it.  Three uses of the directive are in the code now, where a sort function is passed through the button to allow sorting on different keys in the cryptid model; name, species, and habitat.  A different function could be passed to, for example, reverse sort or find all the cryptids that match a certain key, value pair or something.

**Update 9 December**  
Added some advanced sass features just to play around with them.  (mixins, color operations, list maps)

**Update 8 December**  
Changed css over to Sass .scss.  Sass is mapped, minified and imported into one application.css file during webpack build.

**Update 7 December**  
Added css styling to app in base, module, layout, and state css files.  Css is concatenated and minified during webpack build.

**Update 6 December**
Front end angular code testing is in place with karma and jasmine.

**Update 3 Decemeber**
Submitted with all functionality now implemented.  Canceling an update reverts to previous values.  Updating a profile will auto-update the list.


**Update 2 Decemeber**  
All CRUD operations are functional.  The revert to database values upon canceling edit isn't implemented yet.  Turning in what I have before the due date.


**Update 29 November**  
Added authorization with unique username verification through basic http authorization and eat middleware.  Authorization is fully tested.

Not implemented: asynchronous bcrypt for the bonus point.

**11 November**  
**Updated with tests for all the basic CRUD actions.  Currently no test for my non-crud match route.  Also included some very basic validation requiring that all cryptid documents in the db have a [name] property**

This API is designed as a cryptid matchmaking dating service.  A sasquatch, yeti, or abominable snowman can input their details through the POST at /api/cryptids, update their info through PUT at /api/cryptids, delete their details through DELETE at /api/cryptids/[name], and get a listing of all cryptids in the database through GET at api/cryptids.

If a cryptid sees someone in the database they think they might be a match with they can make a GET request at api/cyptids/[their name]/[other name] and the API will check to make sure neither cryptid has rabies, are both single, and that they have at least one shared interest.  If they are a match the database updates them both to not single and puts their match's id in their partner field,




## Citations

MongoDB validation as suggested here (method 3):  
http://nraj.tumblr.com/post/38706353543/handling-uniqueness-validation-in-mongomongoose

Array Intersection code used from:
http://stackoverflow.com/questions/1885557/simplest-code-for-array-intersection-in-javascript

Base code for routes and server from Tyler's code at https://github.com/codefellows/sea-d45-javascript/tree/master/week_3/nov_10_mongo_and_express/inclass_code
