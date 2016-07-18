import { Model } from 'falcor';
import HttpDataSource from 'falcor-http-datasource';
import Promise from 'promise';


const model = new Model({
    source: new HttpDataSource('/model.json')
});

var NameModel = new function() {
    this.getLength = () => {
        return model.getValue(['namelist', 'length'])
    };

    // indices can be single index, range of indices(ex:- {from: 0, to: 9}) or array of indices(ex:- [0, 1, 5, 12, 45])
    this.getList = (indices) => {
        return new Promise(function(resolve, reject) {
            model
                .get(['namelist', indices, ['name','id']])
                .then(response => {
                    resolve(response.json.namelist)
                });
        });
    };

    this.getAll = () => {
        return this.getLength().then(length => {
            return this.getList({from: 0, to: length-1})
        })
    };
    
    this.add = (newName) => {
        return model.call(['names', 'add'], [newName], ["name"])
    };
    
    this.edit = (position, editedName) => {
        return model.setValue(['namelist', position, 'name'], editedName)
    };

    this.delete = (id) => {
        return model.call(['names', 'delete'], [id], ["id"])
    };


};

module.exports = NameModel;