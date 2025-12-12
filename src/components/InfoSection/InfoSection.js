export function renderInfoSection(rootSelector, blocks) {
    const root = document.querySelector(rootSelector);
    if (!root) return;

    const html = `
    <section class="info-section">
      <div class="info-section__grid">
        ${blocks
        .map(
            (b) => `
          <article class="info-card" data-block-id="${b.id}">
            <div class="info-card__icon">
              <img src="${b.icon}" alt="${b.title}">
            </div>
            <div class="info-card__content">
              <h2 class="info-card__title">${b.title}</h2>
              <p class="info-card__text">${b.description}</p>
            </div>
          </article>
        `
        )
        .join("")}
      </div>
    </section>
  `;

    root.innerHTML = html;
}
