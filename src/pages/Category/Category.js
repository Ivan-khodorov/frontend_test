document.addEventListener("DOMContentLoaded", () => {
    const process = localStorage.getItem("process");
    const level = localStorage.getItem("level");

    if (!process || !level) {
        location.href = new URL("../../index.html", window.location.href).href;
        return;
    }

    const input =
        document.querySelector(".categories__search-input") ||
        document.querySelector('input[type="text"][placeholder]');

    if (input) {
        const desktopText =
            input.dataset.placeholderDesktop ||
            "Введите ключевые слова (например: трудовые споры, наследство)";
        const mobileText =
            input.dataset.placeholderMobile || "Введите ключевые слова";

        const mq = window.matchMedia("(max-width: 780px)");
        const applyPlaceholder = () => {
            input.placeholder = mq.matches ? mobileText : desktopText;
        };

        applyPlaceholder();
        if (typeof mq.addEventListener === "function") mq.addEventListener("change", applyPlaceholder);
        else mq.addListener(applyPlaceholder);
    }

    const PERSONS_PAGES = {
        civil: "../../PersonsSelect/Civil/index.html",
        administrative: "../../PersonsSelect/Administrative/index.html",
        criminal: "../../PersonsSelect/Criminal/index.html",
    };

    const cards = document.querySelectorAll(".categories__card");
    cards.forEach((card) => {
        card.addEventListener("click", () => {
            const categoryName = card.textContent.trim();

            localStorage.setItem("categoryName", categoryName);

            const target = PERSONS_PAGES[process];
            if (!target) return;

            location.href = new URL(target, window.location.href).href;
        });
    });
});
