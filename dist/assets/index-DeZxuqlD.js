(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&c(a)}).observe(document,{childList:!0,subtree:!0});function s(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function c(t){if(t.ep)return;t.ep=!0;const i=s(t);fetch(t.href,i)}})();const m="data:image/png;base64,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",f="/frontend_test/assets/logo-sYcnU56Y.png",g=[{code:"ru",label:"Рус"},{code:"kk",label:"Қаз"}],p=`
<svg class="lang-switch__arrow" width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M11.185 0.625L6.83833 4.97167C6.325 5.485 5.485 5.485 4.97167 4.97167L0.625 0.625"
    stroke="currentColor" stroke-width="1.25" stroke-miterlimit="10"
    stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,v=`
<svg class="lang-switch__check-icon" width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0.625 4.04954L4.04954 7.47408L10.9107 0.625"
    stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;function h(n="ru"){const e=document.createElement("div");e.classList.add("lang-switch");let s=n;const c=document.createElement("button");c.type="button",c.classList.add("lang-switch__button"),c.innerHTML=`
    <span class="lang-switch__label">${d(s)}</span>
    <span class="lang-switch__icon">${p}</span>
  `;const t=document.createElement("div");t.classList.add("lang-switch__menu");const i=document.createElement("ul");i.classList.add("lang-switch__list"),g.forEach(o=>{const r=document.createElement("li");r.classList.add("lang-switch__item"),r.dataset.lang=o.code,o.code===s&&r.classList.add("is-selected"),r.innerHTML=`
      <span class="lang-switch__item-label">${o.label}</span>
      <span class="lang-switch__check">${v}</span>
    `,i.appendChild(r)}),t.appendChild(i),e.append(c,t);const a=o=>{o?e.classList.add("is-open"):e.classList.remove("is-open")},u=o=>{s=o;const r=e.querySelector(".lang-switch__label");r&&(r.textContent=d(o)),e.querySelectorAll(".lang-switch__item").forEach(l=>{l.classList.toggle("is-selected",l instanceof HTMLElement&&l.dataset.lang===o)}),e.dispatchEvent(new CustomEvent("languageChange",{detail:{lang:o},bubbles:!0}))};return c.addEventListener("click",o=>{o.stopPropagation(),a(!e.classList.contains("is-open"))}),i.addEventListener("click",o=>{const l=o.target.closest(".lang-switch__item");!l||!l.dataset.lang||(u(l.dataset.lang),a(!1))}),document.addEventListener("click",o=>{e.contains(o.target)||a(!1)}),e}function d(n){return g.find(e=>e.code===n)?.label??n}function A(){const n=document.createElement("header");n.classList.add("header"),n.innerHTML=`
        <div class="container">
            <div class="header__inner">

                <div class="header__logos">
                    <img src="${m}" alt="Legal Expert new logo" class="header__logo-img">
                    <img src="${f}" alt="Legal Expert logo" class="header__logo-img">
                    <div class="header__text">
                    Система подготовки к судебным процессам
                    </div>
                </div>

                <div class="header__lang"></div>

            </div>
        </div>
    `;const e=n.querySelector(".header__lang");return e&&e.appendChild(h("ru")),n}function w(n){const e=document.querySelector(".app");if(!e)return;const s=e.querySelector(".header");s&&s.remove(),e.prepend(A())}function E(){const n=document.createElement("footer");return n.classList.add("footer"),n.innerHTML=`
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
  `,n}function L(n){const e=document.querySelector(".app");if(!e)return;const s=e.querySelector(".footer");s&&s.remove(),e.append(E())}class C{root;blocks;constructor(e,s){this.root=e,this.blocks=s,this.render()}render(){this.root.innerHTML="";const e=document.createElement("div");e.classList.add("info-section");const s=document.createElement("div");s.classList.add("info-section__grid"),this.blocks.forEach(c=>{const t=document.createElement("article");t.classList.add("info-card"),t.dataset.blockId=c.id,t.innerHTML=`
        <div class="info-card__icon">
          <img src="${c.icon}" alt="${c.title}">
        </div>
        <div class="info-card__content">
          <h2 class="info-card__title">${c.title}</h2>
          <p class="info-card__text">${c.description}</p>
        </div>
      `,s.appendChild(t)}),e.appendChild(s),this.root.appendChild(e)}}const _="/frontend_test/assets/civil-icon-OkqHjQzr.png",y="/frontend_test/assets/administrative-CJ-pyrb3.png",H="/frontend_test/assets/criminal-CgVAoBLc.png",S=[{id:"info-1",title:"Гражданский процесс",description:`Рассмотрение споров о защите нарушенных или оспариваемых прав, свобод и законных
интересов`,icon:_},{id:"info-2",title:"Административный процесс",description:"Разрешение административных дел с целью защиты прав в публично-правовых отношениях",icon:y},{id:"info-3",title:"Уголовный процесс",description:"Пресечение, раскрытие и расследование уголовных правонарушений",icon:H}];function O(){const n=document.querySelector(".main");if(!n)return;n.innerHTML=`
    <div class="container home">
      <h1 class="home__title">Выберите отрасль права</h1>
      <div class="home__info"></div>
    </div>
  `;const e=n.querySelector(".home__info");!e||!(e instanceof HTMLElement)||new C(e,S)}class b{constructor(){this.init()}init(){this.initComponents(),this.initState()}initComponents(){O()}initState(){window.appState={selectedProcess:localStorage.getItem("selectedProcess")||null,currentStep:1,userData:{}}}}document.addEventListener("DOMContentLoaded",()=>{w(),new b,L()});
