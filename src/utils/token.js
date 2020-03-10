

export function setToken(key, value) {
    return window.localStorage.setItem(key, value)
}

export function getToken(key) {

    return JSON.parse(window.localStorage.getItem(key))
}

export function removeToken(key) {
    return window.localStorage.removeItem(key)
}