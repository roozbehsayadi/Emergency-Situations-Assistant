const db = require('../database/db.js')
var Promise = require('promise');
const { json } = require('express');


exports.insertToForms  = function (jsonObj){
    return new Promise((res , rej) => {
        db.insert("forms" , jsonObj)
            .then ((mes) => {
                res("added")
            }).catch ((err) => {
                rej(err)
            })
    })
}

exports.getAllForms  = function  (){
    return new Promise((res , rej) => {
        db.findAll("forms").then ((val) => {
            res(val)
        }).catch((err) => {
            rej(err)
        })
    })
}

exports.getForm = function (id){
    return new Promise ((res , rej) => {
        let jsonStr = " {\"id\" : \"" + id + "\" }" ;
        let role ;
        db.find("forms" , jsonStr)
            .then ((val) => {
                res(val);
            }).catch((err) => {
                rej(err)
            })
    });
}


exports.replaceForm = function (id , newForm) {
    let cond = " {\"id\" : \"" + id + "\" }" ;

    return new Promise((res , rej) => {
        db.replace("forms" , cond , newForm).then((val) => {
            res(val.modifiedCount)
        }).catch ((err) => {
            rej(err)
        })
    })
}

exports.deleteForm = function (id) {
    let cond = " {\"id\" : \"" + id + "\" }" ;

    return new Promise((res , rej) => {
        db.deleteOne("forms" , cond).then((val) => {
            res(val.deletedCount)
        }).catch((err) => {
            rej(err)
        })
    })
}

