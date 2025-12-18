document.addEventListener("DOMContentLoaded", () => {
    const process = localStorage.getItem("process");
    const level = localStorage.getItem("level");

    if (!process || !level) {
        location.href = new URL("../../Home/index.html#Home", window.location.href).href;
        return;
    }

    const input =
        document.querySelector(".categories__search-input") ||
        document.querySelector('input[type="text"][placeholder]');

    if (!input) return;

    const desktopText =
        input.dataset.placeholderDesktop ||
        "Введите ключевые слова (например: трудовые споры, наследство)";

    const mobileText =
        input.dataset.placeholderMobile ||
        "Введите ключевые слова";

    const mq = window.matchMedia("(max-width: 780px)");

    const applyPlaceholder = () => {
        input.placeholder = mq.matches ? mobileText : desktopText;
    };

    applyPlaceholder();

    if (typeof mq.addEventListener === "function") {
        mq.addEventListener("change", applyPlaceholder);
    } else {
        mq.addListener(applyPlaceholder);
    }
});
