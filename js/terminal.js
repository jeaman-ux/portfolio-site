// Eco-friendly Terminal Mode

class Terminal {
    constructor() {
        this.terminalMode = document.getElementById('terminal-mode');
        this.terminalOutput = document.getElementById('terminal-output');
        this.terminalInput = document.getElementById('terminal-input');
        this.exitBtn = document.getElementById('terminal-exit');

        this.projects = [
            { id: 1, name: 'SennOS at sennder', file: 'exact_sennos.txt' },
            { id: 2, name: 'Assembl by bluenove', file: 'exact_assembl.txt' },
            { id: 3, name: 'Djingo City', file: 'exact_djingo-city.txt' },
            { id: 4, name: 'X-TRACT', file: 'exact_x-tract.txt' },
            { id: 5, name: 'Zixi Research Lab', file: 'exact_zixi-research-lab.txt' },
            { id: 6, name: 'Do Tank by CITEO', file: 'exact_owf.txt' },
            { id: 7, name: "JUST'LA", file: 'exact_just-la.txt' },
            { id: 8, name: 'IDF Paris Kiosk', file: 'exact_idf-paris-kiosk.txt' },
            { id: 9, name: "Movin'On HUB - MICHELIN", file: 'exact_obside.txt' },
            { id: 10, name: 'KmUn Grenoble', file: 'exact_kmun-grenoble.txt' },
            { id: 11, name: 'Masters Research', file: 'exact_masters-research.txt' },
            { id: 12, name: 'Graphic Design', file: 'exact_graphic-design.txt' },
            { id: 13, name: 'Fine Arts', file: 'exact_fine-arts.txt' },
            { id: 14, name: 'Hackathon', file: 'exact_hackathon.txt' }
        ];

        this.commandHistory = [];
        this.historyIndex = -1;
        this.currentView = 'menu';

        this.init();
    }

    init() {
        // Enter key handler
        this.terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const command = this.terminalInput.value.trim();
                if (command) {
                    this.executeCommand(command);
                    this.commandHistory.push(command);
                    this.historyIndex = this.commandHistory.length;
                }
                this.terminalInput.value = '';
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (this.historyIndex > 0) {
                    this.historyIndex--;
                    this.terminalInput.value = this.commandHistory[this.historyIndex];
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (this.historyIndex < this.commandHistory.length - 1) {
                    this.historyIndex++;
                    this.terminalInput.value = this.commandHistory[this.historyIndex];
                } else {
                    this.historyIndex = this.commandHistory.length;
                    this.terminalInput.value = '';
                }
            }
        });

        // Exit button
        this.exitBtn.addEventListener('click', () => {
            this.exitToClassic();
        });

        // Keep input focused
        this.terminalMode.addEventListener('click', () => {
            this.terminalInput.focus();
        });
    }

    enter() {
        this.terminalMode.style.display = 'flex';
        this.terminalOutput.innerHTML = '';
        this.currentView = 'menu';
        this.showWelcome();
        this.terminalInput.focus();
    }

    exit() {
        this.terminalMode.style.display = 'none';
    }

    exitToClassic() {
        this.exit();
    }

    print(text, className = '') {
        const line = document.createElement('div');
        line.className = 'terminal-line ' + className;
        line.textContent = text;
        this.terminalOutput.appendChild(line);
        this.scrollToBottom();
    }

    printHTML(html, className = '') {
        const line = document.createElement('div');
        line.className = 'terminal-line ' + className;
        line.innerHTML = html;
        this.terminalOutput.appendChild(line);
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.terminalOutput.scrollTop = this.terminalOutput.scrollHeight;
    }

    showWelcome() {
        this.print('═══════════════════════════════════════════════════════════════', 'separator');
        this.print('    JORDAN DESIGN PORTFOLIO 2026 - ECO-FRIENDLY MODE', 'title');
        this.print('═══════════════════════════════════════════════════════════════', 'separator');
        this.print('');
        this.print('Welcome to the text-only, low-energy portfolio viewer!');
        this.print('This mode uses minimal resources and focuses on content.');
        this.print('');
        this.print('───────────────────────────────────────────────────────────────', 'separator');
        this.print('AVAILABLE COMMANDS:', 'title');
        this.print('───────────────────────────────────────────────────────────────', 'separator');
        this.print('');
        this.print('  list          - Show all portfolio projects');
        this.print('  1-14          - View a specific project (e.g., type "1")');
        this.print('  about         - About Jordan Eaman');
        this.print('  help          - Show this help message');
        this.print('  clear         - Clear the screen');
        this.print('  classic       - Return to classic Windows 98 mode');
        this.print('');
        this.print('───────────────────────────────────────────────────────────────', 'separator');
        this.print('TIP: Just type a command and press ENTER', 'instruction');
        this.print('───────────────────────────────────────────────────────────────', 'separator');
        this.print('');
    }

    executeCommand(command) {
        // Echo the command
        this.print('$ ' + command, 'command');
        this.print('');

        const cmd = command.toLowerCase().trim();

        // Check for number input (project selection)
        const projectNum = parseInt(cmd);
        if (!isNaN(projectNum) && projectNum >= 1 && projectNum <= this.projects.length) {
            this.showProject(projectNum);
            return;
        }

        // Process text commands
        switch (cmd) {
            case 'help':
                this.showHelp();
                break;
            case 'list':
            case 'ls':
            case 'projects':
                this.listProjects();
                break;
            case 'about':
            case 'info':
                this.showAbout();
                break;
            case 'clear':
            case 'cls':
                this.clear();
                break;
            case 'classic':
            case 'exit':
            case 'back':
                this.print('Returning to classic Windows 98 mode...', 'success');
                setTimeout(() => this.exitToClassic(), 1000);
                break;
            case 'menu':
                this.showWelcome();
                break;
            default:
                this.print('Command not found: ' + command, 'error');
                this.print('Type "help" to see available commands', 'instruction');
                this.print('');
        }
    }

    showHelp() {
        this.print('═══════════════════════════════════════════════════════════════', 'separator');
        this.print('HELP - AVAILABLE COMMANDS', 'title');
        this.print('═══════════════════════════════════════════════════════════════', 'separator');
        this.print('');
        this.print('Navigation Commands:', 'success');
        this.print('  list          - Show all portfolio projects with numbers');
        this.print('  1-14          - View project details (e.g., type "3")');
        this.print('  about         - View bio and experience');
        this.print('');
        this.print('Utility Commands:', 'success');
        this.print('  help          - Show this help message');
        this.print('  clear         - Clear the terminal screen');
        this.print('  classic       - Return to Windows 98 interface');
        this.print('');
        this.print('Quick Tips:', 'instruction');
        this.print('  • Press UP/DOWN arrows to browse command history');
        this.print('  • All commands are case-insensitive');
        this.print('  • Click "Exit to Classic Mode" button anytime to go back');
        this.print('');
    }

    listProjects() {
        this.print('═══════════════════════════════════════════════════════════════', 'separator');
        this.print('PORTFOLIO PROJECTS', 'title');
        this.print('═══════════════════════════════════════════════════════════════', 'separator');
        this.print('');
        this.print('Type a number (1-14) to view project details:', 'instruction');
        this.print('');

        this.projects.forEach(project => {
            this.print(`  [${project.id}]  ${project.name}`);
        });

        this.print('');
        this.print('Example: Type "1" and press ENTER to view the first project', 'instruction');
        this.print('');
    }

    async showProject(projectNum) {
        const project = this.projects[projectNum - 1];
        if (!project) {
            this.print('Project not found', 'error');
            return;
        }

        this.print('Loading project: ' + project.name + '...', 'success');
        this.print('');

        try {
            const content = await portfolioLoader.loadProject(project.file);
            this.displayProjectContent(project.name, content);
        } catch (error) {
            this.print('Error loading project content', 'error');
            this.print('');
        }

        this.print('───────────────────────────────────────────────────────────────', 'separator');
        this.print('Type "list" to see all projects, or "menu" to return to main menu', 'instruction');
        this.print('───────────────────────────────────────────────────────────────', 'separator');
        this.print('');
    }

    displayProjectContent(title, content) {
        this.print('═══════════════════════════════════════════════════════════════', 'separator');
        this.print(title.toUpperCase(), 'title');
        this.print('═══════════════════════════════════════════════════════════════', 'separator');
        this.print('');

        // Clean up the content
        const lines = content.split('\n');
        let inContent = false;

        lines.forEach(line => {
            const trimmed = line.trim();

            // Skip navigation elements
            if (trimmed === 'top of page' ||
                trimmed === 'bottom of page' ||
                trimmed.startsWith('Work') ||
                trimmed.startsWith('About Me + XP')) {
                return;
            }

            // Skip very short lines
            if (trimmed.length < 3) {
                return;
            }

            // Print the line
            if (trimmed) {
                this.print(trimmed);
                inContent = true;
            } else if (inContent) {
                this.print('');
            }
        });

        this.print('');
    }

    showAbout() {
        this.print('═══════════════════════════════════════════════════════════════', 'separator');
        this.print('ABOUT JORDAN EAMAN', 'title');
        this.print('═══════════════════════════════════════════════════════════════', 'separator');
        this.print('');
        this.print('Location: American designer based in Paris, France since 2015');
        this.print('');
        this.print('Professional Approach:');
        this.print('I consider myself, first and foremost, a service designer, and use');
        this.print('service design methods and tools to build a systemic analysis and');
        this.print('approach to each of my projects.');
        this.print('');
        this.print('Skills & Tools:');
        this.print('  • Sketch');
        this.print('  • Adobe Creative Cloud');
        this.print('  • Figma');
        this.print('  • Notion');
        this.print('  • WordPress/Elementor');
        this.print('');
        this.print('Notable Clients:');
        this.print('  • Sennder');
        this.print('  • Bluenove');
        this.print('  • Michelin');
        this.print('  • Nexity');
        this.print("  • Monaco's government office");
        this.print('');
        this.print('Expertise Areas:');
        this.print('Working across cities, web, services, applications, and research');
        this.print('& analysis, positioning design as foundational to innovation and');
        this.print('progress.');
        this.print('');
        this.print('Contact:');
        this.print('  Email: JordanEAman@gmail.com');
        this.print('  Social: Medium, LinkedIn');
        this.print('');
    }

    clear() {
        this.terminalOutput.innerHTML = '';
        this.print('Screen cleared. Type "help" for commands or "menu" for main menu.', 'instruction');
        this.print('');
    }
}

// Global instance
let terminal;
