const PUPS_URL = "http://localhost:3000/pups"

document.addEventListener("DOMContentLoaded", () => {
  const filterBtn = document.querySelector('#good-dog-filter')
  filterBtn.addEventListener("click", filterDoggos)

  fetchAllDoggos();
});


doggoBtnStates = {
  true: "Good Dog!",
  false: "Bad Dog!"
}

doggoGoodStates = {
  "true" : "false",
  "false" : "true"
}

filterBtnStates = {
  "Filter good dogs: OFF" : "Filter good dogs: ON",
  "Filter good dogs: ON" : "Filter good dogs: OFF"
}

function fetchAllDoggos(){
  fetch(PUPS_URL)
    .then( response => response.json() )
    .then( doggosArray => doggosArray.forEach(
      doggo => renderAllDoggos(doggo)
    ) )
}

function renderAllDoggos(doggo){
  let allDoggosDiv = document.querySelector('#dog-bar')

  let doggoSpan = document.createElement('span')
  doggoSpan.dataset.doggoId = doggo.id
  doggoSpan.innerText = doggo.name
  doggoSpan.addEventListener('click', fetchThisDoggo)

  allDoggosDiv.append(doggoSpan)
}

function fetchThisDoggo(){
  let doggoId = event.currentTarget.dataset.doggoId

  fetch(`${PUPS_URL}/${doggoId}`)
    .then( response => response.json() )
    .then( doggo => renderThisDoggo(doggo) )
}

function renderThisDoggo(doggo){
  let doggoInfoDiv = document.querySelector('#dog-info')
  doggoInfoDiv.innerHTML = ""

  let doggoImage = document.createElement('img')
  doggoImage.src = doggo.image

  let doggoName = document.createElement('h2')
  doggoName.innerText = doggo.name

  let doggoBtn = document.createElement('button')
  doggoBtn.dataset.doggoId = doggo.id
  doggoBtn.dataset.isGood = doggo.isGoodDog
  doggoBtn.innerText = doggoBtnStates[doggo.isGoodDog]
  doggoBtn.addEventListener('click', updateDoggo)

  doggoInfoDiv.append(doggoImage, doggoName, doggoBtn)
}

function updateDoggo(){
  let doggoBtn = event.currentTarget
  let doggoId = doggoBtn.dataset.doggoId
  
  let newIsGood = doggoGoodStates[doggoBtn.dataset.isGood]

  let data = {
    isGoodDog: newIsGood
  }
  
  fetch(`${PUPS_URL}/${doggoId}`, {
    method: "PATCH",
    headers: {
      "Content-Type" : "application/json",
    },
    body: JSON.stringify(data)
  }).then( response => response.json() )
    .then( updatedDoggo => renderThisDoggo(updatedDoggo) )
}

function filterDoggos(){
  let allDoggosDiv = document.querySelector('#dog-bar')
  allDoggosDiv.innerHTML = ""

  let filterBtn = event.currentTarget
  let currentText = filterBtn.innerText

  if (currentText === "Filter good dogs: OFF"){
    fetchGoodDoggos()
  } else {
    fetchAllDoggos()
  }

  filterBtn.innerText = filterBtnStates[currentText]
}

function fetchGoodDoggos(){
  fetch(PUPS_URL)
    .then( response => response.json() )
    .then( doggosArray => doggosArray.forEach(
      doggo => renderGoodDoggos(doggo)
    ) )
}

function renderGoodDoggos(doggo){
  if (doggo.isGoodDog === "true"){
    let allDoggosDiv = document.querySelector('#dog-bar')
    
    let doggoSpan = document.createElement('span')
    doggoSpan.dataset.doggoId = doggo.id
    doggoSpan.innerText = doggo.name
    doggoSpan.addEventListener('click', fetchThisDoggo)
  
    allDoggosDiv.append(doggoSpan)
  }
}