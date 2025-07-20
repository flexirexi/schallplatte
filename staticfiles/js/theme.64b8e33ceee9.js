import { collapseNavBar } from "/static/main/js/base.js";

const html = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector("i");
const savedTheme = localStorage.getItem("theme") || "dark";
console.log(savedTheme);

html.setAttribute("theme", savedTheme);
themeIcon.classList.add(savedTheme === "light" ? "fa-moon" : "fa-sun");

document.addEventListener("DOMContentLoaded", () => {
    themeToggle.addEventListener("click", toggler);

});

function toggler() {
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = themeToggle.querySelector("i");
    const html = document.documentElement;

    const newTheme = html.getAttribute("theme") === "dark" ? "light" : "dark";
    html.setAttribute("theme", newTheme);
    localStorage.setItem("theme", newTheme);

    // change icon
    themeIcon.classList.remove("fa-moon", "fa-sun");
    themeIcon.classList.add(newTheme === "dark" ? "fa-sun": "fa-moon");
    collapseNavBar();
}