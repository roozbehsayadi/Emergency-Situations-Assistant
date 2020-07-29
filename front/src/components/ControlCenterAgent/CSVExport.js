import React from "react";
import {CSVLink} from "react-csv";

const CSVExport = (data) => {
    let headers = []
    let export_data = []
    data[0].answers.forEach((value, index) => {
        headers.push({
            label: value.title,
            key: value.name,
        })
    })
    data.forEach((value, index) => {
        let row = {}
        console.log(value.answers)
        value.answers.forEach((field, index_) => {
            // if (field.hasOwnProperty('answer'))
                row[field.name]= field.answer.toString();
        })
        export_data.push(row)
    })
    return (
        <CSVLink data={export_data} headers={headers}>
            export CSV
        </CSVLink>
    )
}

export default CSVExport