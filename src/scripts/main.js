import "../styles/main.scss";
import homeHtml from "bundle-text:../pages/Home/Home.html";
import documentsHtml from "bundle-text:../pages/Documents/Documents.html";
import levelSelectHtml from "bundle-text:../pages/LevelSelect/LevelSelect.html";
import personsSelectHtml from "bundle-text:../pages/PersonsSelect/PersonsSelect.html";
import processCategoriesHtml from "bundle-text:../pages/ProcessCategories/ProcessCategories.html";

function initState() {
    window.appState = {
        selectedProcess: localStorage.getItem("selectedProcess"),
        currentStep: 1,
        userData: {},
    };
}

const routes = {
    home: homeHtml,
    documents: documentsHtml,
    level: levelSelectHtml,
    persons: personsSelectHtml,
    "process-categories": processCategoriesHtml,
};

function renderPage(name) {
    const root = document.getElementById("app-main");
    if (!root) return;

    root.innerHTML = routes[name] || routes.home;
}

function getRoute() {
    return location.hash.slice(1) || "home";
}

function router() {
    renderPage(getRoute());
}

document.addEventListener("DOMContentLoaded", () => {
    initState();
    router();
    window.addEventListener("hashchange", router);
});
