export const name = document.querySelector("#name")
export const location = document.querySelector("#location")
export const description = document.querySelector("#description")
export const cost = document.querySelector("#cost")


export const list = interest => {
    return `
        <h2 id="list-location-${interest.id}">Location: ${interest.location}</h2>
        <h1 id="list-name">Name: ${interest.name}</h1>
        <h2 id="list-description">Description: ${interest.description}</h3>
        <label for="list-cost-${interest.id}">Cost: </label>
        <h3 id="list-cost-${interest.id}"><span>$</span>${interest.cost}</h3>
        <label for="list-review-${interest.id}">Review: </label>
        <p id="list-review-${interest.id}">${interest.review}</p>
        <button id="edit-${interest.id}">Edit Interest</button>
        <button id="delete-${interest.id}">Delete Interest</button>
        <hr>
    `
}


export const editList = (interest) => {
    return `
        <h2 id="list-location-${interest.id}">Location: ${interest.location}</h2>
        <h1 id="list-name">Name: ${interest.name}</h1>
        <h3 id="list-description">Description: ${interest.description}</h3>
        <label for="edit-cost-${interest.id}">Cost:</label>
        <span>$</span>
        <input type="number" id="edit-cost-${interest.id}" placeholder="Cost please"min="0.01" step="0.01" max="10000" value="25.67">
        <label for="edit-review-${interest.id}">Review:</label>
        <input id="edit-review-${interest.id}" style="min-width: 200px" type="text" placeholder="Review please">
        <button id="confirm-${interest.id}">Save Edit</button>
        <hr>
    `
}