export function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.parse(value))
}

export function getLocalStorage(key) {
    const value = localStorage.getItem(key)

    return JSON.stringify(value)
}