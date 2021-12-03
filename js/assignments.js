"use strict";

window.addEventListener("load", loadContent);
let filter = "all";
let dataArray = [];

document.querySelectorAll("#layout div").forEach(div =>{
    div.addEventListener("click", ()=>{
        
        if(div.dataset.layout == "card"){
            document.querySelector("#articles").classList.add("card-view");
            document.querySelector("#dropdownMenuButton span").textContent = "Card";
        }else{
            document.querySelector("#articles").classList.remove("card-view");
            document.querySelector("#dropdownMenuButton span").textContent = "List";
        }
    })
})

async function loadContent(){
    const response = await fetch("js/json/assignments.json");
    dataArray = await response.json();
    displayContent();
}

// Filter courses on desktop
document.querySelectorAll(".filter-wrapper .filter").forEach(btn =>{
   
    btn.addEventListener("click", ()=>{
        filter = event.target.dataset.filter;
        displayContent();
    })
});

// Filter courses on mobile
document.querySelectorAll("#filter-list .filter").forEach(btn =>{
   
    btn.addEventListener("click", ()=>{
        filter = event.target.dataset.filter;
        let textContent = "Course Name";
        filter == "database" ? textContent =  "Database" : null;
        filter == "user-experience" ? textContent =  "User Experience" : null;
        filter == "web-development" ? textContent = "Web Development" : null;
     
        document.querySelector("#dropdownMenuButtonFilter span").textContent = textContent;
        displayContent();
    })
});


function displayContent(){

   
    const contentWrapper = document.querySelector("#articles");
    contentWrapper.innerHTML = "";
    const template = document.querySelector("template");

    dataArray.forEach((elm) => {
        if(filter == "all" || filter == elm.course){

            const clone = template.cloneNode(true).content; 

            clone.querySelector(".img").src = "img/"+ elm.img;
            clone.querySelector(".img").alt = `Image of ${elm.course} course`;
            clone.querySelector(".name").textContent = elm.name;
            clone.querySelector(".deadline").textContent = elm.deadline;
            if(elm.sent){
                clone.querySelector(".status").textContent = "completed";  
                clone.querySelector(".status-icon").src = "img/i-sent-icon.svg";
            }
            else{
                clone.querySelector(".status").textContent = "pending";  
                clone.querySelector(".status-icon").src = "img/i-not-sent-icon.svg";
    
            }
    
            contentWrapper.appendChild(clone); 
        }
   
    });
}

