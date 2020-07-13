var Axios = require('axios');
var Promise = require('promise');
// import {Axios} from "axios";
function getUserRole(username) {
    return new Promise ((res , rej) => {
        Axios.get("http://localhost:9000/user/"+username+"/role").then(
        (role) => {
            res(role.data)
        }).catch((error) => {
           console.log(error)
        })
    })


}
getUserRole("controlcenteragent@gmail.com").then((val) => {
    console.log(val)
})
export default getUserRole;
