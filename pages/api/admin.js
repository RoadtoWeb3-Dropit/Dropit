const axios = require('axios');

export function createDrop(details) {
    return axios.post("http://localhost:82/drop", details)
    .then(res => {
        console.log(res);
    })
    .catch(err => {return err.response.data;}); 
}