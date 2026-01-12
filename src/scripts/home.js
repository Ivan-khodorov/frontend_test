document.addEventListener('click', (e) => {
    const c = e.target.closest('.process-card');
    if (!c) return;

    const app = document.querySelector('.app');
    const levelBlock = document.querySelector('#level-block');
    if (!app || !levelBlock) return;

    document.querySelectorAll('.process-card').forEach(x => x.classList.toggle('is-selected', x === c));
    app.dataset.state = 'level';
    document.querySelectorAll('#level-block .card-section__level')
        .forEach(l => l.classList.toggle('active', l.dataset.tabid === c.dataset.tabid));
});
