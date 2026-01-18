(function () {
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

    function initCategorySearch(root) {
        const input = root.querySelector(".categories__search-input");
        const cards = Array.from(root.querySelectorAll(".categories__card"));
        if (!input || cards.length === 0) return;

        const data = cards.map((el) => ({ el, text: norm(el.textContent) }));

        const THRESHOLD = 0.30;

        const empty = document.createElement("div");
        empty.className = "categories__empty";
        empty.style.display = "none";
        empty.textContent = "Ничего не найдено";

        const flex = root.querySelector(".categories__flex");
        if (flex) flex.after(empty);

        function applyFilter() {
            const nq = norm(input.value || "");
            const shouldFilter = nq.length >= 2;

            let visible = 0;

            data.forEach(({ el, text }) => {
                let ok = true;

                if (shouldFilter) {
                    if (text.includes(nq)) ok = true;
                    else ok = scoreByTrigrams(nq, text) >= THRESHOLD;
                }

                el.style.display = ok ? "" : "none";
                if (ok) visible++;
            });

            empty.style.display = visible === 0 ? "" : "none";
        }

        input.addEventListener("input", applyFilter);
        input.addEventListener("keydown", (e) => e.key === "Enter" && e.preventDefault());

        applyFilter();
    }

    document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll(".categories").forEach(initCategorySearch);
    });
})();
