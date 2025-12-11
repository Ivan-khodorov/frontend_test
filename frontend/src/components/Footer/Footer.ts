import "./Footer.scss";

export function createFooter(): HTMLElement {
    const footer = document.createElement("footer");
    footer.classList.add("footer");

    footer.innerHTML = `
    <div class="container">
      <div class="footer__inner">
        <div class="footer__copyright">
          © 2025 LegalExpert. Все права защищены.
        </div>

        <div class="footer__links">
          <a href="#" class="footer__link">Связаться с нами</a>
          <a href="#" class="footer__link">Условия использования</a>
          <a href="#" class="footer__link">Политика конфиденциальности</a>
        </div>
      </div>
    </div>
  `;

    return footer;
}

export function mountFooter(container?: HTMLElement): void {
    const root = container ?? document.querySelector(".app");
    if (!root) return;

    const existing = root.querySelector(".footer");
    if (existing) {
        existing.remove();
    }

    root.append(createFooter());
}
