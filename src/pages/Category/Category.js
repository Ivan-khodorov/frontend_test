document.addEventListener("DOMContentLoaded", () => {
    const process = localStorage.getItem("process");
    const level = localStorage.getItem("level");

    if (!process || !level) {
        location.href = "../Home/index.html#Home";
    }
});
