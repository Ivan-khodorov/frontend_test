(function () {
    function initProcessList() {
        const cards = document.querySelectorAll(".process-card");
        const buttons = document.querySelectorAll(".process-card__button");

        if (!cards.length || !buttons.length) return;

        function saveSelection(processType) {
            localStorage.setItem("selectedProcess", processType);

            if (window.appState) {
                window.appState.selectedProcess = processType;
            }
        }

        function showSelectionFeedback(processType) {
            cards.forEach((card) => card.classList.remove("process-card--selected"));

            const selectedCard = document.querySelector(`[data-process="${processType}"]`);
            if (!selectedCard) return;

            selectedCard.classList.add("process-card--selected");

            const button = selectedCard.querySelector(".process-card__button");
            if (button) {
                button.innerHTML = "<span>Загрузка...</span>";
                button.setAttribute("disabled", "true");
            }
        }

        function redirectToNextPage(processType) {
            setTimeout(() => {
                if (window.router && typeof window.router.navigate === "function") {
                    window.router.navigate(`/process/${processType}/categories`);
                    return;
                }

                window.location.href = `process-categories.html?process=${encodeURIComponent(processType)}`;
            }, 1000);
        }

        function selectProcess(processType) {
            saveSelection(processType);
            showSelectionFeedback(processType);
            redirectToNextPage(processType);
        }

        buttons.forEach((button) => {
            button.addEventListener("click", (e) => {
                const card = e.currentTarget.closest(".process-card");
                const processType = (card && card.getAttribute("data-process")) || "civil";
                selectProcess(processType);
            });
        });

        cards.forEach((card) => {
            card.addEventListener("click", (e) => {
                const isButtonClick = e.target.closest(".process-card__button");
                if (isButtonClick) return;

                const button = card.querySelector(".process-card__button");
                if (button) button.click();
            });
        });
    }

    document.addEventListener("DOMContentLoaded", initProcessList);
})();
