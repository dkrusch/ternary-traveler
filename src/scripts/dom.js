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
        let interestContainer = document.querySelector(`#interest-item-${interest.id}`)
        let editCost = document.querySelector(`#list-cost-${interest.id}`).textContent
        let editReview = document.querySelector(`#list-review-${interest.id}`).textContent
        if (editReview === null || editReview === "(Please add a review . . .)")
        {
            console.log("IFFFFFFFFFFFFFF")
            editReview = ""
        }
        interestContainer.innerHTML = editList(interest)
        document.querySelector(`#edit-cost-${interest.id}`).value = editCost
        document.querySelector(`#edit-review-${interest.id}`).value = editReview
        this.saveEvent(interest)
    },

    newInterest()
    {
        const newItem = {
            name: name.value,
            placeId: +location.value,
            cost: cost.value,
            description: description.value
        }
        API.postInterest(newItem)
        .then(() => this.addInterests())
    },

    addEvents(interest)
    {
        document.querySelector(`#edit-${interest.id}`).addEventListener("click", () =>
        {
            this.addEditComp(interest)
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

    saveEvent(interest)
    {
        document.querySelector(`#confirm-${interest.id}`).addEventListener("click", () =>
        {
            let costValue = document.querySelector(`#edit-cost-${interest.id}`).value
            let reviewValue = document.querySelector(`#edit-review-${interest.id}`).value
            const changedItem = {
                name: interest.name,
                placeId: interest.location,
                cost: interest.cost,
                description: interest.description,
                cost: costValue,
                review: reviewValue
            }
            console.log("saveSAVE")
            API.editInterest(changedItem, interest.id)
            .then(() => this.addInterests())
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