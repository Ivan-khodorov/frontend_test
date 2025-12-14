export function initInfoSection() {
    const home = document.querySelector(".home");
    const levelBlock = document.getElementById("level-block");
    const backBtn = document.getElementById("level-back");
    const processCards = document.querySelectorAll(".info-card[data-block-id]");
    const levelCards = document.querySelectorAll(".level-card[data-level]");

    if (!home || !levelBlock || processCards.length === 0) return;

    const isNarrow = () => window.matchMedia("(max-width: 1439px)").matches;

    const showLevels = () => {
        levelBlock.classList.remove("is-hidden");
        if (isNarrow()) {
            home.classList.add("is-level-only");
            levelBlock.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const showProcesses = () => {
        home.classList.remove("is-level-only");
        levelBlock.classList.add("is-hidden");
        const title = document.querySelector(".home__title");
        if (title) title.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    processCards.forEach((card) => {
        card.addEventListener("click", () => {
            processCards.forEach((c) => c.classList.remove("is-selected"));
            card.classList.add("is-selected");
            showLevels();
        });
    });

    levelCards.forEach((card) => {
        card.addEventListener("click", () => {
            levelCards.forEach((c) => c.classList.remove("is-selected"));
            card.classList.add("is-selected");
        });
    });

    if (backBtn) {
        backBtn.addEventListener("click", showProcesses);
    }

    window.addEventListener("resize", () => {
        const hasSelectedProcess = Array.from(processCards).some((c) =>
            c.classList.contains("is-selected")
        );

        if (!hasSelectedProcess) {
            home.classList.remove("is-level-only");
            return;
        }

        if (!isNarrow()) {
            home.classList.remove("is-level-only");
            levelBlock.classList.remove("is-hidden");
        }
    });
}
