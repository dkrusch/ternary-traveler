import {API} from "./data.js"
import {list, editList, name, location, cost, description} from "./components.js"



export const Dom = {
    addInterests()
    {
        let listContainer = document.querySelector("#interest-container")
        listContainer.innerHTML = ""
        API.getData("interests").then(interests =>
        {
            interests.forEach(interest =>
            {
                let interestContainer = document.createElement("div")
                interestContainer.setAttribute("id", `interest-item-${interest.id}`)
                if (!(interest.review))
                {
                    interest.review = "(Please add a review . . .)"
                }
                console.log(interest)
                API.getPlace(interest.placeId)
                .then(place =>
                {
                    interest.location = place[0].name
                    interestContainer.innerHTML = list(interest)
                    listContainer.appendChild(interestContainer)
                    this.addEvents(interest)
                })
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
            editReview = ""
        }
        API.getPlace(interest.placeId)
        .then(place =>
        {
            interest.location = place[0].name
            interestContainer.innerHTML = editList(interest)
            editCost = editCost.replace("$", "")
            document.querySelector(`#edit-cost-${interest.id}`).value = editCost
            document.querySelector(`#edit-review-${interest.id}`).value = editReview
            this.saveEvent(interest)
        })
    },

    newInterest()
    {
        console.log(typeof +location.value)
        API.getPlace(+location.value)
        .then(place =>
        {
            const newItem = {
                name: name.value,
                placeId: +location.value,
                cost: cost.value,
                description: description.value
            }
            API.postInterest(newItem)
            .then(() => this.addInterests())

            // Reset the form values once the new item has been posted
            name.value = ""
            cost.value = ""
            location.value = 1
            description.value = ""
        })
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

    // generatePlaces()
    // {
    //     let placeArray = []
    //     let dropdown = `<label for="location">Location Please:</label><select>`
    //     const dropDiv = document.querySelector("#dropdown-here")
    //     API.getPlaces()
    //     .then(places =>
    //     {
    //         console.log("hello")
    //         places.forEach(place =>
    //         {
    //             placeArray.push(place.name)
    //         })
    //         placeArray.forEach((name, i) =>
    //         {
    //             dropdown += `<option value=${i++}>${name}</option>`
    //         })
    //         dropdown += `</select>`
    //         dropDiv.innerHTML = dropdown
    //     })
    // },

    saveEvent(interest)
    {
        document.querySelector(`#confirm-${interest.id}`).addEventListener("click", () =>
        {
            let costValue = document.querySelector(`#edit-cost-${interest.id}`).value
            let reviewValue = document.querySelector(`#edit-review-${interest.id}`).value
            const changedItem = {
                name: interest.name,
                placeId: interest.placeId,
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