document.addEventListener("DOMContentLoaded", () => {
fetchDogs()
})




function fetchDogs() {
    fetch('http://localhost:3000/pups')
        .then( response => response.json())
        .then( dogArray => dogArray.forEach( dog => renderDog(dog))
        )
}

function renderDog(dog) {
    let container = document.getElementById("dog-bar")
    let dogSpan = document.createElement('span')
    dogSpan.innerText = dog.name
    dogSpan.id = dog.id
    container.append(dogSpan)
    dogSpan.addEventListener("click", dogHandler)
}

function renderDogSpan(dog) {
    dogDiv = document.getElementById('dog-info')
    dogDiv.innerHTML = ""

    imgTag = document.createElement('img')
    imgTag.src = dog.image
   
    dogHeader = document.createElement('h2')
    dogHeader.innerText = `${dog.name}`

    dogButton = document.createElement('button')
    dogButton.id = dog.id
    dogButton.addEventListener("click", toggleDogStatus)
    
    if (dog.isGoodDog === true) {
        dogButton.innerText = "Good Dog!"
    }
    else {
        dogButton.innerText = "Bad Dog!"
    }
    dogDiv.append(imgTag, dogHeader, dogButton)
}

function dogHandler(event) {
    fetch(`http://localhost:3000/pups/${event.target.id}`)
    .then(response => response.json())
    .then(dog => renderDogSpan(dog))
}

function toggleDogStatus(event) {
   
    let dogStatus
    if (event.target.innerText === "Good Dog!") {
         event.target.innerText = "Bad Dog!"
         dogStatus = false}
    else {
        dogStatus = true
        event.target.innerText = "Good Dog!"
    }
    fetch(`http://localhost:3000/pups/${event.target.id}`, {
        method: "PATCH",
        body: JSON.stringify({isGoodDog : dogStatus}),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    })
    .then(resp => resp.json())
    .then(dog => console.log(dog))
}
