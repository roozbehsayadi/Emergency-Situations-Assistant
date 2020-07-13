const MongoClient = require('mongodb').MongoClient;
var Promise = require('promise');
require('dotenv').config()
const uri  = `mongodb+srv://${process.env.dbusername}:${process.env.dbpass}@cluster0.is06k.gcp.mongodb.net/${process.env.dbname}?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true ,
                                      useUnifiedTopology: true  });
var db = null ;

function connect (){
    client.connect(function(err, client) {
        if (err) throw err;
        db = client.db("projectDB")
        console.log("Switched to "+db.databaseName+" database");
    });
}

function find (collection , object) {
    return new Promise((res , rej) => {
        object = JSON.parse(object)
        db.collection(collection).findOne(object, function(err, result) {
            if (err) rej(err)
            res(result)
        });
    })
}

function findMany (collection , object) {
    return new Promise((res , rej) => {
        object = JSON.parse(object)
        db.collection(collection).find(object).toArray(function(err, result) {
            if (err)  rej(err);
            res(result)
        });
    })
}

function insert (collection , object){

    return new Promise((res , rej) => {
        db.collection(collection).insertOne(object, function(err, result) {
            if (err)  rej(err)
            res("added")
        });
    })
}

function findAll (collection) {
    return new Promise ((res , rej) => {
        db.collection(collection).find({}).toArray(function(err, result) {
            if (err)  rej(err);
            res(result)
        });
    })
}
module.exports = {
    find: find,
    connect : connect ,
    insert : insert,
    findMany : findMany,
    findAll : findAll ,
}