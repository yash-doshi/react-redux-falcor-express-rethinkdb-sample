
var names = require('./names');
var DBWrapper = require('./DBWrapper');
var Promise = require('promise');
var uuid = require('node-uuid');

var r = require('rethinkdb');


module.exports = {
    getLength: () => {
        return new Promise(function(resolve, reject) {
            //Ignoring User context as of now
            DBWrapper.getByKeyValuePair('namelist', 'userId', 101, function(isSuccess, result){
                isSuccess ? resolve(result[0].nameIds.length) : reject(Error('DB Error'));
            });
        } );
    },
    customizedNameListForUser: (userId) => {
        //Ignoring User context as of now
        return new Promise(function(resolve, reject) {
            DBWrapper.getByKeyValuePair('namelist', 'userId', 101, function(isSuccess, result){
                isSuccess ? resolve(result[0].nameIds) : reject(Error('DB Error'));
            });
        } );
    },
    getById: (nameIds) => {
        // nameIds = Array.isArray(nameIds) ? nameIds.map(id => parseInt(id)) : parseInt(nameIds);
        return new Promise(function(resolve, reject) {
            DBWrapper.getByPrimaryKey('names', nameIds, function(isSuccess, result){
                isSuccess ? resolve(result) : reject(Error('DB Error'));
            });
        } );
    },
    
    // idNameObjects = [{id: 1, name: 'Alice'}, {id:203, name: 'Roger'}, ...]
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
            var nameObject = { id: uuid.v4(), name: name };
            DBWrapper.insert('names', nameObject, function(isSuccess, result){
                if(isSuccess){
                    var updateObject = {nameIds: r.row("nameIds").append(nameObject.id)}
                    DBWrapper.updateConditional('namelist', {userId: 101}, updateObject, function(isSuccess, innerResult){
                        isSuccess ? resolve(result) : reject(Error('DB Error'));
                    })
                } else {
                    reject(Error('DB Error'));
                }
            });
        } );
    },


    delete: (id) => {
        return new Promise(function(resolve, reject) {
            DBWrapper.delete('names', id, function(isSuccess, result){
                if(isSuccess){
                    var updateObject = {nameIds: r.row("nameIds").filter(innerId => {return innerId.ne(id)})};
                    DBWrapper.updateConditional('namelist', {userId: 101}, updateObject, function(isSuccess, innerResult){
                        isSuccess ? resolve(result) : reject(Error('DB Error'));
                    })
                } else {
                    reject(Error('DB Error'));
                }
            });
        } );
    }
    
};