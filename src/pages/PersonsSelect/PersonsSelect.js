document.addEventListener("DOMContentLoaded", () => {
    let process = localStorage.getItem("process");


    if (!process) {
        const p = (window.location.pathname || "").toLowerCase();

        if (p.includes("personscivil") || p.includes("/civil/")) process = "civil";
        if (p.includes("personsadministrative") || p.includes("/administrative/")) process = "administrative";
        if (p.includes("personscriminal") || p.includes("/criminal/")) process = "criminal";
    }

    if (!process) {
        location.href = new URL("../../Home/index.html", window.location.href).href;
        return;
    }

    const MANUAL_PAGES = {
        civil: "../../Manual/Civil/index.html",
        administrative: "../../Manual/Administrative/index.html",
        criminal: "../../Manual/Criminal/index.html",
    };

    const target = MANUAL_PAGES[process];
    if (!target) return;

    const cards = document.querySelectorAll(".level-list__cards .card, .card-section__flex .card");
    if (!cards.length) return;

    cards.forEach((card) => {
        card.addEventListener("click", () => {
            const personName = card.querySelector(".card__title")?.textContent?.trim();
            if (personName) localStorage.setItem("personName", personName);

            location.href = new URL(target, window.location.href).href;
        });
    });
});
