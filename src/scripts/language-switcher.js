(function () {
    const LABELS = {
        ru: "Рус",
        kk: "Қаз",
    };

    function initLangSwitch(root) {
        const button = root.querySelector(".lang-switch__button");
        const labelEl = root.querySelector(".lang-switch__label");
        const list = root.querySelector(".lang-switch__list");
        const items = Array.from(root.querySelectorAll(".lang-switch__item"));

        if (!button || !labelEl || !list || items.length === 0) return;

        const isOpen = () => root.classList.contains("is-open");

        const setOpen = (open) => {
            root.classList.toggle("is-open", open);
            button.setAttribute("aria-expanded", String(open));
        };

        const setCurrent = (code) => {
            const lang = code === "kk" ? "kk" : "ru";

            root.dataset.lang = lang;
            labelEl.textContent = LABELS[lang] || lang;

            items.forEach((item) => {
                const selected = item.dataset.lang === lang;
                item.classList.toggle("is-selected", selected);
                item.setAttribute("aria-selected", String(selected));
            });

            root.dispatchEvent(
                new CustomEvent("languageChange", {
                    detail: { lang },
                    bubbles: true,
                })
            );
        };

        button.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            setOpen(!isOpen());
        });

        list.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();

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
        setOpen(false);
    }

    document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll(".lang-switch").forEach(initLangSwitch);
    });
})();
