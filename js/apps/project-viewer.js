// Project Viewer Application

class ProjectViewer {
    constructor() {
        this.currentProject = null;
    }

    async openProject(project) {
        const windowId = windowManager.createWindow({
            title: project.title || project.name,
            width: 700,
            height: 500,
            content: '<div style="padding: 20px; text-align: center;">Loading project...</div>'
        });

        // Load project content
        try {
            const content = await portfolioLoader.loadProject(project.file);
            const formattedContent = portfolioLoader.parseProjectContent(content, project.name);

            // Update window content
            const contentEl = windowManager.getWindowContent(windowId);
            if (contentEl) {
                contentEl.innerHTML = formattedContent;
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

    showAboutMe() {
        const content = portfolioLoader.getAboutMeContent();

        windowManager.createWindow({
            title: 'About Jordan Eaman',
            width: 600,
            height: 500,
            content: content
        });
    }
}

// Global instance
window.projectViewer = new ProjectViewer();
