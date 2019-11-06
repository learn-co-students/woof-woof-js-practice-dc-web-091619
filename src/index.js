const url = "http://localhost:3000/pups"

document.addEventListener("DOMContentLoaded", () => {
    fetchDogs()

    dogFilter().addEventListener("click", () => {
        filterDogs()
    })
})

function getDogBar() {
    return document.querySelector("#dog-bar")
}

function dogFilter() {
    return document.querySelector("#good-dog-filter")
}

function fetchDogs() {
    fetch(url)
        .then(resp => resp.json())
        .then(dogArray => dogArray.forEach(dog => renderDog(dog)))
}

function renderDog(dog) {
    getDogBar()

    let span = document.createElement("span")
    span.id = `dog-${dog.id}`
    span.innerText = dog.name
    getDogBar().append(span)
    span.addEventListener("click", dogNameClickHandler)
}

function dogNameClickHandler(event) {
    let dogId = event.target.id.split('-')[1]

    fetchDogShowPage(dogId)
}

function fetchDogShowPage(dogId) {
    fetch(`${url}/${dogId}`)
        .then(resp => resp.json())
        .then(dog => renderDogInfo(dog))
}

function renderDogInfo(dog) {
    let getDogInfoDiv = document.querySelector("#dog-info")
    getDogInfoDiv.dataset.dogInfoId = dog.id 
    getDogInfoDiv.innerHTML = ""

    let img = document.createElement("img")
    img.src = dog.image

    let subHeader = document.createElement("h2")
    subHeader.innerText = dog.name

    let button = document.createElement("button")
    if (dog.isGoodDog === true) {
        button.innerText = "Good Dog!"
    } else button.innerText = "Bad Dog!"
    button.addEventListener("click", () => {
        goodDogGoneBad(button) //when the button is clicked, it's not making a new fetch request
    })

    getDogInfoDiv.append(img, subHeader, button)
}

function goodDogGoneBad(button) {
    dogId = event.target.parentElement.dataset.dogInfoId
    
    let tru = true 

    if (button.innerText === "Good Dog!") {
        button.innerText = "Bad Dog!" 
        tru = !true 
    } else button.innerText = "Good Dog!"

    let data = {
        isGoodDog: tru
    }
    
    let configObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    fetch(`${url}/${dogId}`, configObj)
        .then(resp => resp.json())
        .then(changedDog => updatedfilterDogs(changedDog))
}

function filterDogs() {
    if (dogFilter().innerText === "Filter good dogs: OFF"){
        dogFilter().innerText = "Filter good dogs: ON"
        getDogBar().innerHTML = ""
        fetchGoodDogs()
    } else {
        dogFilter().innerText = "Filter good dogs: OFF"
        getDogBar().innerHTML = ""
        fetchDogs()
    }
}

function updatedfilterDogs() {
    if (dogFilter().innerText === "Filter good dogs: OFF") {
        getDogBar().innerHTML = ""
        fetchDogs()
    } else {
        getDogBar().innerHTML = ""
        fetchGoodDogs()
    }
}
  
function fetchGoodDogs() {
    fetch(url)
        .then(resp => resp.json())
        .then(dogArray => dogArray.forEach(dog => {
            if (dog.isGoodDog === true){
            renderDog(dog)
            }
        }))
}