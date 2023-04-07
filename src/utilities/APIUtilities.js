import { baseURL } from "./../data/constants.js"

export function getJsonData(url, obj) {
    return fetch('http://localhost:3001' + url, {
        method: 'GET',
        // headers: {
        //     token: localStorage.getItem('token')
        // }
    }).then(res => res.json())
}