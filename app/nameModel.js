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
                .get(['namelist', indices, ['name','id', 'inYourList']])
                .then(response => {
                    var namelistObject = response.json.namelist;
                    var namelist = Object.keys(namelistObject).filter(index => !isNaN(index))
                        .map((index) => {return namelistObject[index]});
                    resolve(namelist)
                });
        });
    };

    this.getAll = () => {
        return this.getLength().then(length => {
            return this.getList({from: 0, to: length-1})
        })
    };
    
    this.add = (newName) => {
        return model.call(['namelist', 'add'], [newName], [["id"]])
            .then(response => {
                var addedObject = response.json.namelist[0];
                if(addedObject)
                    return Promise.resolve(addedObject.id);
                else 
                    return Promise.reject(Error('Id not retrieved. Please refresh the page'))
            });
    };
    
    this.edit = (id, editedName) => {
        return model.setValue(['namesById', id, 'name'], editedName)
    };

    this.delete = (id) => {
        return model.call(['namelist', 'delete'], [id], [], [["length"], [{from: 0, to: 15}, ['name','id', 'inYourList']]])
    };


};

export default NameModel;