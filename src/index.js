document.addEventListener("DOMContentLoaded", () => {

  document.getElementById("good-dog-filter").addEventListener("click", filterClicked)

  allDogsBar();

})

// for filter on/off
let filterOn = false;

function allDogsBar() {
fetch('http://localhost:3000/pups')
.then(response => response.json())
.then(dogsArray => dogsArray.forEach(dog => addDog(dog)))
}

function addDog(dog) {
  const dogBar = document.getElementById("dog-bar")
  const dogSpan = document.createElement("span")
  dogBar.appendChild(dogSpan)
  // each dog span
  dogSpan.innerText = dog.name
  dogSpan.id = `dog-${dog.id}`

  dogSpan.addEventListener("click", dogClicked)
}

function dogClicked(e) {
  const clickedDogSpan = e.target
  const clickedDogId = e.target.id.split('-')[1]
  fetch(`http://localhost:3000/pups/${clickedDogId}`)
  .then(res => res.json())
  .then(dogData => dogInfo(dogData))
}

function dogInfo(dogData) {
  const dogInfoDiv = document.getElementById("dog-info")
  dogInfoDiv.innerHTML = ""
  // add name, img, good/bad dog
  const dogName = document.createElement("h2")
  const dogImg = document.createElement("img")
  const dogButton = document.createElement("button")
  dogInfoDiv.append(dogName, dogImg, dogButton)

  dogName.innerText = dogData.name
  dogImg.src = dogData.image
  dogButton.innerText = dogData.isGoodDog ? "Good Dog!" : "Bad Dog!"
  dogButton.id = `dog-${dogData.id}`
  dogButton.addEventListener("click", dogButtonClicked)
}

function dogButtonClicked(e) {
  const clickedButton = e.target
  const clickedDogId = parseInt(e.target.id.split('-')[1], 10)
  if (clickedButton.innerText === "Good Dog!") {
    clickedButton.innerText = "Bad Dog!";
    changeDogStatus(clickedDogId, false);
  } else {
    clickedButton.innerText = "Good Dog!"
    changeDogStatus(clickedDogId, true);
  }
}

function changeDogStatus(clickedDogId, status) {
  fetch(`http://localhost:3000/pups/${clickedDogId}`, {method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "isGoodDog": status
    })
  })
  // .then(res => res.json())
  // .then(dogData => console.log(dogData))
}

function filterClicked(e) {
  const filterButton = e.target
  document.getElementById("dog-info").innerHTML = "";
  if (filterOn === false) {
    filterOn = !filterOn;
    filterButton.innerText = "Filter good dogs: ON";
    showDogsFiltered();
  } else {
    filterOn = !filterOn
    filterButton.innerText = "Filter good dogs: OFF";
    showDogsFiltered();
  }
}

function showDogsFiltered() {
  const filterButton = document.getElementById("good-dog-filter");
  document.getElementById("dog-bar").innerHTML = "";
  if (filterOn === false) {
    allDogsBar()
  } else {
    fetch("http://localhost:3000/pups")
    .then(res => res.json())
    .then(dogsData => dogsData.forEach((dog)=>{
      if (dog.isGoodDog) {addDog(dog)}})
    )
  }
}