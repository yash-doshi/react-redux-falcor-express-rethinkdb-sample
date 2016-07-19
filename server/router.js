var Router = require('falcor-router'),
    NameModel = require('./NameModel');

var jsonGraph = require('falcor-json-graph');
var $ref = jsonGraph.ref;
var $error = jsonGraph.error;

var DBWrapper = require('./DBWrapper');

var NamesRouter = Router.createClass([
    {
        route: 'namelist.length',
        get: (pathSet) => {
            console.log(JSON.stringify(pathSet));
            return NameModel.getLength().then(function(length){
                return {
                    path: ['namelist', 'length'], value: length
                }
            }, function(err){ /* Handle error */ })
        }
    },
    {
        route: 'namelist[{integers:listIndices}]',
        get: (pathSet) => {
            console.log(JSON.stringify(pathSet));
            return NameModel.customizedNameListForUser(undefined).then((ids) => {
                var pathValues = [];
                pathSet.listIndices.forEach(function(index){
                    if(ids[index]){
                        pathValues.push({
                            path: ['namelist', index],
                            value: $ref(['namesById', ids[index]])
                        })
                    }
                });
                return pathValues;
            }, function(err){ /* Handle error */ });
        }
    },
    {
        route: 'namesById[{keys:nameIds}]["name", "id"]',
        get: (pathSet) => {
            console.log(JSON.stringify(pathSet));
            var keys = pathSet[2];
            var results = [];

            return NameModel.getById(pathSet.nameIds).then(names => {
                pathSet.nameIds.forEach(nameId => {
                    var index = names.map(name => name.id).indexOf(nameId);
                    if (index > -1) {
                        keys.forEach((key) =>{
                            if(names[index][key]){
                                results.push({
                                    path: ['namesById', nameId, key],
                                    value: names[index][key]
                                });
                            } else {
                                results.push({
                                    path: ['namesById', nameId, key],
                                    value: null
                                });
                            }
                        });
                    } else {
                        results.push({
                            path: ['namesById', nameId],
                            value: null
                        });
                    }
                });
                return results;
            }, function(err){ /* Handle error */ });
        }
    },
    {
        route: 'namesById[{integers:ids}].name',
        set: (jsonGraphArg) => {
            console.log(JSON.stringify(jsonGraphArg));
            console.log('Function not ready yet');
            return [];
            /*
            idNameObjects = Object.keys(jsonGraphArg.namesById)
                                    .map(id => { return { id: id, name: jsonGraphArg.namesById[id].name } });
            return NameModel.updateNames(idNameObjects).then(result => {
                return result.map(result => {
                    return {
                        path: ['namesById', result.id, 'name'], value: result.name
                    }
                });
            }, function(err){ /!* Handle error *!/ });
            */
        }
    },
    {
        route: 'names.add',
        call: (callPath, args, pathSet) => {
            console.log(JSON.stringify(callPath) + '||' + JSON.stringify(args) + '||' + JSON.stringify(pathSet));
            var newName = args[0];
            return NameModel.addName(newName).then(() => {
                return [
                    { path: ['namelist', 'length'] }
                ]
            }, function(err){ /* Handle error */ });
        }
    },
    {
        route: 'names.delete',
        call: (callPath, args, pathSet) => {
            console.log(JSON.stringify(callPath) + '||' + JSON.stringify(args) + '||' + JSON.stringify(pathSet));
            var id = args[0];
            return NameModel.delete(id).then(() => {
                return NameModel.getLength().then(function(length){
                    return [
                        { path: ['namelist', 'length'], value: length },
                        { path: ['namesById', id], invalidated: true },
                        { path: ['namelist', {from: 0, to: length-1}], invalidated: true }
                    ]
                }, function(err){ /* Handle error */ });
            }, function(err){ /* Handle error */ });
        }
    }
]);

module.exports = NamesRouter;