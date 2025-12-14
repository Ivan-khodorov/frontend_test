import "../styles/main.scss";

import homeHtml from "bundle-text:../pages/Home/Home.html";
import processListHtml from "bundle-text:../components/ProcessList/ProcessList.html";
import levelSelectorHtml from "bundle-text:../components/LevelSelector/LevelSelector.html";
import personsSelectorHtml from "bundle-text:../components/PersonsSelector/PersonsSelector.html";

import { initCard } from "../components/Card/Card";

function initState() {
    window.appState = {
        selectedProcess: localStorage.getItem("selectedProcess"),
        currentStep: 1,
        userData: {},
    };
}

const routes = {
    home: homeHtml,
};

function renderPage(name) {
    const root = document.getElementById("app-main");
    if (!root) return;

    root.innerHTML = routes[name] || routes.home;
}

function getRoute() {
    return location.hash.slice(1) || "home";
}

function mountHomeComponents() {
    const processSlot = document.getElementById("process-slot");
    const levelSlot = document.getElementById("level-slot");
    const personsSlot = document.getElementById("persons-slot");

    if (processSlot) processSlot.innerHTML = processListHtml;
    if (levelSlot) levelSlot.innerHTML = levelSelectorHtml;
    if (personsSlot) personsSlot.innerHTML = personsSelectorHtml;

    initCard();
}

function router() {
    const route = getRoute();
    renderPage(route);

    if (route === "home") {
        mountHomeComponents();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    initState();
    router();
    window.addEventListener("hashchange", router);
});
