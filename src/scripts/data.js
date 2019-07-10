export const API = {
    getData(name) {
        return fetch(`http//:localhost:8088/${name}`)
        .then(data => data.json())
    }
}