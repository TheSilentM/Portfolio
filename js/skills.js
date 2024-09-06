import { skills } from "../js/arrays.js";

for (let skill in skills.imageUrl) {
    const getDiv = document.getElementById("skills");
    const img = document.createElement("IMG");
    img.setAttribute('class', 'skills-images');
    img.src = skill.imageUrl;
    img.alt = skill.name;
    getDiv.appendChild(img);
}