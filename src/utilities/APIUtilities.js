import { baseURL } from "../data/constants.js"

export function getJsonData(url, obj) {
    return fetch(baseURL + url, {
        method: 'GET',
        // headers: {
        //     token: localStorage.getItem('token')
        // }
    }).then(res => res.json())
}