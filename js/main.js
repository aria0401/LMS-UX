
"use strict";

const url = "js/json/";
let filter = "all";
let dataArray = [];

//SELECT THE LAYOUT OPTION
document.querySelectorAll("#layout div").forEach(div =>{
    div.addEventListener("click", ()=>{
        
        if(div.dataset.layout == "card"){
            document.querySelector("#articles").classList.add("card-view");
            document.querySelector("#articles").classList.remove("list-view");
            document.querySelector("#dropdownMenuButton span").textContent = "Card";
        }else{
            document.querySelector("#articles").classList.remove("card-view");
            document.querySelector("#articles").classList.add("list-view");
            document.querySelector("#dropdownMenuButton span").textContent = "List";
        }
    })
})

// FILTER COURSES ON DESKTOP
document.querySelectorAll(".filter-wrapper .filter").forEach(btn =>{
   
    btn.addEventListener("click", ()=>{
        filter = event.target.dataset.filter;
        displayMainList();
    })
});


//FILTER COURSES ON MOBILE
document.querySelectorAll("#filter-list .filter").forEach(btn =>{
   
    btn.addEventListener("click", ()=>{
        filter = event.target.dataset.filter;
        let textContent = "Course Name";
        filter == "database" ? textContent =  "Database" : null;
        filter == "user-experience" ? textContent =  "User Experience" : null;
        filter == "web-development" ? textContent = "Web Development" : null;
     
        document.querySelector("#dropdownMenuButtonFilter span").textContent = textContent;
        displayMainList();
       
    })
});

//FETCH ARRAY OF ENDPOINTS
async function loadContent(endpoint, callback){
    const response = await fetch(url + endpoint + ".json");
    dataArray = await response.json();
    callback();
}

//DISPLAY MAIN CONTENT - LIST OF ASSIGNMENTS OR RESOURCES
function displayMainList(){

   
    const contentWrapper = document.querySelector("#articles");
    contentWrapper.innerHTML = "";
    const template = document.querySelector("template");

    dataArray.forEach((elm) => {
        if(filter == "all" || filter == elm.course){

            const clone = template.cloneNode(true).content;

            clone.querySelector(".img").src = "img/"+ elm.img;
            clone.querySelector(".img").alt = `Image of ${elm.course} course`;
            clone.querySelector(".name").textContent = elm.name;
            elm.deadline ? clone.querySelector(".deadline").textContent = "Deadline: " + elm.deadline : null;
            elm.description ? clone.querySelector(".description").textContent = elm.description : null;

        
                if(elm.sent === true){
                    clone.querySelector(".status").textContent = "completed";  
                    clone.querySelector(".status-icon").src = "img/i-sent.svg";
                }
                else if(elm.sent === false){
                    clone.querySelector(".status").textContent = "pending";  
                    clone.querySelector(".status-icon").src = "img/i-not-sent.svg";
        
                }

                if(elm.status === true){
                    clone.querySelector(".status").textContent = "Active";  
                    clone.querySelector(".status-icon").src = "img/i-sent.svg";
                }
                else if(elm.status === false){
                    clone.querySelector(".status").textContent = "Inactive";  
                    clone.querySelector(".status-icon").src = "img/i-not-sent.svg";
        
                }
          

            clone.querySelector("article").addEventListener("click", ()=>{
                location.href = `single-page.html?course=${elm.course}&name=${elm.pdf}&api=${elm.endpoint}`;
            })
    
            contentWrapper.appendChild(clone); 
        }
   
    });
}

//GET DATA FOR THE LIST OF ASSIGNMENTS AND RESOURCES ON SIDEBAR
async function getAllEndpoints(endpoints, callback) {
    const endpointsArray = endpoints.map(key => url + key + ".json");
    const dataArray = await Promise.all(endpointsArray.map((endpoint) => fetch(endpoint)
     .then((response) => response.json())
     ));
     callback(dataArray);
};

//PREPARE DATA FOR THE LIST OF ASSIGNMENTS AND RESOURCES ON SIDEBAR
function getSidebarList(dataArray){

    const assignmentsWrapper = document.querySelector("#articles .assignmentsList");
    const coursesWrapper = document.querySelector("#articles .coursesList");
    displaySidebarList(dataArray[0], assignmentsWrapper);
    displaySidebarList(dataArray[1], coursesWrapper);
    
};

//DISPLAY LIST OF ASSIGNMENTS AND RESOURCES ON SIDEBAR
function displaySidebarList(dataArray, contentWrapper){

    contentWrapper.innerHTML = "";
    const template = document.querySelector("template");

    dataArray.forEach((elm) => {
        if(filter == "all" || filter == elm.course){
            const clone = template.cloneNode(true).content; 
            clone.querySelector(".name").textContent = elm.name; 

            clone.querySelector("article").addEventListener("click", ()=>{
                getPDF(elm.pdf, elm.endpoint);
            })
            contentWrapper.appendChild(clone); 
        }
    });
};

//GET URL PARAMS TO FIND THE SELECTED PDF
function getUrlParams(urlParams){
    const pdfName = urlParams.get("name");
    const api = urlParams.get("api");

    getPDF(pdfName, api);
}

//DISPLAY SINGLE PDF
function  getPDF(pdfName, api){
    document.querySelector("iframe").src = `pdf/${pdfName}`;

    let endpoint;
    api == "assignments" ? endpoint = "js/json/assignments.json" : null;
    api == "resources" ? endpoint = "js/json/resources.json" : null;

    getJson();

    async function getJson(){
        const res = await fetch(endpoint);
        const data = await res.json();
        const pdfTitle = data.filter(e => e.pdf == pdfName)[0].name;
        document.querySelector(".title").textContent = pdfTitle;
    
    }

    // api == "assignments" ?  document.querySelector("#sidebar ul li.assignments").classList.add("active") : null;
    // api == "resources" ?  document.querySelector("#sidebar ul li.resources").classList.add("active") : null;
   
};
