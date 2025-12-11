import "./InfoSection.scss";

export type InfoBlock = {
    id: string;
    title: string;
    description: string;
    icon: string;
};

export class InfoSection {
    private root: HTMLElement;
    private blocks: InfoBlock[];

    constructor(root: HTMLElement, blocks: InfoBlock[]) {
        this.root = root;
        this.blocks = blocks;
        this.render();
    }

    private render(): void {
        this.root.innerHTML = "";

        const wrapper = document.createElement("div");
        wrapper.classList.add("info-section");

        const grid = document.createElement("div");
        grid.classList.add("info-section__grid");

        this.blocks.forEach((block) => {
            const card = document.createElement("article");
            card.classList.add("info-card");
            card.dataset.blockId = block.id;

            card.innerHTML = `
        <div class="info-card__icon">
          <img src="${block.icon}" alt="${block.title}">
        </div>
        <div class="info-card__content">
          <h2 class="info-card__title">${block.title}</h2>
          <p class="info-card__text">${block.description}</p>
        </div>
      `;

            grid.appendChild(card);
        });

        wrapper.appendChild(grid);
        this.root.appendChild(wrapper);
    }
}
