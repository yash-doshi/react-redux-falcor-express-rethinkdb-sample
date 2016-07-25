
var names = require('./names');
var DBWrapper = require('./DBWrapper');
var Promise = require('promise');
var uuid = require('node-uuid');

var r = require('rethinkdb');


module.exports = {
    getLength: () => {
        return new Promise(function(resolve, reject) {
            DBWrapper.getByAnything('names', {getOnlyCount: true}, function(isSuccess, result){
                isSuccess ? resolve(result) : reject(Error('DB Error'));
            });
        } );
    },
    getNameList: () => {
        return new Promise(function(resolve, reject) {
            DBWrapper.getByAnything('names', {pluck: ['id'], orderBy: 'id'}, function(isSuccess, result){
                isSuccess ? resolve(result.map(name => name.id)) : reject(Error('DB Error'));
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
    update: (id, name, inYourList) => {
        if(!name && !inYourList) return Promise.reject(Error('No values Passed'));
        id = parseInt(id);
        if(isNaN(id)) return Promise.reject(Error('Error in id'));
        var updateObj = {};
        if(name) updateObj['name'] = name;
        if(inYourList != null) updateObj['inYourList'] = inYourList;
        return new Promise(function(resolve, reject) {
            DBWrapper.updateSingle('names', id, updateObj,  function(isSuccess, result) {
                if (isSuccess) {
                    resolve(result)
                } else {
                    reject(Error('DB Error'));
                }
            });
        } );
    },
    
    
    addName: (name) => {
        return new Promise(function(resolve, reject) {
            var newId = Date.now();
            var nameObject = { id: newId, name: name, inYourList: false };
            DBWrapper.insert('names', nameObject, function(isSuccess, result){
                if(isSuccess){
                    resolve(newId)
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
                    resolve(result)
                } else {
                    reject(Error('DB Error'));
                }
            });
        } );
    }
    
};