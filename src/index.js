//global variable that will keep track of all dogs
var allDogs = [];

document.addEventListener("DOMContentLoaded", () => {
    console.log('connected')

    fetch('http://localhost:3000/pups')
    .then(response => response.json())
    .then(function(dogs){
        dogs.forEach(function(dog){
            renderDogSpan(dog);
            allDogs.push(dog); //pushes all dogs into the global array;
        })
    });

    const filterButton = document.getElementById('good-dog-filter');
    filterButton.addEventListener('click', filterGoodDogs);
})


function renderDogSpan(dog){
    const dogBar = document.querySelector('#dog-bar'); //container for the spans
    let dogSpan = document.createElement('span')  //creating span for individual dog
    
    dogSpan.innerText = dog.name //adding the dog name to the spans inner text
    dogSpan.id = `dog-${dog.id}` //adding ID incase I need to use it later on

    dogSpan.addEventListener('click', renderDogInfo)

    dogBar.appendChild(dogSpan);        //appending the span to the container
}

function renderDogInfo(event){
    const allDogContainer = document.querySelector('#dog-info');
    allDogContainer.innerText = "" // <---- acts as resetting the body of the page
    const dogContainer = document.createElement('div')
    dogContainer.classList.add('card', 'blue-grey', 'darken-1');
    dogContainer.id = this.id //setting a unique id for every card for better use.

    let dogImg = document.createElement('img');
    let dogName = document.createElement('h2');
    dogName.classList.add('card-title');

    let dogButton = document.createElement('button');
    dogButton.classList.add('waves-effect', 'waves-light', 'btn', 'button-style');
    dogButton.addEventListener('click', changeDogStatus);

    const dogID = this.id.split("-")[1];

    //setting the info for all the attributes created. And fetching the information.
    fetch(`http://localhost:3000/pups/${dogID}`)
    .then(response => response.json())
    .then(function(dog){
        dogImg.srcset = dog.image;
        dogName.innerText = dog.name;
        dogButton.innerText = goodOrBad(dog.isGoodDog);
    });

   
    //appending everything to the dog container;
    dogContainer.appendChild(dogImg);
    dogContainer.appendChild(dogName);
    dogContainer.appendChild(dogButton)

    allDogContainer.appendChild(dogContainer);
}


function goodOrBad(dogStatus){
    console.log(dogStatus);
    if (dogStatus) {
        return 'Good Dog!'
    } else {
        return 'Bad Dog!'
    }
}

function changeDogStatus(){
    let dogToUpate = this.parentElement.id.split("-")[1];
    
    fetch(`http://localhost:3000/pups/${dogToUpate}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            isGoodDog: switchBehavior(this.innerText)
        })
    })
    .then(response => response.json())
    .then(function(dog){
        updateDogDom(dog);
    });
}

function switchBehavior(dogStatus){
    if (dogStatus === "GOOD DOG!") {
        return false;
    } else if (dogStatus === "BAD DOG!") {
        return true;
    }
}

function updateDogDom(dog){
    let dogCard = document.querySelector(`.btn`);
    if (dogCard.innerText === "GOOD DOG!"){
        dogCard.innerText = "BAD DOG!"
    } else if (dogCard.innerText === "BAD DOG!"){
        dogCard.innerText = "GOOD DOG!"
    }
}


function filterGoodDogs(){
    console.log('filtered button hit')
    let filterOption = event.target.innerText.split(':')[1]
    const dogBar = document.querySelector('#dog-bar');
    
    if (filterOption === " OFF"){
        event.target.innerText = "Filter good dogs: ON"
        let goodDogArray = allDogs.filter(function(dog){
            return dog.isGoodDog === true;
        })
    
        dogBar.innerText = ""   //reset the span
    
        goodDogArray.forEach(function(dog){
            renderDogSpan(dog)
        });
    } else {
        event.target.innerText = "Filter good dogs: OFF"
        filterAllDogs();
    }
}

function filterAllDogs(){
    const dogBar = document.querySelector('#dog-bar');
    dogBar.innerText = ""   //reset the span
    

    allDogs.forEach(function(dog){
        renderDogSpan(dog);
    })

}