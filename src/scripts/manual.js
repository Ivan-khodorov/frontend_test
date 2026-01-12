(() => {
    const sidebarItems = Array.from(document.querySelectorAll('.manual__nav .manual__nav-item'));
    const contents = Array.from(document.querySelectorAll('.manual__content .content'));
    const nextBtn = document.querySelector('.manual__next');
    const menuToggle = document.getElementById('manual-menu-toggle');

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

    showStep(DEFAULT_INDEX, { scroll: false });
    requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'auto' });
    });
})();
