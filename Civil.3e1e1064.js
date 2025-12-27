document.addEventListener("DOMContentLoaded", ()=>{
    const process = localStorage.getItem("process");
    const level = localStorage.getItem("level");
    if (!process || !level) {
        location.href = new URL("../../index.html", window.location.href).href;
        return;
    }
    const input = document.querySelector(".categories__search-input") || document.querySelector('input[type="text"][placeholder]');
    if (input) {
        const desktopText = input.dataset.placeholderDesktop || "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u043B\u044E\u0447\u0435\u0432\u044B\u0435 \u0441\u043B\u043E\u0432\u0430 (\u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: \u0442\u0440\u0443\u0434\u043E\u0432\u044B\u0435 \u0441\u043F\u043E\u0440\u044B, \u043D\u0430\u0441\u043B\u0435\u0434\u0441\u0442\u0432\u043E)";
        const mobileText = input.dataset.placeholderMobile || "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u043B\u044E\u0447\u0435\u0432\u044B\u0435 \u0441\u043B\u043E\u0432\u0430";
        const mq = window.matchMedia("(max-width: 780px)");
        const applyPlaceholder = ()=>{
            input.placeholder = mq.matches ? mobileText : desktopText;
        };
        applyPlaceholder();
        if (typeof mq.addEventListener === "function") mq.addEventListener("change", applyPlaceholder);
        else mq.addListener(applyPlaceholder);
    }
    const PERSONS_PAGES = {
        civil: "../../PersonsSelect/Civil/index.html",
        administrative: "../../PersonsSelect/Administrative/index.html",
        criminal: "../../PersonsSelect/Criminal/index.html"
    };
    const cards = document.querySelectorAll(".categories__card");
    cards.forEach((card)=>{
        card.addEventListener("click", ()=>{
            const categoryName = card.textContent.trim();
            localStorage.setItem("categoryName", categoryName);
            const target = PERSONS_PAGES[process];
            if (!target) return;
            location.href = new URL(target, window.location.href).href;
        });
    });
});

//# sourceMappingURL=Civil.3e1e1064.js.map
