(function initManualNextButton() {
    const nextBtn = document.querySelector('.manual__next');
    if (!nextBtn) return;

    const stepFiles = [
        'index.html',
        'FilingClaim/FilingClaim.html',
        'FormContent/FormContent.html',
        'DocumentsList/DocumentsList.html',
        'StateDuty/StateDuty.html',
        'CostClaim/CostClaim.html',
        'LegalCosts/LegalCosts.html',
        'Distribution/Distribution.html',
        'FormFeed/FormFeed.html',
        'RegistrationStatus/RegistrationStatus.html'
    ];

    function getCurrentBaseUrl() {
        const currentUrl = window.location.href;
        const pathname = window.location.pathname;

        const segments = pathname.split('/').filter(seg => seg);

        for (let i = segments.length - 1; i >= 0; i--) {
            const segment = segments[i];
            if (['civil', 'administrative', 'criminal'].includes(segment.toLowerCase())) {
                const baseIndex = currentUrl.indexOf(segment);
                if (baseIndex !== -1) {
                    return currentUrl.substring(0, baseIndex + segment.length + 1);
                }
            }
        }

        return currentUrl.substring(0, currentUrl.lastIndexOf('/') + 1);
    }
    function getCurrentRelativePath() {
        const pathname = window.location.pathname.toLowerCase();

        const keywords = ['civil', 'administrative', 'criminal'];
        let categoryIndex = -1;

        for (const keyword of keywords) {
            const index = pathname.indexOf(`/${keyword}/`);
            if (index !== -1) {
                categoryIndex = index + keyword.length + 1;
                break;
            }
        }

        if (categoryIndex === -1) {
            const lastSlash = pathname.lastIndexOf('/');
            return lastSlash !== -1 ? pathname.substring(lastSlash + 1) : pathname;
        }

        return pathname.substring(categoryIndex + 1);
    }

    nextBtn.addEventListener('click', () => {
        const relativePath = getCurrentRelativePath();

        let currentIndex = -1;

        for (let i = 0; i < stepFiles.length; i++) {
            const stepFile = stepFiles[i].toLowerCase();

            if (relativePath === stepFile ||
                relativePath.includes(stepFile.replace('.html', '/')) ||
                (stepFile === 'index.html' && (relativePath === '' || relativePath === 'index.html'))) {
                currentIndex = i;
                break;
            }
        }

        if (currentIndex === -1 || currentIndex >= stepFiles.length - 1) {
            nextBtn.disabled = true;
            nextBtn.style.opacity = '0.6';
            nextBtn.style.cursor = 'default';
            return;
        }

        const nextFile = stepFiles[currentIndex + 1];
        const baseUrl = getCurrentBaseUrl();

        const nextUrl = new URL(nextFile, baseUrl).toString();
        window.location.assign(nextUrl);
    });
})();