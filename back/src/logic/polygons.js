const db = require('../database/db.js')
var Promise = require('promise');
const { json } = require('express');
var inside = require('point-in-polygon');


exports.insertToPoly  = function (jsonObj){
    return new Promise((res , rej) => {
        db.
        insert("polygons" , jsonObj)
            .then ((mes) => {
                res("added")
            }).catch ((err) => {
                rej(err)
            })
    })
}

exports.getAllPolys  = function  (){
    return new Promise((res , rej) => {
        db.
        findAll("polygons")
            .then ((val) => {
                res(val)
            }).catch((err) => {
                rej(err)
            })
    })
}

exports.getPoly = function (id){
    return new Promise ((res , rej) => {
        let jsonStr = " {\"id\" : \"" + id + "\" }" ;
        db
        .find("polygons" , jsonStr)
            .then ((val) => {
                res(val);
            }).catch((err) => {
                rej(err)
            })
    });
}

exports.replacePoly = function (id , newPoly) {
    return new Promise ((res , rej) => {
        let cond = " {\"id\" : \"" + id + "\" }" ;
        db.replace("polygons" , cond , newPoly).then ((result) => {
            res(result)
        }).catch((err) => {
            rej(err)
        })
    })
}


exports.deletePoly = function (id) {
    let cond = " {\"id\" : \"" + id + "\" }" ;

    return new Promise((res , rej) => {
        db.deleteOne("polygons" , cond).then((val) => {
            res(val.deletedCount)
        }).catch((err) => {
            rej(err)
        })
    })
}
exports.isIn =function (coordinates){
    return new Promise ((res , rej) => {
        db.findAll("polygons").then((polygons) => {
            result = []
            polygons.forEach(element => {
                if (inside(coordinates , element.geometry.coordinates[0]))
                    result.push(element.properties.name) ;
            });

        res(result) ;
        }).catch((err) => {
            rej(err)
        })
    })

}

