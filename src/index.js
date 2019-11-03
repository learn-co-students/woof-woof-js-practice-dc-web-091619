document.addEventListener("DOMContentLoaded",()=>{
    fetch(`http://localhost:3000/pups`)
    .then(response=>response.json())
    .then(dogObjs=> {
        dogObjs.forEach(dogObj=>{
            renderDog(dogObj)
        })
    })

    goodDogFilterButton().addEventListener("click", goodDogFilter)

})

function goodDogFilterButton(){
    return document.getElementById("good-dog-filter")
}

function dogBar (){
    return document.getElementById("dog-bar")
}

function dogInfo(){
    return document.getElementById("dog-info")
}

function fetchDogs(){
    let spanId = event.currentTarget.id.split("-")[1]
    fetch(`http://localhost:3000/pups/${spanId}`)
    .then(response=>response.json())
    .then(dogObj=> displayInfo(dogObj))
}

function renderDog(dogObj){
    const dog = document.createElement("SPAN")
    dog.id = `dog-${dogObj.id}`
    dog.addEventListener("click", fetchDogs)

    dog.innerText= dogObj.name
    dogBar().append(dog)
}

function displayInfo(dog){
    dogInfo().innerHTML=""

    const headerName = document.createElement("h2")
    headerName.id= dog.id
    headerName.innerText= dog.name

    const image = document.createElement("img")
    image.src = dog.image

    const button = document.createElement("button")
    button.addEventListener("click", toggleButton)
    if (dog.isGoodDog){
        button.innerText="Good Dog!"
    } else if (!dog.isGoodDog){
        button.innerText="Bad Dog!"
    }
    dogInfo().append(headerName, image, button)
}

function toggleButton(event){
    let button = document.querySelector("#dog-info button")

    let newDogAdj = toggleDogBoolean(button.innerText)
    let newButtonText = toggleDogButton(newDogAdj)

    button.innerText= newButtonText

    let dogId = dogInfo().getElementsByTagName("h2")[0].id

    const configObj = {
        method: "PATCH",
        headers: {
            "Content-type":"application/json",
            "Accept":"application/json"
        },
        body:JSON.stringify({isGoodDog: newDogAdj})
    }
    fetch(`http://localhost:3000/pups/${dogId}`, configObj)
}

function toggleDogBoolean(goodBadDog){
    switch(goodBadDog) {
        case "Good Dog!":
          return false
        case "Bad Dog!":
          return true
      }
}

function toggleDogButton(goodBadDog){
    switch(goodBadDog){
        case true:
          return "Good Dog!"
        case false:
          return "Bad Dog!"
      }
}

/////bonus AHHHHHHHHH OMGGGGGGGGGGGGG AHHHHHHHHHHHHH///////

function goodDogFilter(event){
    event.preventDefault();

    while (dogBar().firstChild){
        dogBar().firstChild.remove()
    }
    
    fetch(`http://localhost:3000/pups`)
    .then(response=>response.json())
    .then(dogObjs=> {
        dogObjs.filter(dog=>{
            dog.
        })
    })
}