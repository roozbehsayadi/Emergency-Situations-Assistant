const db = require('../database/db.js')
var Promise = require('promise');
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
            })
    })
}

module.exports = {
    getUserRole: getUserRole,
    insertToForms : insertToForms ,
}