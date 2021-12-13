"use strict";

window.addEventListener("load", loadContent);
let coursesArray = [];

async function loadContent() {
    const response = await fetch("js/json/courses.json");
    coursesArray = await response.json();
    displayContent();
}

function displayContent() {
    const course_name = document.querySelector("#courses_name");
    course_name.innerHTML = "";
    const template = document.querySelector("#templateOne");

    coursesArray.forEach((elm) => {


        const clone = template.cloneNode(true).content; // clone the template
        clone.querySelector(".course-title").textContent = elm.course_name;
        clone.querySelector("#svg-icons").src = "img/" + elm.course_img;
        clone.querySelector("#svg-icons").alt = `Image of ${elm.course_name} course`;
        const a = clone.querySelector("#aTag > a");
        if (a) {
            a.href = `courses-page.html?id=${elm.course_id}`;
        }

        course_name.appendChild(clone);


    });
}