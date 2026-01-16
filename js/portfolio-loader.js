// Portfolio Content Loader

class PortfolioLoader {
    constructor() {
        this.baseURL = '../Jordaneaman Site/text/exact/';
        this.cache = {};
    }

    async loadProject(filename) {
        // Check cache first
        if (this.cache[filename]) {
            return this.cache[filename];
        }

        try {
            const response = await fetch(this.baseURL + filename);
            if (!response.ok) {
                throw new Error('Failed to load project file');
            }

            const text = await response.text();
            this.cache[filename] = text;
            return text;
        } catch (error) {
            console.error('Error loading project:', error);
            return this.getFallbackContent(filename);
        }
    }

    getFallbackContent(filename) {
        // Return demo content if file can't be loaded
        return `Portfolio Project

This is a demo of the Windows 98 interface.

Project file: ${filename}

In a production environment, this would load the actual content from your portfolio text files.

To enable loading:
1. Serve this site through a local web server (not file://)
2. Ensure the Jordaneaman Site folder is accessible at ../Jordaneaman Site/

Features:
• Windows 98 authentic interface
• Draggable windows
• Start menu and taskbar
• Desktop icons for each project
• Minimizable, maximizable windows

This is a creative way to showcase design work with a nostalgic twist!`;
    }

    parseProjectContent(text, projectName) {
        // Clean up the text
        let cleanText = text.replace(/top of page/g, '')
                           .replace(/bottom of page/g, '')
                           .replace(/WorkAbout Me \+ XP/g, '')
                           .replace(/About Me/g, '')
                           .replace(/\|/g, '')
                           .replace(/Portfolio/g, '')
                           .trim();

        // Split by multiple markers to create paragraphs
        cleanText = cleanText.replace(/​/g, '\n\n'); // Zero-width space to paragraph break
        cleanText = cleanText.replace(/([.!?])\s+([A-Z])/g, '$1\n\n$2'); // Period followed by capital = new paragraph
        cleanText = cleanText.replace(/(\d{4}\s*-\s*\d{4})/g, '\n\n$1'); // Year ranges
        cleanText = cleanText.replace(/(\d{4}\s*-\s*present)/gi, '\n\n$1'); // Year - present

        const paragraphs = cleanText.split('\n\n').filter(p => p.trim());

        // Create formatted content
        let content = '<div style="padding: 20px; font-family: Arial, sans-serif; line-height: 1.6; color: #000000;">';
        content += `<h2 style="color: #000080; margin-bottom: 16px; border-bottom: 2px solid #000080; padding-bottom: 8px;">${projectName}</h2>`;

        paragraphs.forEach((para, index) => {
            const trimmed = para.trim();
            if (trimmed && trimmed.length > 0) {
                // Check if it's a heading (short, all caps or title case)
                if (trimmed.length < 50 && (trimmed === trimmed.toUpperCase() || /^[A-Z]/.test(trimmed))) {
                    content += `<h3 style="color: #000080; margin-top: 20px; margin-bottom: 10px; font-size: 14px;">${this.escapeHtml(trimmed)}</h3>`;
                } else {
                    content += `<p style="margin-bottom: 14px; text-align: justify;">${this.escapeHtml(trimmed)}</p>`;
                }
            }
        });

        content += '</div>';
        return content;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        let html = div.innerHTML;

        // Convert URLs to links
        html = html.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" style="color: #000080; text-decoration: underline;">$1</a>');

        // Convert www. URLs to links
        html = html.replace(/(?<!https?:\/\/)(www\.[^\s]+)/g, '<a href="http://$1" target="_blank" style="color: #000080; text-decoration: underline;">$1</a>');

        // Convert email addresses to mailto links
        html = html.replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi, '<a href="mailto:$1" style="color: #000080; text-decoration: underline;">$1</a>');

        return html;
    }

    getAboutMeContent() {
        return `
            <div style="padding: 20px; font-family: Arial, sans-serif; line-height: 1.6;">
                <h2 style="color: #000080; margin-bottom: 16px;">About Jordan Eaman</h2>

                <p style="margin-bottom: 12px;">
                    <strong>Location:</strong> American designer based in Paris, France since 2015
                </p>

                <p style="margin-bottom: 12px;">
                    I consider myself, first and foremost, a service designer, and use service design
                    methods and tools to build a systemic analysis and approach to each of my projects.
                </p>

                <h3 style="color: #000080; margin: 20px 0 12px 0;">Skills & Tools</h3>
                <ul style="margin-left: 20px; margin-bottom: 16px;">
                    <li>Sketch</li>
                    <li>Adobe Creative Cloud</li>
                    <li>Figma</li>
                    <li>Notion</li>
                    <li>WordPress/Elementor</li>
                </ul>

                <h3 style="color: #000080; margin: 20px 0 12px 0;">Notable Clients</h3>
                <ul style="margin-left: 20px; margin-bottom: 16px;">
                    <li>Sennder</li>
                    <li>Bluenove</li>
                    <li>Michelin</li>
                    <li>Nexity</li>
                    <li>Monaco's government office</li>
                </ul>

                <h3 style="color: #000080; margin: 20px 0 12px 0;">Expertise Areas</h3>
                <p style="margin-bottom: 12px;">
                    Working across cities, web, services, applications, and research & analysis,
                    positioning design as foundational to innovation and progress.
                </p>

                <p style="margin-top: 20px; padding: 12px; background: #fffacd; border: 1px solid #f0e68c;">
                    <strong>Contact:</strong> JordanEAman@gmail.com<br>
                    <strong>Social:</strong> Medium, LinkedIn
                </p>

                <p style="margin-top: 20px; text-align: center;">
                    <a href="#" onclick="event.preventDefault(); if(window.myspaceApp) window.myspaceApp.open();"
                       style="color: #000080; font-weight: bold; text-decoration: underline; cursor: pointer;">
                        🌐 See my MySpace profile
                    </a>
                </p>
            </div>
        `;
    }
}

// Global instance
const portfolioLoader = new PortfolioLoader();
