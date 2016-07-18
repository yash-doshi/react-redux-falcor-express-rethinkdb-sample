
var names = require('./names');
var Promise = require('promise');


module.exports = {
    getLength: () => {
        return new Promise(function(resolve, reject) { 
            resolve(names.length);
        } );
    },
    customizedNameListForUser: (userId) => {
        //Ignoring User context as of now
        return new Promise(function(resolve, reject) {
            resolve(names.map(name => name.id));
        } );
    },
    getById: (nameIds) => {
        return new Promise(function(resolve, reject) {
            resolve(names.filter((name) => nameIds.includes(name.id)));
        } );
    },
    updateNames: (idNameObjects) => {
        return new Promise(function(resolve, reject) {
            var results = [];
            idNameObjects.forEach((idNameObject) =>{
                var index = names.map(name => name.id).indexOf(parseInt(idNameObject.id));
                if (index > -1) {
                    names[index].name = idNameObject.name;
                } else {
                    idNameObject.name = null;
                }
                results.push(idNameObject);
            });
            resolve(results);
        } );
    },
    addName: (name) => {
        return new Promise(function(resolve, reject) {
            var newId = names[names.length-1].id + 1; // use uuid in future
            names.push({id: newId, name: name});
            resolve();
        } );
    },
    delete: (id) => {
        return new Promise(function(resolve, reject) {
            names = names.filter((name)=> {return name.id !== id});
            resolve();
        } );
    }
    
};