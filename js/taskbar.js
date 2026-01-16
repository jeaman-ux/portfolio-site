// Windows 98 Taskbar

class Taskbar {
    constructor() {
        this.startButton = document.getElementById('start-button');
        this.clock = document.getElementById('clock');

        this.init();
    }

    init() {
        // Update clock
        this.updateClock();
        setInterval(() => this.updateClock(), 1000);

        // Start button click - handled by startmenu.js
    }

    updateClock() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12; // 0 should be 12

        this.clock.textContent = `${hours}:${minutes} ${ampm}`;
    }
}

// Initialize taskbar
const taskbar = new Taskbar();
