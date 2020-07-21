const db = require('../database/db.js')
var Promise = require('promise');
const { json } = require('express');


exports.getUserRole = function(userName){
    return new Promise ((res , rej) => {
        let jsonStr = " {\"username\" : \"" + userName + "\" }" ;
        let role ;
        db.find("users" , jsonStr)
            .then ((val) => {
                res(val.role);
            }).catch((err) => {
                rej(err)
            })
    });
}

exports.insertToForms = function (jsonObj){
    return new Promise((res , rej) => {
        db.insert("forms" , jsonObj)
            .then ((mes) => {
                res("added")
            }).catch ((err) => {
                rej(err)
            })
    })
}


exports.getAllForms = function (){
    return new Promise((res , rej) => {
        db.findAll("forms").then ((val) => {
            res(val)
        }).catch((err) => {
            rej(err)
        })
    })
}

exports.getForm = function(id){
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

exports.insertToAnswers = function (answers , name , id){
    return new Promise((res , rej) => {
        let jsonObj = {}
        jsonObj["username"] = name;
        jsonObj["formId"] = id;
        jsonObj["answers"] = answers;

        db.insert("answers" , jsonObj)
            .then ((mes) => {
                res("added")
            }).catch((err) => {
                rej(err)
            })
    })
}

exports.getAnswers = function (id) {
    return new Promise ((res , rej) => {
        let jsonStr = " {\"formId\" : \"" + id + "\" }" ;

        db.findMany("answers" , jsonStr)
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
