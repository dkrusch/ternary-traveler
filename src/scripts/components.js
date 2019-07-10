export const name = document.querySelector("#name")
export const location = document.querySelector("#location")
export const description = document.querySelector("#description")
export const cost = document.querySelector("#cost")


export const list = interest => {
    return `
        <h2 id="list-location-${interest.placeId}">Location: ${interest.placeId}</h2>
        <h1 id="list-name">Name: ${interest.name}</h1>
        <h3 id="list-description">Description: ${interest.description}</h3>
        <h3 id="list-cost">Cost: ${interest.cost}</h3>
        <p id="list-review">Review: ${interest.review}</p>
        <button id="edit-${interest.id}">Edit Interest</button>
        <button id="delete-${interest.id}">Delete Interest</button>
        <hr>
    `
}