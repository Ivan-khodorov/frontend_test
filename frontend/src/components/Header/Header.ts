import logoNewUrl from "../../assets/img/logo-new.png";
import logoUrl from "../../assets/img/logo.png";
import { createLanguageSwitcher } from "../LanguageSwitcher/LanguageSwitcher";
import "./Header.scss";

export function createHeader(): HTMLElement {
    const header = document.createElement("header");
    header.classList.add("header");

    header.innerHTML = `
        <div class="container">
            <div class="header__inner">

                <div class="header__logos">
                    <img src="${logoNewUrl}" alt="Legal Expert new logo" class="header__logo-img">
                    <img src="${logoUrl}" alt="Legal Expert logo" class="header__logo-img">
                    <div class="header__text">
                    Система подготовки к судебным процессам
                    </div>
                </div>

                <div class="header__lang"></div>

            </div>
        </div>
    `;

    const langContainer = header.querySelector(".header__lang");
    if (langContainer) {
        langContainer.appendChild(createLanguageSwitcher("ru"));
    }

    return header;
}

export function mountHeader(container?: HTMLElement): void {
    const root = container ?? document.querySelector(".app");
    if (!root) return;

    const existing = root.querySelector(".header");
    if (existing) existing.remove();

    root.prepend(createHeader());
}
