export const API = {
    getData(name) {
        return fetch(`http://localhost:8088/${name}`)
        .then(data => data.json())
    },

    getPlace(id) {
        console.log(id)
        return fetch(`http://localhost:8088/places?id=${id}`)
        .then(data => data.json())
    },

    editInterest(interest, id) {
        console.log(interest)
            return fetch(`http://localhost:8088/interests/${id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(interest)

            }).then(data => data.json())
    },

    deleteInterest(id) {
        return fetch(`http://localhost:8088/interests/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(res => res.json())
    },

    postInterest(post) {
        console.log(post)
        return fetch(`http://localhost:8088/interests`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(post)
        })
        .then(res => res.json())
    },
}