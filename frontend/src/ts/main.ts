import "../styles/main.scss";

import { mountHeader } from "../components/Header/Header";
import { mountFooter } from "../components/Footer/Footer";
import { initHomePage } from "../pages/Home/Home";

class App {
    constructor() {
        this.init();
    }

    private init(): void {
        this.initComponents();
        this.initState();
    }

    private initComponents(): void {
        initHomePage();
    }

    private initState(): void {
        window.appState = {
            selectedProcess: localStorage.getItem("selectedProcess") || null,
            currentStep: 1,
            userData: {}
        };
    }
}

document.addEventListener("DOMContentLoaded", () => {
    mountHeader();
    new App();
    mountFooter();
});

declare global {
    interface Window {
        appState: {
            selectedProcess: string | null;
            currentStep: number;
            userData: Record<string, any>;
        };
        router?: {
            navigate: (path: string) => void;
        };
    }
}
