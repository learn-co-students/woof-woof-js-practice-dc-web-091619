const dog_info = document.getElementById('dog-info')
const dog_bar = document.getElementById('dog-bar');
const filter = document.getElementById('good-dog-filter');
filter.addEventListener('click', () => {
    filterGoodBoys(puppies())
})

document.addEventListener('DOMContentLoaded', () => {
   puppies().then(pups => pups.forEach(pup => renderPups(pup))) 
})

function puppies() {
    return fetch('http://localhost:3000/pups')
    .then(response => response.json())
}

function renderPups (pup) {
    const pup_name = document.createElement('span');
    pup_name.innerText = pup.name;
    dog_bar.appendChild(pup_name)
    pup_name.addEventListener('click', () => {
        fetchOnePup(pup)
        .then(function(response) {
        return response.json()
    })
    .then(pupz => dogInfo(pupz))
    })

}

function fetchOnePup(pup) {
    return fetch(`http://localhost:3000/pups/${pup.id}`)
}

function dogInfo(pup) {
    dog_info.innerHTML = ""
    const img = document.createElement('img');
    const dog_name = document.createElement('h2');
    const button = document.createElement('button');
    button.addEventListener('click', () => {
        fetchOnePup(pup)
        .then(response => response.json())
        .then(pup => toggle(pup, button));
    });
    img.src = pup.image;
    dog_name.innerText = pup.name;
    if (pup.isGoodDog) {
        button.innerText = "Bad Dog!"
    } else {
        button. innerText = "Good Dog!"
    }
    dog_info.appendChild(img);
    dog_info.appendChild(dog_name);
    dog_info.appendChild(button);
}

function toggle(pup, button) {
    const new_val = !pup.isGoodDog;
    const configObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            isGoodDog: new_val
        })
    }
    fetch(`http://localhost:3000/pups/${pup.id}`, configObj)
    changeButton(button)
}

function changeButton (button) {
    if (button.innerText === "Good Dog!") {
        button.innerText = "Bad Dog!"
    } else {
        button.innerText = "Good Dog!"
    }
}

function filterGoodBoys(puppies) {
    dog_bar.innerText = " "
    if (event.target.innerText.split(" ")[3] === 'OFF') {
        event.target.innerText = "Filter good dogs: ON"
        puppies.then(puppies => puppies.forEach(pup => {
           if (pup.isGoodDog) {
                renderPups(pup)
           }}))} else {
            event.target.innerText = "Filter good dogs: OFF";
            puppies.then(puppies => puppies.forEach(pup => renderPups(pup)))
    }
}
