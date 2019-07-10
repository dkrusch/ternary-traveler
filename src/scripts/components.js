export const list = interest => {
    return `
    <div id="interest-item"
        <h2>Location: ${interest.location}</h2>
        <h1>Name: ${interest.name}</h1>
        <h3>Description: ${interest.description}</h3>
        <h3>Cost: ${interest.cost}</h3>
        <p>Review: ${interest.review}</p>
        <button id="edit-${interest.$id}">Edit Interest</button>
        <button id="delete-${interest.id}">Delete Interest</button>
    </div>
    `
}