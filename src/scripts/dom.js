import {API} from "./data.js"
import {list, name, location, cost, description} from "./components.js"

export const Dom = {
    addInterests()
    {
        let listContainer = document.querySelector("#interest-container")
        listContainer.innerHTML = ""
        API.getData("interests").then(interests =>
        {
            console.log(interests)
            interests.forEach(interest =>
            {
                console.log(interest)
                let interestContainer = document.createElement("div")
                interestContainer.setAttribute("id", `interest-item-${interest.id}`)
                interestContainer.innerHTML = list(interest)
                listContainer.appendChild(interestContainer)
                this.addEvents(interest)
            });
        })
    },

    newInterest()
    {
        const newItem = {
            name: name.value,
            placeId: +location.value,
            cost: cost.value,
            description: description.value
        }
        console.log(newItem)
        API.postInterest(newItem)
        .then(() => this.addInterests())
    },

    addEvents(interest)
    {
        console.log(interest.id)
        document.querySelector(`#edit-${interest.id}`).addEventListener("click", () =>
        {
            API.editInterest(interest, interest.id)
            .then(() => this.addInterests())
        })
        document.querySelector(`#delete-${interest.id}`).addEventListener("click", () =>
        {
            if (confirm('Delete please?')) {
                API.deleteInterest(interest.id)
                .then(() => this.addInterests())
            } else {
                // Do nothing!
            }
        })
    },

    postEvent()
    {
        document.querySelector("#create-interest").addEventListener("click", () =>
        {
            this.newInterest()
        })
    }
}