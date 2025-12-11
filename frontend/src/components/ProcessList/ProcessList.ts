export class ProcessList {
    private cards: NodeListOf<HTMLElement>;
    private buttons: NodeListOf<HTMLButtonElement>;

    constructor() {
        this.cards = document.querySelectorAll('.process-card');
        this.buttons = document.querySelectorAll('.process-card__button');
        this.init();
    }

    private init(): void {
        this.attachEvents();
    }

    private attachEvents(): void {
        this.buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const card = (e.currentTarget as HTMLElement).closest('.process-card');
                const processType = card?.getAttribute('data-process');
                this.selectProcess(processType || 'civil');
            });
        });

        this.cards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (!(e.target as HTMLElement).closest('.process-card__button')) {
                    const button = card.querySelector('.process-card__button');
                    button?.dispatchEvent(new Event('click'));
                }
            });
        });
    }

    private selectProcess(processType: string): void {
        this.saveSelection(processType);

        this.showSelectionFeedback(processType);

        this.redirectToNextPage(processType);
    }

    private saveSelection(processType: string): void {
        localStorage.setItem('selectedProcess', processType);

        if (window.appState) {
            window.appState.selectedProcess = processType;
        }
    }

    private showSelectionFeedback(processType: string): void {
        this.cards.forEach(card => {
            card.classList.remove('process-card--selected');
        });

        const selectedCard = document.querySelector(`[data-process="${processType}"]`);
        selectedCard?.classList.add('process-card--selected');

        const button = selectedCard?.querySelector('.process-card__button');
        if (button) {
            button.innerHTML = '<span>Загрузка...</span>';
            button.setAttribute('disabled', 'true');
        }
    }

    private redirectToNextPage(processType: string): void {
        setTimeout(() => {
            console.log(`Переход к процессу: ${processType}`);


            if (window.router) {
                window.router.navigate(`/process/${processType}/categories`);
            }
        }, 1000);
    }
}