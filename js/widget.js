/**
 * Card-of-the-Day widget — fetches ./data/today.json and renders into #cod-container.
 * Cache-busted by timestamp query param so GitHub Pages always serves fresh JSON.
 */
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('cod-container');
    if (!container) return;

    fetch('./data/today.json?t=' + Date.now())
        .then(r => {
            if (!r.ok) throw new Error('HTTP ' + r.status);
            return r.json();
        })
        .then(d => {
            container.innerHTML = `
<div class="cod-inner">
    <img src="${d.image}" alt="${d.card_name}" class="cod-image">
    <div class="cod-text">
        <div class="cod-date">${d.date}, ${d.weekday_ru}</div>
        <h3 class="cod-name">${d.card_name}</h3>
        <div class="cod-keywords">${d.keywords}</div>
        <div class="cod-interp">${d.interpretation_html}</div>
        <a href="${d.bot_deeplink_tarot}" class="btn btn-primary cod-btn">✦ Открыть в боте</a>
    </div>
</div>`;
        })
        .catch(err => {
            console.warn('Widget load error:', err);
            container.innerHTML = '<p class="cod-error">Карта дня временно недоступна. Загляните позже.</p>';
        });
});
