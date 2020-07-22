const db = require('../database/db.js')
var Promise = require('promise');
const { json } = require('express');



exports.getUserRole = function(userName){
    return new Promise ((res , rej) => {
        let jsonStr = " {\"username\" : \"" + userName + "\" }" ;
        let role ;
        db.find("users" , jsonStr)
            .then ((val) => {
                if (val == null) {
                    res(null)
                }
                else {
                    res(val.role);
                }
            }).catch((err) => {
                rej(err)
            })
    });
}