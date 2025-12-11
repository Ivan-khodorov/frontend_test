import "./LanguageSwitcher.scss";

type LangCode = "ru" | "kk";

const LANGUAGES: { code: LangCode; label: string }[] = [
    { code: "ru", label: "Рус" },
    { code: "kk", label: "Қаз" }
];

const ARROW_ICON = `
<svg class="lang-switch__arrow" width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M11.185 0.625L6.83833 4.97167C6.325 5.485 5.485 5.485 4.97167 4.97167L0.625 0.625"
    stroke="currentColor" stroke-width="1.25" stroke-miterlimit="10"
    stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

const CHECK_ICON = `
<svg class="lang-switch__check-icon" width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0.625 4.04954L4.04954 7.47408L10.9107 0.625"
    stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

export function createLanguageSwitcher(initial: LangCode = "ru"): HTMLElement {
    const wrapper = document.createElement("div");
    wrapper.classList.add("lang-switch");

    let current = initial;

    const button = document.createElement("button");
    button.type = "button";
    button.classList.add("lang-switch__button");

    button.innerHTML = `
    <span class="lang-switch__label">${getLabel(current)}</span>
    <span class="lang-switch__icon">${ARROW_ICON}</span>
  `;

    const menu = document.createElement("div");
    menu.classList.add("lang-switch__menu");

    const list = document.createElement("ul");
    list.classList.add("lang-switch__list");

    LANGUAGES.forEach((lang) => {
        const li = document.createElement("li");
        li.classList.add("lang-switch__item");
        li.dataset.lang = lang.code;

        if (lang.code === current) li.classList.add("is-selected");

        li.innerHTML = `
      <span class="lang-switch__item-label">${lang.label}</span>
      <span class="lang-switch__check">${CHECK_ICON}</span>
    `;

        list.appendChild(li);
    });

    menu.appendChild(list);
    wrapper.append(button, menu);

    const setOpen = (open: boolean) => {
        if (open) wrapper.classList.add("is-open");
        else wrapper.classList.remove("is-open");
    };

    const setCurrent = (code: LangCode) => {
        current = code;

        const label = wrapper.querySelector<HTMLElement>(".lang-switch__label");
        if (label) label.textContent = getLabel(code);

        wrapper.querySelectorAll(".lang-switch__item").forEach((item) => {
            item.classList.toggle("is-selected", item instanceof HTMLElement && item.dataset.lang === code);
        });

        wrapper.dispatchEvent(new CustomEvent("languageChange", {
            detail: { lang: code },
            bubbles: true
        }));
    };

    button.addEventListener("click", (e) => {
        e.stopPropagation();
        setOpen(!wrapper.classList.contains("is-open"));
    });

    list.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;
        const item = target.closest(".lang-switch__item") as HTMLElement | null;
        if (!item || !item.dataset.lang) return;

        setCurrent(item.dataset.lang as LangCode);
        setOpen(false);
    });

    document.addEventListener("click", (e) => {
        if (!wrapper.contains(e.target as Node)) setOpen(false);
    });

    return wrapper;
}

function getLabel(code: LangCode): string {
    return LANGUAGES.find((l) => l.code === code)?.label ?? code;
}
