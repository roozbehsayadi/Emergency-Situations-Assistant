const db = require('../database/db.js')
var Promise = require('promise');
const { json } = require('express');
const polygons = require ('./polygons')



exports.insertToAnswers = async function (answers , name , id){

      let jsonObj = {} ;
      jsonObj["username"] = name ;
      jsonObj["formId"] = id ;
      jsonObj["areas"] = [];
      areas = [];
      const promises = answers.map(async (element) => {
          if (element.type == "Location" &&
              element.answer) {
                const poly = await polygons.isIn(element.answer)
                element["areas"] = poly
                return poly
          }
      });
      const polys = await Promise.all(promises)
      areasToAdd = polys.filter(function( element ) {
        return element !== undefined;
      });

    jsonObj["answers"] = answers ;
      db.insert("answers" , jsonObj)
          .then ((mes) => {
              res("added")
          }).catch((err) => {
              rej(err)
          })
}



exports.getAnswers = function (id) {
    return new Promise ((res , rej) => {
        let jsonStr = " {\"formId\" : \"" + id + "\" }" ;
        db.findMany("answers" , jsonStr)
            .then ((val) => {
                res(val);

            })
            .catch((err) => {
                rej(err)
            })
    });
}

