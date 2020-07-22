const db = require('../database/db.js')
var Promise = require('promise');
const { json } = require('express');
const polygons = require ('./polygons')



exports.insertToAnswers = async function (answers , name , id){
    // return new Promise((res , rej) => {
      let jsonObj = {} ;
      jsonObj["username"] = name ;
      jsonObj["formId"] = id ;
      jsonObj["answers"] = answers ;
      jsonObj["areas"] = [];
      areas = [];
      const promises = answers.map(async (element) => {
          if (element.type == "Location" &&
              element.answer) {
                const poly = await polygons.isIn(element.answer)
                return poly
          }
      });
      const polys = await Promise.all(promises)
      areasToAdd = polys.filter(function( element ) {
        return element !== undefined;
      });
      jsonObj["areas"] = areasToAdd ;
      db.insert("answers" , jsonObj)
          .then ((mes) => {
              res("added")
          }).catch((err) => {
              rej(err)
          })
    // })
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
