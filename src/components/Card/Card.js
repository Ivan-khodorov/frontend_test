export function initCard() {
    const home = document.querySelector(".home");
    const levelBlock = document.getElementById("level-block");
    const backBtn = document.getElementById("level-back");

    const processCards = [...document.querySelectorAll(".process-card[data-process]")];
    const levelCards = [...document.querySelectorAll(".level-card[data-level]")];

    if (!home || !levelBlock || processCards.length === 0) return;

    const isNarrow = () => window.matchMedia("(max-width: 1439px)").matches;

    const selectOne = (cards, activeCard) => {
        cards.forEach(c => c.classList.remove("is-selected"));
        activeCard.classList.add("is-selected");
    };

    const showLevels = () => {
        levelCards.forEach(c => c.classList.remove("is-selected"));
        levelBlock.classList.remove("is-hidden");

        home.classList.toggle("is-level-only", isNarrow());
    };

    const showProcesses = () => {
        home.classList.remove("is-level-only");
        levelBlock.classList.add("is-hidden");
    };

    processCards.forEach(card => {
        card.addEventListener("click", () => {
            selectOne(processCards, card);
            localStorage.setItem("selectedProcess", card.dataset.process);
            showLevels();
        });
    });

    levelCards.forEach(card => {
        card.addEventListener("click", () => {
            selectOne(levelCards, card);
            localStorage.setItem("selectedLevel", card.dataset.level);
        });
    });

    backBtn?.addEventListener("click", showProcesses);

    window.addEventListener("resize", () => {
        const hasSelectedProcess = processCards.some(c => c.classList.contains("is-selected"));
        if (!hasSelectedProcess) {
            home.classList.remove("is-level-only");
            return;
        }
        if (!levelBlock.classList.contains("is-hidden")) {
            home.classList.toggle("is-level-only", isNarrow());
        }
    });
}
