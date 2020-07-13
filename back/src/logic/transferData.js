const db = require('../database/db.js')
var Promise = require('promise');
const { json } = require('express');


function getUserRole (userName){
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

function insertToForms (jsonObj){
    return new Promise((res , rej) => {
        db.insert("forms" , jsonObj)
            .then ((mes) => {
                res("added")
            }).catch ((err) => {
                rej(err)
            })
    })
}


function getAllForms (){
    return new Promise((res , rej) => {
        db.findAll("forms").then ((val) => {
            res(val)
        }).catch((err) => {
            rej(err)
        })
    })
}

function getForm (id){
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

function insertToAnswers (answers , name , id){
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

function getAnswers (id) {
    return new Promise ((res , rej) => {
        let jsonStr = " {\"formId\" : \"" + id + "\" }" ;
        let role ;
        db.findMany("answers" , jsonStr)
            .then ((val) => {
                res(val);
            }).catch((err) => {
                rej(err)
            })
    });
}

module.exports = {
    getUserRole: getUserRole,
    insertToForms : insertToForms ,
    getAllForms : getAllForms ,
    getForm : getForm ,
    insertToAnswers : insertToAnswers,
    getAnswers : getAnswers ,
}