var Router = require('falcor-router'),
    NameModel = require('./NameModel');

var jsonGraph = require('falcor-json-graph');
var $ref = jsonGraph.ref;
var $error = jsonGraph.error;

var DBWrapper = require('./DBWrapper');

var errorHandler = (err) => {
    console.log(err);
};

var NamesRouter = Router.createClass([
    {
        route: 'namelist.length',
        get: (pathSet) => {
            console.log(JSON.stringify(pathSet));
            return NameModel.getLength().then(function(length){
                return {
                    path: ['namelist', 'length'], value: length
                }
            }, errorHandler)
        }
    },
    {
        route: 'namelist[{integers:listIndices}]',
        get: (pathSet) => {
            console.log(JSON.stringify(pathSet));
            return NameModel.getNameList(undefined).then((ids) => {
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
            }, errorHandler);
        }
    },
    {
        route: 'namesById[{keys:nameIds}]["name", "id", "inYourList"]',
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
            }, errorHandler);
        }
    },
    {
        route: 'namesById[{integers:ids}].name',
        set: (jsonGraphArg) => {
            console.log(JSON.stringify(jsonGraphArg));

            var objects = Object.keys(jsonGraphArg.namesById)
                .map(id => { return { id: id, name: jsonGraphArg.namesById[id].name } });
            return objects.map((object) => {
                return NameModel.update(object.id, object.name).then(()=> {
                    return {path: ['namesById', object.id, 'name'], value: object.name};
                }, errorHandler);
            });
        }
    },
    {
        route: 'namesById[{integers:ids}].inYourList',
        set: (jsonGraphArg) => {
            console.log(JSON.stringify(jsonGraphArg));

            var objects = Object.keys(jsonGraphArg.namesById)
                .map(id => { return { id: id, inYourList: jsonGraphArg.namesById[id].name } });
            return objects.forEach((object) => {
                return NameModel.update(object.id, null, object.inYourList).then(()=> {
                    return {path: ['namesById', object.id, 'inYourList'], value: object.inYourList};
                }, errorHandler);
            });
        }
    },
    {
        route: 'namelist.add',
        call: (callPath, args, pathSet) => {
            console.log(JSON.stringify(callPath) + '||' + JSON.stringify(args) + '||' + JSON.stringify(pathSet));
            var newName = args[0];
            return NameModel.addName(newName).then((newId) => {
                return NameModel.getLength().then((length)=>{
                    return [
                        { path: ['namelist', 'length'], value: length },
                        { path: ['namelist', {from:0 , to: length-1}], invalidated: true },
                        { path: ['namelist', 0], value: $ref(['namesById', newId]) }
                    ]
                });
            }, errorHandler);
        }
    },
    {
        route: 'namelist.delete',
        call: (callPath, args, pathSet) => {
            console.log(JSON.stringify(callPath) + '||' + JSON.stringify(args) + '||' + JSON.stringify(pathSet));
            var id = args[0];
            return NameModel.delete(id).then(() => {
                return NameModel.getLength().then(function(length){
                    return [
                        { path: ['namelist', 'length'], value: length },
                        { path: ['namelist', {from: 0, to: length-1}], invalidated: true },
                        { path: ['namesById', id], invalidated: true }
                    ]
                }, errorHandler);
            }, errorHandler);
        }
    }
]);

module.exports = NamesRouter;