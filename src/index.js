document.addEventListener("DOMContentLoaded", function(){
    renderAllDogs();

    let filter = document.getElementById("good-dog-filter");
    filter.addEventListener("click", filterDogs);    
})


function filterDogs(){

    if(event.target.innerText === "Filter good dogs: OFF"){
        event.target.innerText = "Filter good dogs: ON";
        renderGoodDogs();
    }else if(event.target.innerText === "Filter good dogs: ON"){
        event.target.innerText = "Filter good dogs: OFF";
        renderAllDogs();
    }

}

function renderAllDogs(){
    fetch('http://localhost:3000/pups')
        .then(response => response.json())
            .then(function(dogArray){
                let dogList = document.getElementById("dog-bar");
                dogList.innerHTML = "";

                dogArray.forEach(dog => {
                    let bar = document.getElementById("dog-bar");
                    
                    let span = document.createElement("span");
                    span.id = dog.id;
                    span.innerText = dog.name;

                    bar.append(span);

                    span.addEventListener("click", getDogById)
                });
            })
}

function renderGoodDogs(){
console.log("Rendering Good Boys")
    fetch('http://localhost:3000/pups')
    .then(response => response.json())
        .then(function(dogArray){

            let dogList = document.getElementById("dog-bar");
            dogList.innerHTML = "";
            
            dogArray.forEach(dog => {

                if(dog.isGoodDog){
                    let bar = document.getElementById("dog-bar");
                    
                    let span = document.createElement("span");
                    span.id = dog.id;
                    span.innerText = dog.name;
    
                    bar.append(span);
    
                    span.addEventListener("click", getDogById)
                }
            });
        })
}

function getDogById(){
    let id = event.target.id;
    console.log(id);
    fetch(`http://localhost:3000/pups/${id}`)
        .then(response => response.json())
            .then(function(dog){
                    let container = document.getElementById("dog-info");
                    container.innerHTML = "";
                    
                    let image = document.createElement("img");
                    image.src = dog.image;

                    let h2 = document.createElement("h2");
                    h2.innerText = dog.name;

                    let button = document.createElement("button");
                    if(dog.isGoodDog){
                        button.innerText = "Good Dog!";
                    }else{
                        button.innerText = "Bad Dog!";
                    }

                    container.append(image);
                    container.append(h2);
                    container.append(button);

                    button.addEventListener("click", function(){
                        if(event.target.innerText === "Good Dog!"){
                            event.target.innerText = "Bad Dog!";
                            updateDogById(id, false);
                        }else if(event.target.innerText === "Bad Dog!"){
                            event.target.innerText = "Good Dog!";
                            updateDogById(id, true);
                        }

                    })

            })
}
function updateDogById(id, update){
    console.log(id);
    console.log(update);
    fetch(`http://localhost:3000/pups/${id}`,{
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            isGoodDog: update
        })
    }).then(response => response.json())
        .then(function(){
            let filter = document.getElementById("good-dog-filter");
            if(filter.innerText === "Filter good dogs: ON"){
                renderGoodDogs();
            }
        })
}