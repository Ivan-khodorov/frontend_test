import "./Home.scss";
import { InfoSection, InfoBlock } from "../../components/InfoSection/InfoSection";

import civilIcon from "../../assets/img/civil-icon.png";
import administrativeIcon from "../../assets/img/administrative.png";
import criminalIcon from "../../assets/img/criminal.png";

const HOME_INFO_BLOCKS: InfoBlock[] = [
    {
        id: "info-1",
        title: "Гражданский процесс",
        description:
            "Рассмотрение споров о защите нарушенных или оспариваемых прав, свобод и законных\nинтересов",
        icon: civilIcon
    },
    {
        id: "info-2",
        title: "Административный процесс",
        description:
            "Разрешение административных дел с целью защиты прав в публично-правовых отношениях",
        icon: administrativeIcon
    },
    {
        id: "info-3",
        title: "Уголовный процесс",
        description:
            "Пресечение, раскрытие и расследование уголовных правонарушений",
        icon: criminalIcon
    }
];

export function initHomePage(): void {
    const main = document.querySelector(".main");
    if (!main) return;

    main.innerHTML = `
    <div class="container home">
      <h1 class="home__title">Выберите отрасль права</h1>
      <div class="home__info"></div>
    </div>
  `;

    const infoRoot = main.querySelector(".home__info");
    if (!infoRoot || !(infoRoot instanceof HTMLElement)) return;

    new InfoSection(infoRoot, HOME_INFO_BLOCKS);
}
