(() => {
    const sidebarItems = Array.from(document.querySelectorAll('.manual__nav .manual__nav-item'));
    const contents = Array.from(document.querySelectorAll('.manual__content .content'));
    const nextBtn = document.querySelector('.manual__next');
    const menuToggle = document.getElementById('manual-menu-toggle');
    const searchInput = document.querySelector('.manual__search-input');
    const nav = document.querySelector('.manual__nav');

    if (!sidebarItems.length || !contents.length) return;

    const DEFAULT_INDEX = 0;
    const STORAGE_KEY = 'manual_step_index';

    sessionStorage.removeItem(STORAGE_KEY);

    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

    if (location.hash) {
        history.replaceState(null, '', location.pathname + location.search);
    }

    let currentIndex = DEFAULT_INDEX;

    function showStep(index, { scroll = true } = {}) {
        const maxIndex = Math.min(contents.length, sidebarItems.length) - 1;
        const safeIndex = Math.max(0, Math.min(index, maxIndex));
        currentIndex = safeIndex;

        contents.forEach((block, i) => {
            const isActive = i === safeIndex;
            block.hidden = !isActive;
            block.setAttribute('aria-hidden', String(!isActive));
        });

        sidebarItems.forEach((item, i) => {
            item.classList.toggle('is-active', i === safeIndex);
        });

        if (sidebarItems[safeIndex]) {
            sidebarItems[safeIndex].style.display = '';
            sidebarItems[safeIndex].setAttribute('aria-hidden', 'false');
        }

        if (nextBtn) {
            const isLast = safeIndex >= maxIndex;
            nextBtn.style.display = isLast ? 'none' : '';
            nextBtn.setAttribute('aria-hidden', String(isLast));
        }

        if (menuToggle) menuToggle.checked = false;

        if (scroll) {
            contents[safeIndex].scrollIntoView({ behavior: 'auto', block: 'start' });
        }
    }

    sidebarItems.forEach((item, i) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            if (i >= contents.length) return;
            showStep(i);
        });
    });

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showStep(currentIndex + 1);
        });

        nextBtn.setAttribute('role', 'button');
        nextBtn.tabIndex = 0;
        nextBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showStep(currentIndex + 1);
            }
        });
    }

    function norm(s) {
        return (s || "")
            .toString()
            .toLowerCase()
            .replace(/ё/g, "е")
            .replace(/[^\p{L}\p{N}\s]+/gu, " ")
            .replace(/\s+/g, " ")
            .trim();
    }

    function makeTrigrams(text) {
        const t = norm(text).replace(/\s+/g, " ");
        const grams = new Set();

        if (t.length <= 3) {
            if (t.length) grams.add(t);
            return grams;
        }

        for (let i = 0; i <= t.length - 3; i++) grams.add(t.slice(i, i + 3));
        return grams;
    }

    function scoreByTrigrams(query, target) {
        const q = makeTrigrams(query);
        if (q.size === 0) return 1;

        const t = makeTrigrams(target);
        if (t.size === 0) return 0;

        let hit = 0;
        q.forEach((g) => t.has(g) && hit++);
        return hit / q.size;
    }

    function initManualSearch() {
        if (!searchInput || !nav || sidebarItems.length === 0) return;

        const data = sidebarItems.map((el, idx) => ({
            el,
            idx,
            text: norm(el.textContent),
        }));

        const THRESHOLD = 0.30;

        const empty = document.createElement('div');
        empty.className = 'manual__search-empty';
        empty.style.display = 'none';
        empty.textContent = 'Ничего не найдено';
        nav.after(empty);

        function applyFilter({ openFirst = false } = {}) {
            const nq = norm(searchInput.value || '');
            const shouldFilter = nq.length >= 2;

            let visible = 0;
            let firstVisibleIndex = null;

            data.forEach(({ el, idx, text }) => {
                let ok = true;

                if (shouldFilter) {
                    ok = text.includes(nq) || scoreByTrigrams(nq, text) >= THRESHOLD;
                }

                el.style.display = ok ? '' : 'none';
                el.setAttribute('aria-hidden', String(!ok));

                if (ok) {
                    visible++;
                    if (firstVisibleIndex === null) firstVisibleIndex = idx;
                }
            });

            empty.style.display = (shouldFilter && visible === 0) ? '' : 'none';

            if (openFirst && firstVisibleIndex !== null) {
                showStep(firstVisibleIndex);
            }
        }

        searchInput.addEventListener('input', () => applyFilter());

        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                applyFilter({ openFirst: true });
            }
            if (e.key === 'Escape') {
                searchInput.value = '';
                applyFilter();
            }
        });

        applyFilter();
    }

    initManualSearch();

    showStep(DEFAULT_INDEX, { scroll: false });
    requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    });
})();
