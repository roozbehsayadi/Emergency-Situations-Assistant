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

                    let newRed = {}
                    newRed["username"] = userName ;
                    newRed["role"] = "control_center"
                    db.insert("users" , newRed).then ((added) => {
                        res("control_center")
                    })
                    .catch((err) => {
                        rej(err)
                    })

                }
                else {
                    console.log(res.val)
                    res(val.role);
                }
            }).catch((err) => {
                rej(err)
            })
    });
}