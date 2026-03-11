// Project Viewer Application

class ProjectViewer {
    constructor() {
        this.currentProject = null;
        this.projectImages = this.getProjectImages();
    }

    getProjectImages() {
        // Map of project types to their image files
        return {
            'sennos': [
                { file: 'assets/projects/sennos/sennder-logo.png', caption: 'Sennder - Europe\'s Leading Digital Freight Forwarder' },
                { file: 'assets/projects/sennos/analytics-dashboard.png', caption: 'Shipper Dashboard - Key Metrics and Active Shipments' },
                { file: 'assets/projects/sennos/notifications-iterations.png', caption: 'Notification System UX Design Iterations (2022)' },
                { file: 'assets/projects/sennos/service-blueprint.png', caption: 'Service Design Blueprint - Carrier Bidding System' },
                { file: 'assets/projects/sennos/tracking-interface.png', caption: 'Shipment Tracking Interface with Live GPS' },
                { file: 'assets/projects/sennos/shipment-table.png', caption: 'Carrier Marketplace - Shipment List View' },
                { file: 'assets/projects/sennos/owf-dashboard.png', caption: 'Shipper Order Management Dashboard (OWF)' }
            ],
            'dotank': [
                { file: 'assets/projects/dotank/owf-interface.jpg', caption: 'OWF Platform - Order and Package Management Interface' },
                { file: 'assets/projects/dotank/packaging-optimization.png', caption: 'Packaging Optimization Tool - 3D Element Reduction Analysis' },
                { file: 'assets/projects/dotank/communication-matrix.png', caption: 'Communication Matrix - Packaging Element Functionality Mapping' }
            ],
            'assembl': [
                { file: 'assets/projects/assembl/bluenove-logo.png', caption: 'Bluenove - Opening Organizations' },
                { file: 'assets/projects/assembl/consultation.png', caption: 'Assembl V3 Consultation Interface' },
                { file: 'assets/projects/assembl/service-map.png', caption: 'Service Design Methodology - System Mapping' },
                { file: 'assets/projects/assembl/metrics-1.png', caption: 'Analytics Dashboard - Co-construction Metrics' },
                { file: 'assets/projects/assembl/metrics-2.png', caption: 'Analytics Dashboard - Divergence View' },
                { file: 'assets/projects/assembl/moderation.png', caption: 'Back-office Moderation Interface' },
                { file: 'assets/projects/assembl/styleguide.png', caption: 'Assembl Design System - Style Guide 2021' },
                { file: 'assets/projects/assembl/topics.png', caption: 'Consultation Themes Interface' },
                { file: 'assets/projects/assembl/notion.png', caption: 'Product Design Documentation' }
            ]
        };
    }

    async openProject(project) {
        const windowId = windowManager.createWindow({
            title: project.title || project.name,
            width: 800,
            height: 600,
            content: '<div style="padding: 20px; text-align: center;">Loading project...</div>'
        });

        // Load project content
        try {
            const content = await portfolioLoader.loadProject(project.file);
            const presentationContent = this.createPresentation(content, project);

            // Update window content
            const contentEl = windowManager.getWindowContent(windowId);
            if (contentEl) {
                contentEl.innerHTML = presentationContent;
            }
        } catch (error) {
            const contentEl = windowManager.getWindowContent(windowId);
            if (contentEl) {
                contentEl.innerHTML = `
                    <div style="padding: 20px; color: #800000;">
                        <h3>Error Loading Project</h3>
                        <p>Could not load project content.</p>
                        <p style="font-size: 10px; margin-top: 12px;">
                            Make sure you're serving this site through a web server.
                        </p>
                    </div>
                `;
            }
        }
    }

    createPresentation(rawContent, project) {
        // Clean up the raw text
        let cleanText = rawContent
            .replace(/top of page/g, '')
            .replace(/bottom of page/g, '')
            .replace(/WorkAbout Me \+ XP/g, '')
            .replace(/About Me/g, '')
            .replace(/Portfolio/g, '')
            .replace(/Toolbox/g, '')
            .replace(/Screens/g, '')
            .replace(/Back/g, '')
            .replace(/© 2020 Jordan AMAN JordanEAman@gmail.com/g, '')
            .replace(/\| Portfolio/g, '')
            .trim();

        // Extract title and subtitle from first line
        const lines = cleanText.split('\n').filter(line => line.trim().length > 0);
        let title = project.title || project.name;
        let subtitle = '';
        let description = '';
        let sections = [];

        // Parse the content
        if (lines.length > 0) {
            // First line usually has title and description
            const firstLine = lines[0];
            const parts = firstLine.split(/\d{4}/); // Split by year if present

            if (parts.length > 1) {
                subtitle = parts[0].replace(title.replace(/\n/g, ' '), '').trim();
                description = parts[1].split(':').slice(1).join(':').trim();
            } else {
                subtitle = firstLine.replace(title.replace(/\n/g, ' '), '').trim();
            }
        }

        // Parse remaining content into sections
        let currentSection = { heading: '', paragraphs: [] };
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();

            if (line.length === 0) continue;

            // Check if it's a section header (short line or ends with :)
            if ((line.length < 50 && !line.includes('.')) || line.endsWith(':')) {
                if (currentSection.heading || currentSection.paragraphs.length > 0) {
                    sections.push(currentSection);
                }
                currentSection = { heading: line.replace(':', ''), paragraphs: [] };
            } else {
                currentSection.paragraphs.push(line);
            }
        }
        if (currentSection.heading || currentSection.paragraphs.length > 0) {
            sections.push(currentSection);
        }

        // Get project images if available
        const projectImages = this.projectImages[project.type] || [];

        // Create scrolling presentation
        let html = `
            <div style="
                height: 100%;
                overflow-y: auto;
                overflow-x: hidden;
                background: #ffffff;
                font-family: Arial, sans-serif;
            ">
                <div style="max-width: 700px; margin: 0 auto; padding: 40px 20px 60px 20px;">
                    <h1 style="
                        font-size: 36px;
                        color: #000080;
                        margin-bottom: 12px;
                        font-weight: bold;
                        line-height: 1.2;
                    ">${this.escapeHtml(title.replace(/\n/g, ' '))}</h1>
        `;

        if (subtitle) {
            html += `
                <p style="
                    font-size: 20px;
                    color: #404040;
                    margin-bottom: 8px;
                    line-height: 1.4;
                    font-style: italic;
                ">${this.escapeHtml(subtitle)}</p>
            `;
        }

        if (description) {
            html += `
                <p style="
                    font-size: 13px;
                    color: #666666;
                    margin-bottom: 32px;
                    padding-bottom: 16px;
                    border-bottom: 2px solid #000080;
                ">${this.escapeHtml(description)}</p>
            `;
        } else {
            html += '<div style="height: 32px; border-bottom: 2px solid #000080; margin-bottom: 32px;"></div>';
        }

        // Add first image if available (logo or hero)
        if (projectImages.length > 0) {
            html += this.createImageSection(projectImages[0]);
        }

        // Add sections with images interspersed
        let imageIndex = 1;
        sections.forEach((section, sectionIndex) => {
            // Add heading if exists
            if (section.heading) {
                html += `
                    <h3 style="
                        font-size: 18px;
                        color: #000080;
                        margin-top: 32px;
                        margin-bottom: 16px;
                        font-weight: bold;
                    ">${this.escapeHtml(section.heading)}</h3>
                `;
            }

            // Add paragraphs
            section.paragraphs.forEach(para => {
                if (para.trim()) {
                    html += `
                        <p style="
                            font-size: 14px;
                            line-height: 1.8;
                            margin-bottom: 16px;
                            color: #000000;
                            text-align: justify;
                        ">${this.escapeHtml(para.trim())}</p>
                    `;
                }
            });

            // Add image after certain sections
            if (imageIndex < projectImages.length && sectionIndex < sections.length - 1) {
                html += this.createImageSection(projectImages[imageIndex]);
                imageIndex++;
            }
        });

        // Add remaining images at the end
        while (imageIndex < projectImages.length) {
            html += this.createImageSection(projectImages[imageIndex]);
            imageIndex++;
        }

        html += `
                </div>
            </div>
        `;

        return html;
    }

    createImageSection(imageData) {
        if (!imageData) return '';

        return `
            <div style="
                margin: 32px 0;
                padding: 16px;
                background: #f5f5f5;
                border: 1px solid #cccccc;
                border-radius: 4px;
            ">
                <img src="${imageData.file}" alt="${imageData.caption || 'Project image'}" style="
                    width: 100%;
                    height: auto;
                    display: block;
                    margin-bottom: 12px;
                    border: 1px solid #999999;
                ">
                ${imageData.caption ? `
                    <p style="
                        font-size: 12px;
                        color: #666666;
                        text-align: center;
                        font-style: italic;
                        margin: 0;
                    ">${this.escapeHtml(imageData.caption)}</p>
                ` : ''}
            </div>
        `;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        let html = div.innerHTML;

        // Convert URLs to links
        html = html.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" style="color: #000080; text-decoration: underline;">$1</a>');
        html = html.replace(/(?<!https?:\/\/)(www\.[^\s]+)/g, '<a href="http://$1" target="_blank" style="color: #000080; text-decoration: underline;">$1</a>');
        html = html.replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi, '<a href="mailto:$1" style="color: #000080; text-decoration: underline;">$1</a>');

        return html;
    }

    showAboutMe() {
        const content = portfolioLoader.getAboutMeContent();

        windowManager.createWindow({
            title: 'About Jordan Aman',
            width: 650,
            height: 550,
            content: content
        });
    }
}

// Global instance
window.projectViewer = new ProjectViewer();
