import { Model } from 'falcor';
import Promise from 'promise';

import jsonGraph from 'falcor-json-graph';
var $atom = jsonGraph.atom;


var cacheModel = {
    namesById: {
        '11': {
            name: 'Alice'
        },
        '23': {
            name: 'Bob'
        },
        '59': {
            name: 'Marley'
        }
    }
};

const model = new Model({
    cache: cacheModel
    // source: new HttpDataSource('/model.json')
});


var NameModel = new function() {
    this.test = () => {
        model.setValue(['namesById', 'ajkwdb', 'name'], 'New Name').then((res) => {
            console.log(res);
            console.log(model.getCache());

            model.invalidate(['namesById', '23']);
            console.log(model.getCache());
        });

        console.log(model.getCache().namesById);


    };


    this.getLength = () => {
        return new Promise.resolve(Object.keys(model.getCache().namesById).length);
    };

    this.getAll = () => {
        var obj = model.getCache().namesById;
        var arr = Object.keys(obj).map((id) => {
            return {id: id, name: obj[id].name}
        });
        return Promise.resolve(arr);
    };

    this.add = (id, newName) => {
        return model.setValue(['namesById', id, 'name'], newName);
    };

    this.edit = (id, newName) => {
        return model.setValue(['namesById', id, 'name'], newName);
    };

    this.delete = (id) => {
        model.invalidate(['namesById', id]);
        return Promise.resolve();
    };


};

export default NameModel;