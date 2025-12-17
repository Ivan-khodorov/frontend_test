document.addEventListener("DOMContentLoaded", () => {
    const app = document.querySelector(".app");
    const processCards = document.querySelectorAll(".process-card");
    const levelCards = document.querySelectorAll(".level-card");
    const backButton = document.getElementById("level-back");

    const setState = (state) => {
        app.dataset.state = state;
    };

    const selectCard = (cards, active) => {
        cards.forEach(c => c.classList.remove("is-selected"));
        active.classList.add("is-selected");
    };

    processCards.forEach(card => {
        card.addEventListener("click", () => {
            selectCard(processCards, card);
            localStorage.setItem("process", card.dataset.process);
            levelCards.forEach(c => c.classList.remove("is-selected"));
            setState("level");
        });
    });

    levelCards.forEach(card => {
        card.addEventListener("click", () => {
            selectCard(levelCards, card);
            localStorage.setItem("level", card.dataset.level);

            if (localStorage.getItem("process") === "civil") {
                location.href = "../Category/CategoriesCivil/index.html";
            }
        });
    });

    backButton.addEventListener("click", () => {
        setState("process");
        processCards.forEach(c => c.classList.remove("is-selected"));
        levelCards.forEach(c => c.classList.remove("is-selected"));
    });

    setState("process");
});
