import {API} from "./data.js"
import {list, editList, name, location, cost, description} from "./components.js"

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
                if (!(interest.review))
                {
                    interest.review = "(Please add a review . . .)"
                }
                interestContainer.innerHTML = list(interest)
                listContainer.appendChild(interestContainer)
                this.addEvents(interest)
            });
        })
    },

    addEditComp(interest)
    {
        console.log(interest.id)
        let interestContainer = document.querySelector(`#interest-item-${interest.id}`)
        console.log("thing", interestContainer)
        let editCost = document.querySelector(`#list-cost-${interest.id}`).textContent
        let editReview = document.querySelector(`#list-review-${interest.id}`).textContent
        if (editReview === null || "(Please add a review . . .)")
        {
            editReview = ""
        }
        interestContainer.innerHTML = editList(interest)
        document.querySelector(`#edit-cost-${interest.id}`).value = editCost
        document.querySelector(`#edit-review-${interest.id}`).value = editReview

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
        document.querySelector(`#edit-${interest.id}`).addEventListener("click", () =>
        {
            this.addEditComp(interest)
            // API.editInterest(interest, interest.id)
            // .then(() => this.addInterests())
        })
        document.querySelector(`#delete-${interest.id}`).addEventListener("click", () =>
        {
            if (confirm('Delete please?')) {
                API.deleteInterest(interest.id)
                .then(() => this.addInterests())
            } else {
                // Delete nothing
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