//import { baseURL } from "./../data/constants.js"
//const baseURL = process.env.REACT_API_BASE_URL;

export function getJsonData(url) {
    //return fetch('http://localhost:3001' + url, {
    return fetch('http://localhost:3001' + url, {
        method: 'GET',
        headers: {
            token: localStorage.getItem('token')
        }
    }).then(res => res.json())
}

export function postJsonData(url, obj) {
    return fetch('http://localhost:3001' + url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            token: localStorage.getItem('token')
        },
        body: JSON.stringify(obj)
    }).then(res => res.json())
}