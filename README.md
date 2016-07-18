# Sample App

A simple, starter code showcasing basic CRUD operations using ReactJs, Falcor, ExpressJs Node.js

The app constructed here is simple - a list of names, maintained on the server, with the ability to display, add, edit and delete names in the list via the browser. [NOT YET]All code is covered by unit and Selenium-based integration tests as well.


Changing the Falcor JSONGraph model to

~~~js
{
  namelist: [
    length: 1024,
    { $type: "ref", value: ["names", 234] },
    { $type: "ref", value: ["names", 10240] },
    // more names references snipped
  ],
  namesById: {
    234: {
      "name": "Alice"
    },
    123: {
      "name": "Bob"
    },
    10240: {
      "name": "Charlie"
    },
    // many more names snipped
  }
}
~~~


## Starting the app  
1. `node server`
2. Navigate to http://localhost:9090

## Prod server
1. `npm run start:prod`