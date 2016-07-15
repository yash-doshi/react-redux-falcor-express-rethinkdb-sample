var Router = require('falcor-router'),
    names = require('./names');

var NamesRouter = Router.createClass([
    {
        route: 'names[{integers:nameIndexes}]["name", "id"]',
        get: (pathSet) => {
            console.log(JSON.stringify(pathSet));
            var keys = pathSet[2];
            var results = [];
            pathSet.nameIndexes.forEach(nameIndex => {
                if (names.length > nameIndex) {
                    keys.forEach((key) =>{
                        results.push({
                            path: ['names', nameIndex, key],
                            value: names[nameIndex][key]
                        });
                    });
                }
            });
            return results;
        }
    },
    {
        route: 'names.length',
        get: (pathSet) => {
            console.log(JSON.stringify(pathSet));
            return {
                path: ['names', 'length'], value: names.length
            }
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