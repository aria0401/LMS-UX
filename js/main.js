
"use strict";

const url = "js/json/";

//Function called from single-page.html
async function getAllEndpoints(endpoints, callback) {
    const endpointsArray = endpoints.map(key => url + key + ".json");
    const dataArray = await Promise.all(endpointsArray.map((endpoint) => fetch(endpoint)
     .then((response) => response.json())
     ));
     callback(dataArray);
};

function getSidebarList(dataArray){

    const assignmentsWrapper = document.querySelector("#articles .assignmentsList");
    const coursesWrapper = document.querySelector("#articles .coursesList");
    displayList(dataArray[0], assignmentsWrapper);
    displayList(dataArray[1], coursesWrapper);
    
};


function displayList(dataArray, contentWrapper){

    contentWrapper.innerHTML = "";
    const template = document.querySelector("template");
    dataArray.forEach((elm) => {
            const clone = template.cloneNode(true).content; 
            clone.querySelector(".name").textContent = elm.name; 
            contentWrapper.appendChild(clone); 
    });
};


function  getPDF(urlParams){
    console.log(urlParams);
    const course = urlParams.get("course");
    const pdfName = urlParams.get("name");
    const api = urlParams.get("api");
    document.querySelector("iframe").src = `pdf/${pdfName}`;

    let endpoint;
    api == "assignments" ? endpoint = "js/json/assignments.json" : null;
    // api == "resources" ? endpoint = "js/json/resources.json" : null;

    getJson();

    async function getJson(){
        const res = await fetch(endpoint);
        const data = await res.json();
        const pdfTitle = data.filter(e => e.pdf == pdfName)[0].name;
        document.querySelector(".title").textContent = pdfTitle;
    
    }
};
