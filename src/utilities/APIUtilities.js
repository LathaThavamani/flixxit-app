const serverURL = process.env.REACT_APP_SERV_BASE_URL;
export function getJsonData(url) {
    console.log(process.env.REACT_SERV_BASE_URL)
    return fetch(serverURL + url, {
        method: 'GET',
        headers: {
            token: localStorage.getItem('token')
        }
    }).then(res => res.json())
}

export function postJsonData(url, obj) {
    return fetch(serverURL + url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            token: localStorage.getItem('token')
        },
        body: JSON.stringify(obj)
    }).then(res => res.json())
}

export function putJsonData(url, obj) {
    return fetch(serverURL + url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            token: localStorage.getItem('token')
        },
        body: JSON.stringify(obj)
    }).then(res => res.json())
}