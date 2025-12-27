document.addEventListener('DOMContentLoaded', function() {

    if (!window.location.pathname.includes('DocumentsList/DocumentsList.html')) return;

    const treeLinks = document.querySelectorAll('.manual__tree-link');
    const detailsElements = document.querySelectorAll('details.content__panel');

    function activateLinkAndOpenDetails(targetId) {
        treeLinks.forEach(link => {
            link.classList.remove('is-active');
        });

        const targetLink = document.querySelector(`.manual__tree-link[data-target="${targetId}"]`);
        if (targetLink) {
            targetLink.classList.add('is-active');
        }

        const targetDetails = document.getElementById(targetId);
        if (targetDetails) {
            if (!targetDetails.open) {
                targetDetails.open = true;
            }
            setTimeout(() => {
                targetDetails.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 10);
        }
    }

    treeLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            if (targetId) {
                window.location.hash = targetId;
                activateLinkAndOpenDetails(targetId);
            }
        });
    });

    detailsElements.forEach(details => {
        const summary = details.querySelector('summary');
        if (summary) {
            summary.addEventListener('click', function(e) {
                setTimeout(() => {
                    const detailsId = details.id;
                    if (details.open) {
                        activateLinkAndOpenDetails(detailsId);
                    } else {
                        const targetLink = document.querySelector(`.manual__tree-link[data-target="${detailsId}"]`);
                        if (targetLink) {
                            targetLink.classList.remove('is-active');
                        }
                    }
                }, 10);
            });
        }
    });

    function handleHashChange() {
        const hash = window.location.hash.substring(1);
        if (hash && (hash === 'family' || hash === 'inheritance')) {
            activateLinkAndOpenDetails(hash);
        } else {
            detailsElements.forEach(details => {
                details.open = false;
            });
            treeLinks.forEach(link => {
                link.classList.remove('is-active');
            });
        }
    }

    window.addEventListener('hashchange', handleHashChange);

    handleHashChange();

    const nextBtn = document.querySelector('.manual__next');
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            const baseUrl = window.location.href.split('/DocumentsList/')[0];
            window.location.href = baseUrl + '/StateDuty/StateDuty.html';
        });
    }
});