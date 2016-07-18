var Router = require('falcor-router'),
    names = require('./names'),
    NameModel = require('./NameModel');

var jsonGraph = require('falcor-json-graph');
var $ref = jsonGraph.ref;
var $error = jsonGraph.error;

var NamesRouter = Router.createClass([
    {
        route: 'namelist.length',
        get: (pathSet) => {
            console.log(JSON.stringify(pathSet));
            return NameModel.getLength().then(function(length){
                return {
                    path: ['namelist', 'length'], value: names.length
                }
            })
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
            });
        }
    },
    {
        route: 'namesById[{integers:nameIndexes}]["name", "id"]',
        get: (pathSet) => {
            console.log(JSON.stringify(pathSet));
            var keys = pathSet[2];
            var results = [];

            return NameModel.getById(pathSet.nameIndexes).then(names => {
                pathSet.nameIndexes.forEach(nameIndex => {
                    var index = names.map(name => name.id).indexOf(nameIndex);
                    if (index > -1) {
                        keys.forEach((key) =>{
                            if(names[index][key]){
                                results.push({
                                    path: ['namesById', nameIndex, key],
                                    value: names[index][key]
                                });
                            } else {
                                results.push({
                                    path: ['namesById', nameIndex, key],
                                    value: null
                                });
                            }
                        });
                    } else {
                        results.push({
                            path: ['namesById', nameIndex],
                            value: null
                        });
                    }
                });
                return results;
            });
        }
    },
    {
        route: 'namesById[{integers:ids}].name',
        set: (jsonGraphArg) => {
            console.log(JSON.stringify(jsonGraphArg));
            idNameObjects = Object.keys(jsonGraphArg.namesById)
                                    .map(id => { return { id: parseInt(id), name: jsonGraphArg.namesById[id].name } });
            return NameModel.updateNames(idNameObjects).then(result => {
                return result.map(result => {
                    return {
                        path: ['namesById', result.id, 'name'], value: result.name
                    }
                });
            });
        }
    },
    {
        route: 'names.add',
        call: (callPath, args, pathSet) => {
            console.log(JSON.stringify(callPath) + '||' + JSON.stringify(args) + '||' + JSON.stringify(pathSet));
            var newName = args[0];
            var newId = names[names.length-1].id + 1;
            names.push({id: newId, name: newName});
            return [
                {
                    path: ['names', names.length-1, ['name', 'id']],
                    // value: newName
                },
                {
                    path: ['names', 'length'],
                    value: names.length
                }
            ]
        }
    },
    {
        route: 'names.delete',
        call: (callPath, args, pathSet) => {
            console.log(JSON.stringify(callPath) + '||' + JSON.stringify(args) + '||' + JSON.stringify(pathSet));
            var id = parseInt(args[0]);
            names = names.filter((name)=> {return name.id !== id});
            return [
                {
                    path: ['names', {from:0, to:names.length}, ['id', 'name']]
                },
                {
                    path: ['names', 'length'],
                    value: names.length
                }
            ]
        }
    },
    {
        route: 'names.edit',
        call: (callPath, args, pathSet) => {
            console.log(JSON.stringify(callPath) + '||' + JSON.stringify(args) + '||' + JSON.stringify(pathSet));
            var id = parseInt(args[0]);
            var name = args[1];
            var index = -1;
            names.forEach(function(name, i){ if(name.id === id){index = i}});
            if (index == -1){
                return []
            } else{
                names[index].name = name;
                return [ { path: ['names', index, ['name']] } ]
            }
        }
    }
]);

module.exports = NamesRouter;