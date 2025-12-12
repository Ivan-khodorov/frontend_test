(function () {
    const LABELS = { ru: "Рус", kk: "Қаз" };

    function initLangSwitch(root) {
        const button = root.querySelector(".lang-switch__button");
        const labelEl = root.querySelector(".lang-switch__label");
        const items = Array.from(root.querySelectorAll(".lang-switch__item"));

        if (!button || !labelEl || items.length === 0) return;

        function isOpen() {
            return root.classList.contains("is-open");
        }

        function setOpen(open) {
            root.classList.toggle("is-open", open);
            button.setAttribute("aria-expanded", String(open));
        }

        function setCurrent(code) {
            root.dataset.lang = code;
            labelEl.textContent = LABELS[code] || code;

            items.forEach((item) => {
                const selected = item.dataset.lang === code;
                item.classList.toggle("is-selected", selected);
                item.setAttribute("aria-selected", String(selected));
            });

            root.dispatchEvent(
                new CustomEvent("languageChange", {
                    detail: { lang: code },
                    bubbles: true,
                })
            );
        }

        button.addEventListener("click", (e) => {
            e.stopPropagation();
            setOpen(!isOpen());
        });

        root.querySelector(".lang-switch__list").addEventListener("click", (e) => {
            const item = e.target.closest(".lang-switch__item");
            if (!item) return;

            const code = item.dataset.lang;
            if (!code) return;

            setCurrent(code);
            setOpen(false);
        });

        document.addEventListener("click", (e) => {
            if (!root.contains(e.target)) setOpen(false);
        });

        const initial = root.dataset.lang || "ru";
        setCurrent(initial);
    }

    document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll(".lang-switch").forEach(initLangSwitch);
    });
})();
