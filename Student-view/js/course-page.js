"use strict";

window.addEventListener("load", loadContent);
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

async function getJson() {
    const res = await fetch('js/json/courses.json');
    const data = await res.json();
    console.log(data);
    return data;
}
getJson().then(data => {
    console.log(data);
    const course = data.find(course => course.course_id == id);
    console.log(course);
    document.querySelector('.title').innerHTML = course.course_name;


    const card_name = document.querySelector("#card_content");
    card_name.innerHTML = "";
    const template = document.querySelector("#templateTwo");


    course.course_tittle.forEach((element, i) => {
        console.log(element);
        console.log(i);

        const clone = template.cloneNode(true).content; // clone the template
        clone.querySelector(".card_title").textContent = element;
        if ([i] == 0) {
            clone.querySelector(".card_content_des").textContent = course.course_tittle1_des;
            clone.querySelector(".card_content_one_title").textContent = course.course_tittle1_first_content_title;
            clone.querySelector(".card_content_one_title_1").textContent = course.course_tittle1_second_content_title;
            const list_one = course.course_tittle1_first_content_des_content.forEach((element, i) => {
                let divItem = ` <div ">
                                                <div>${element}</div>
                                             </div>`;
                clone.querySelector(".card_content_one_list").innerHTML += divItem;

            });
            const list_one_1 = course.course_tittle1_second_content_des_content.forEach((element, i) => {
                let divItem = ` <div ">
                                                <div>${element}</div>
                                             </div>`;
                clone.querySelector(".card_content_one_list_1").innerHTML += divItem;

            });

        }
        if ([i] == 1) {
            clone.querySelector(".card_content_des_2").textContent = course.course_tittle2_des;


        }
        if ([i] == 2) {
            clone.querySelector(".card_content_des_3").textContent = course.course_tittle3_des;

        }


        card_name.appendChild(clone);


    });


});



// toolip
$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();   
});