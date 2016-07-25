var r = require('rethinkdb');
var Promise = require('promise');

var cursorCallback = function(err, cursor, callback) {
    if (err) {
        //Better logging needed
        console.log(err);
        callback(false);
        return;
    }
    cursor.toArray(function (err, result) {
        if (err) {
            console.log(err);
            callback(false);
            return;
        }
        callback(true, result);
    });
};

var resultCallback = function(err, result, callback) {
    if(err){
        console.log(err);
        callback(false);
    } else {
        callback(true, result)
    }
};

// Every function will accept a callback function, func(isSuccess, result). If isSuccess is true, result can be processed
var DBWrapper = new function() {
    this.connection = null;
    this.init = () => {
        var _self = this;
        return new Promise((resolve, reject) => {
            if (_self.connection){
                resolve(_self.connection);
                return;
            }
            var config = require('../config/db.config.json');
            r.connect(config, function(err, conn) {
                if (err) throw err;
                _self.connection = conn;
                console.log("Connected to Db Server");
                resolve(_self.connection)
            });
        });
    };


    // region Getters

    // primaryKeys can be single key, or an array of keys
    this.getByPrimaryKey = (table, primaryKeys, callback) => {
        this.init().then((connection) => {
            if (Array.isArray(primaryKeys)){
                r.table(table).getAll(r.args(primaryKeys)).run(connection, function(err, cursor){
                    cursorCallback(err, cursor, callback);
                });
            } else {
                r.table(table).get(primaryKeys).run(connection, function(err, result){
                    resultCallback(err, result, callback)
                });
            }
        });
    };
    
    this.getAll = (table, callback) => {
        this.init().then((connection) => {
            r.table(table).run(connection, function(err, cursor) {
                cursorCallback(err, cursor, callback);
            });
        });
        
    };
    
    this.getByCustomFilter = (table, filter, callback) => {
        this.init().then((connection) => {
            r.table(table).filter(filter).run(connection, function(err, cursor) {
                cursorCallback(err, cursor, callback);
            });
        });
    };
    
    this.getByKeyValuePair = (table, key, value, callback) => {
        this.getByCustomFilter(table, r.row(key).eq(value), callback);
    };

    
    // Example: modifier = {filter: {userId: 101}, orderBy:{'name'}, getOnlyCount: true}
    this.getByAnything = (table, modifier, callback) => {
        this.init().then((connection) => {

            var query = r.table(table);
            if(modifier.filter) query = query.filter(modifier.filter);
            if(modifier.orderBy) query = query.orderBy({index: r.desc(modifier.orderBy)});
            if(modifier.limit) query = query.limit(modifier.limit);
            if(modifier.pluck) query = query.pluck(modifier.pluck);
            if(modifier.getOnlyCount) query = query.count();

            query.run(connection, function(err, cursorOrResult) {
                if(modifier.getOnlyCount) resultCallback(err, cursorOrResult, callback);
                else cursorCallback(err, cursorOrResult, callback);
            });
        });
    };

    // endregion


    // region Non-Idempotent queries (Inserts and Deletions)

    // objects can be array of objects or a single object
    this.insert = (table, objects, callback) => {
        this.init().then((connection) => {
            r.table(table).insert(objects).run(connection, function(err, result) {
                resultCallback(err, result, callback);
            });
        });
    };

    this.delete = (table, primaryKey, callback) => {
        this.init().then((connection) => {
            r.table(table).get(primaryKey).delete().run(connection, function(err, result) {
                resultCallback(err, result, callback);
            });
        });
    };

    // endregion
    
    // region Updates

    // objects can be array of objects or a single object
    this.updateSingle = (table, primaryKey, updateObject, callback) => {
        this.init().then((connection) => {
            r.table(table).get(primaryKey).update(updateObject).run(connection, function(err, result) {
                resultCallback(err, result, callback);
            });
        });
    };
    
    this.updateConditional = (table, filter, updateObject, callback) => {
        this.init().then((connection) => {
            r.table(table).filter(filter).update(updateObject).run(connection, function(err, result) {
                resultCallback(err, result, callback);
            });
        });
    };

    // endregion


    
};

module.exports = DBWrapper;