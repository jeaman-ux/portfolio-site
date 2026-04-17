// MySpace Profile Application

class MySpaceApp {
    constructor() {
        this.isOpen = false;
    }

    open() {
        if (this.isOpen) {
            return;
        }

        const content = this.generateMySpaceHTML();

        windowManager.createWindow({
            title: 'Microsoft Internet Explorer',
            width: 900,
            height: 600,
            x: 470,
            y: 0,
            content: content,
            onClose: () => {
                this.isOpen = false;
            }
        });

        this.isOpen = true;
    }

    generateMySpaceHTML() {
        return `
            <style>
                /* Internet Explorer Interface */
                .ie-container {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    font-family: 'MS Sans Serif', Arial, sans-serif;
                    font-size: 11px;
                }

                .ie-menubar {
                    background: #c0c0c0;
                    border-bottom: 1px solid #ffffff;
                    display: flex;
                    padding: 2px 4px;
                }

                .ie-menu-item {
                    padding: 2px 8px;
                    cursor: pointer;
                }

                .ie-menu-item:hover {
                    background: #000080;
                    color: #ffffff;
                }

                .ie-toolbar {
                    background: #c0c0c0;
                    border-bottom: 1px solid #808080;
                    padding: 3px 4px;
                    display: flex;
                    align-items: center;
                    gap: 1px;
                }

                .ie-toolbar-button {
                    background: #c0c0c0;
                    border-top: 1px solid #ffffff;
                    border-left: 1px solid #ffffff;
                    border-right: 1px solid #808080;
                    border-bottom: 1px solid #808080;
                    padding: 3px;
                    font-size: 11px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 24px;
                    height: 22px;
                }

                .ie-toolbar-button:hover {
                    background: #dfdfdf;
                }

                .ie-toolbar-button:active {
                    border-top: 1px solid #808080;
                    border-left: 1px solid #808080;
                    border-right: 1px solid #ffffff;
                    border-bottom: 1px solid #ffffff;
                }

                .ie-toolbar-button img {
                    width: 16px;
                    height: 16px;
                    display: block;
                }

                .ie-toolbar-button span {
                    font-size: 12px;
                    color: #000000;
                    line-height: 1;
                }

                .ie-toolbar-separator {
                    width: 1px;
                    height: 20px;
                    background: #808080;
                    margin: 0 3px;
                }

                .ie-addressbar {
                    background: #c0c0c0;
                    border-bottom: 1px solid #808080;
                    padding: 4px 6px;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }

                .ie-addressbar-label {
                    font-size: 11px;
                    font-weight: normal;
                }

                .ie-addressbar-icon {
                    width: 16px;
                    height: 16px;
                }

                .ie-addressbar-input-container {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    background: #ffffff;
                    border-top: 1px solid #808080;
                    border-left: 1px solid #808080;
                    border-right: 1px solid #ffffff;
                    border-bottom: 1px solid #ffffff;
                }

                .ie-addressbar-input {
                    flex: 1;
                    background: transparent;
                    border: none;
                    padding: 3px 6px;
                    font-family: Arial, sans-serif;
                    font-size: 11px;
                    outline: none;
                }

                .ie-addressbar-dropdown {
                    background: #c0c0c0;
                    border-left: 1px solid #808080;
                    border-right: 1px solid #ffffff;
                    width: 16px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    font-size: 8px;
                }

                .ie-addressbar-dropdown:active {
                    border-left: 1px solid #ffffff;
                    border-right: 1px solid #808080;
                }

                .ie-go-button {
                    background: #c0c0c0;
                    border-top: 1px solid #ffffff;
                    border-left: 1px solid #ffffff;
                    border-right: 1px solid #808080;
                    border-bottom: 1px solid #808080;
                    padding: 3px 10px;
                    font-size: 11px;
                    cursor: pointer;
                }

                .ie-go-button:active {
                    border-top: 1px solid #808080;
                    border-left: 1px solid #808080;
                    border-right: 1px solid #ffffff;
                    border-bottom: 1px solid #ffffff;
                }

                .ie-links-button {
                    background: #c0c0c0;
                    border-top: 1px solid #ffffff;
                    border-left: 1px solid #ffffff;
                    border-right: 1px solid #808080;
                    border-bottom: 1px solid #808080;
                    padding: 3px 8px;
                    font-size: 11px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }

                .ie-links-button:active {
                    border-top: 1px solid #808080;
                    border-left: 1px solid #808080;
                    border-right: 1px solid #ffffff;
                    border-bottom: 1px solid #ffffff;
                }

                .ie-content {
                    flex: 1;
                    overflow: auto;
                    background: transparent;
                    border-top: 2px solid #808080;
                }

                .ie-statusbar {
                    background: #c0c0c0;
                    border-top: 1px solid #ffffff;
                    padding: 2px 4px;
                    font-size: 11px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .ie-statusbar-section {
                    border-top: 1px solid #808080;
                    border-left: 1px solid #808080;
                    border-right: 1px solid #ffffff;
                    border-bottom: 1px solid #ffffff;
                    padding: 1px 4px;
                }

                /* MySpace Content */
                .myspace-container {
                    font-family: Arial, Verdana, sans-serif;
                    font-size: 11px;
                    background-color: #000000;
                    background-image: url('assets/myspace-bg.jpg');
                    background-repeat: no-repeat;
                    background-position: bottom left;
                    background-size: cover;
                    background-attachment: scroll;
                    color: #FFFFFF;
                    margin: 0;
                    padding: 0;
                    min-height: 100%;
                }

                .myspace-nav {
                    background: rgba(0, 0, 0, 0.85);
                    padding: 8px 10px;
                    border-bottom: 2px solid #FF0000;
                }

                .myspace-nav-links {
                    display: flex;
                    gap: 15px;
                    flex-wrap: wrap;
                }

                .myspace-nav-link {
                    color: #7FFF00;
                    text-decoration: none;
                    font-size: 10px;
                    font-weight: bold;
                }

                .myspace-nav-link:hover {
                    text-decoration: underline;
                }

                .myspace-content {
                    padding: 15px;
                    background: transparent;
                }

                .myspace-profile {
                    background: transparent;
                }

                .myspace-header {
                    background: #2A2A2A;
                    padding: 12px;
                    border: 2px solid #FF0000;
                    margin-bottom: 10px;
                }

                .myspace-name {
                    font-size: 18px;
                    font-weight: bold;
                    color: #FFFFFF;
                    margin-bottom: 5px;
                }

                .myspace-tagline {
                    font-size: 11px;
                    color: #7FFF00;
                    font-style: italic;
                }

                .myspace-main {
                    display: flex;
                    gap: 10px;
                    padding: 10px;
                }

                .myspace-sidebar {
                    width: 200px;
                    flex-shrink: 0;
                }

                .myspace-body {
                    flex: 1;
                }

                .myspace-photo {
                    width: 200px;
                    height: 200px;
                    background: #1A1A1A;
                    border: 2px solid #FF0000;
                    margin-bottom: 10px;
                    overflow: hidden;
                }

                .myspace-photo img {
                    display: block;
                }

                .myspace-contact-box {
                    background: #2A2A2A;
                    border: 2px solid #FF0000;
                    padding: 10px;
                    margin-bottom: 10px;
                }

                .myspace-contact-title {
                    font-weight: bold;
                    color: #FFFFFF;
                    margin-bottom: 8px;
                    font-size: 12px;
                }

                .myspace-contact-link {
                    display: block;
                    color: #7FFF00;
                    text-decoration: none;
                    padding: 3px 0;
                    font-size: 10px;
                    font-weight: bold;
                }

                .myspace-contact-link:hover {
                    text-decoration: underline;
                }

                .myspace-section {
                    background: #2A2A2A;
                    border: 2px solid #FF0000;
                    margin-bottom: 10px;
                    padding: 12px;
                }

                .myspace-section-title {
                    font-weight: bold;
                    color: #FFFFFF;
                    margin-bottom: 10px;
                    font-size: 13px;
                    border-bottom: 1px solid #FF0000;
                    padding-bottom: 5px;
                }

                .myspace-section-content {
                    color: #FFFFFF;
                    line-height: 1.6;
                }

                .myspace-section-content a {
                    color: #7FFF00;
                    font-weight: bold;
                }

                .myspace-table {
                    width: 100%;
                    border-collapse: collapse;
                }

                .myspace-table td {
                    padding: 6px 4px;
                    vertical-align: top;
                }

                .myspace-table a {
                    color: #7FFF00;
                    font-weight: bold;
                }

                .myspace-label {
                    font-weight: bold;
                    color: #FFFFFF;
                    width: 150px;
                }

                .myspace-friends-box {
                    background: #2A2A2A;
                    border: 2px solid #FF0000;
                    padding: 12px;
                    margin-bottom: 10px;
                }

                .myspace-friends-grid {
                    display: grid;
                    grid-template-columns: repeat(5, 1fr);
                    gap: 12px;
                    margin-top: 10px;
                }

                .myspace-friend {
                    text-align: center;
                }

                .myspace-friend-photo {
                    width: 70px;
                    height: 90px;
                    background: #1A1A1A;
                    border: 1px solid #666666;
                    margin: 0 auto 5px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 9px;
                    color: #666666;
                }

                .myspace-friend-name {
                    font-size: 10px;
                    color: #7FFF00;
                    font-weight: bold;
                }

                .myspace-view-all {
                    text-align: center;
                    margin-top: 12px;
                    font-size: 11px;
                }

                .myspace-view-all a {
                    color: #7FFF00;
                    font-weight: bold;
                    text-decoration: none;
                }

                .myspace-view-all a:hover {
                    text-decoration: underline;
                }

                .myspace-comments-box {
                    background: #2A2A2A;
                    border: 2px solid #FF0000;
                    padding: 12px;
                }

                .myspace-comment {
                    border-bottom: 1px solid #444444;
                    padding: 12px 0;
                }

                .myspace-comment:last-child {
                    border-bottom: none;
                }

                .myspace-comment-header {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 8px;
                }

                .myspace-comment-photo {
                    width: 50px;
                    height: 65px;
                    background: #1A1A1A;
                    border: 1px solid #666666;
                    flex-shrink: 0;
                }

                .myspace-comment-info {
                    flex: 1;
                }

                .myspace-comment-name {
                    font-weight: bold;
                    color: #7FFF00;
                    font-size: 11px;
                }

                .myspace-comment-date {
                    font-size: 10px;
                    color: #CCCCCC;
                }

                .myspace-comment-text {
                    padding-left: 60px;
                    color: #FFFFFF;
                    line-height: 1.5;
                    font-size: 11px;
                }

                .myspace-comment-text a {
                    color: #7FFF00;
                    font-weight: bold;
                }

                .myspace-add-comment {
                    text-align: right;
                    margin-top: 10px;
                    padding-top: 10px;
                    border-top: 1px solid #444444;
                }

                .myspace-add-comment a {
                    color: #7FFF00;
                    font-weight: bold;
                    text-decoration: none;
                    font-size: 11px;
                }

                .myspace-add-comment a:hover {
                    text-decoration: underline;
                }
            </style>

            <div class="ie-container">
                <!-- Menu Bar -->
                <div class="ie-menubar">
                    <div class="ie-menu-item">File</div>
                    <div class="ie-menu-item">Edit</div>
                    <div class="ie-menu-item">View</div>
                    <div class="ie-menu-item">Favorites</div>
                    <div class="ie-menu-item">Tools</div>
                    <div class="ie-menu-item">Help</div>
                </div>

                <!-- Toolbar -->
                <div class="ie-toolbar">
                    <button class="ie-toolbar-button">
                        <span>◀</span>
                    </button>
                    <button class="ie-toolbar-button">
                        <span>▶</span>
                    </button>
                    <button class="ie-toolbar-button">
                        <span>⬛</span>
                    </button>
                    <button class="ie-toolbar-button">
                        <img src="assets/icons/refresh.png" alt="">
                    </button>
                    <button class="ie-toolbar-button">
                        <img src="assets/icons/home.png" alt="">
                    </button>
                    <div class="ie-toolbar-separator"></div>
                    <button class="ie-toolbar-button">
                        <img src="assets/icons/search.png" alt="">
                    </button>
                    <button class="ie-toolbar-button">
                        <img src="assets/icons/favorites.png" alt="">
                    </button>
                    <button class="ie-toolbar-button">
                        <img src="assets/icons/history.png" alt="">
                    </button>
                    <div class="ie-toolbar-separator"></div>
                    <button class="ie-toolbar-button">
                        <img src="assets/icons/mail.png" alt="">
                    </button>
                    <button class="ie-toolbar-button">
                        <img src="assets/icons/print.png" alt="">
                    </button>
                </div>

                <!-- Address Bar -->
                <div class="ie-addressbar">
                    <span class="ie-addressbar-label">Address</span>
                    <img src="assets/icons/internet-explorer.png" class="ie-addressbar-icon" alt="">
                    <div class="ie-addressbar-input-container">
                        <input type="text" class="ie-addressbar-input" value="http://www.myspace.com/jordanaman" readonly>
                        <div class="ie-addressbar-dropdown">▼</div>
                    </div>
                    <button class="ie-go-button">Go</button>
                    <button class="ie-links-button">
                        <span>Links</span>
                        <span>»</span>
                    </button>
                </div>

                <!-- Content -->
                <div class="ie-content">
                    <div class="myspace-container">
                        <!-- Navigation Bar -->
                        <div class="myspace-nav">
                    <div class="myspace-nav-links">
                        <a href="#" class="myspace-nav-link">Home</a>
                        <a href="#" class="myspace-nav-link">Browse</a>
                        <a href="#" class="myspace-nav-link">Search</a>
                        <a href="#" class="myspace-nav-link">Invite</a>
                        <a href="#" class="myspace-nav-link">Film</a>
                        <a href="#" class="myspace-nav-link">Mail</a>
                        <a href="#" class="myspace-nav-link">Blog</a>
                        <a href="#" class="myspace-nav-link">Favorites</a>
                        <a href="#" class="myspace-nav-link">Forum</a>
                        <a href="#" class="myspace-nav-link">Groups</a>
                        <a href="#" class="myspace-nav-link">Events</a>
                        <a href="#" class="myspace-nav-link">Videos</a>
                        <a href="#" class="myspace-nav-link">Music</a>
                        <a href="#" class="myspace-nav-link">Comedy</a>
                        <a href="#" class="myspace-nav-link">Classifieds</a>
                    </div>
                </div>

                <!-- Content Area -->
                <div class="myspace-content">
                    <div class="myspace-profile">
                        <!-- Profile Header -->
                        <div class="myspace-header">
                            <div class="myspace-name">Jordan Aman</div>
                            <div class="myspace-tagline">"Design lays the groundwork for innovation and progress."</div>
                        </div>

                        <!-- Main Content -->
                        <div class="myspace-main">
                            <!-- Sidebar -->
                            <div class="myspace-sidebar">
                                <!-- Profile Photo -->
                                <div class="myspace-photo">
                                    <img src="assets/jordan-profile.png" alt="Jordan" style="width: 100%; height: 100%; object-fit: cover;">
                                </div>

                                <!-- Contact Box -->
                                <div class="myspace-contact-box">
                                    <div class="myspace-contact-title">Contacting Jordan</div>
                                    <a href="mailto:jordaneaman@gmail.com" class="myspace-contact-link">Send Message</a>
                                    <a href="#" class="myspace-contact-link">Forward to Friend</a>
                                    <a href="#" class="myspace-contact-link">Add to Friends</a>
                                    <a href="#" class="myspace-contact-link">Add to Favorites</a>
                                    <a href="#" class="myspace-contact-link">Instant Message</a>
                                    <a href="#" class="myspace-contact-link">Block User</a>
                                    <a href="#" class="myspace-contact-link">Add to Group</a>
                                    <a href="#" class="myspace-contact-link">Rank User</a>
                                </div>
                            </div>

                            <!-- Main Body -->
                            <div class="myspace-body">
                                <!-- Profile Info -->
                                <div class="myspace-section">
                                    <div class="myspace-section-title">Jordan's Details</div>
                                    <table class="myspace-table">
                                        <tr>
                                            <td class="myspace-label">Status:</td>
                                            <td>Senior Product Designer at Concord</td>
                                        </tr>
                                        <tr>
                                            <td class="myspace-label">Here For:</td>
                                            <td>Networking, Design Systems, AI Workflows</td>
                                        </tr>
                                        <tr>
                                            <td class="myspace-label">Location:</td>
                                            <td>Paris, France</td>
                                        </tr>
                                        <tr>
                                            <td class="myspace-label">Occupation:</td>
                                            <td>Product Design / Service Design</td>
                                        </tr>
                                        <tr>
                                            <td class="myspace-label">Education:</td>
                                            <td>Masters in Design for Smart Cities (Strate), BFA (Florida State)</td>
                                        </tr>
                                        <tr>
                                            <td class="myspace-label">Languages:</td>
                                            <td>English (native), French (bilingual), Spanish (basics)</td>
                                        </tr>
                                        <tr>
                                            <td class="myspace-label">Email:</td>
                                            <td><a href="mailto:jordaneaman@gmail.com">jordaneaman@gmail.com</a></td>
                                        </tr>
                                    </table>
                                </div>

                                <!-- About Me -->
                                <div class="myspace-section">
                                    <div class="myspace-section-title">About Me:</div>
                                    <div class="myspace-section-content">
                                        I believe that design is, at its roots, a powerful tool/domain that lays the groundwork for innovation and progress, and that there has never been a more important time for designers to reach and push any limits possible.
                                        <br><br>
                                        I am highly motivated by the future of design, as it extends far beyond conventional applications (services, experiences, products, etc.) like politics and management.
                                        <br><br>
                                        Currently piloting all design activity, research, Design system, project management, and AI workflow adoption at Concord. Previously worked at Sennder (logistics platforms), Bluenove (collective intelligence), and as a freelance consultant for Michelin, Nexity, and others.
                                    </div>
                                </div>

                                <!-- Who I'd Like to Meet -->
                                <div class="myspace-section">
                                    <div class="myspace-section-title">Who I'd Like to Meet:</div>
                                    <div class="myspace-section-content">
                                        Designers pushing boundaries beyond conventional applications, innovators working on digital infrastructures and policy-making, and teams focused on system/service design, urban UX, and AI workflows. Let's connect if you're working on projects that extend design's impact!
                                    </div>
                                </div>

                                <!-- Interests -->
                                <div class="myspace-section">
                                    <div class="myspace-section-title">Interests</div>
                                    <table class="myspace-table">
                                        <tr>
                                            <td class="myspace-label">Professional:</td>
                                            <td>Design Systems, Service Design, Urban UX Design, Digital Infrastructures, AI Workflows, Policy-Making Design</td>
                                        </tr>
                                        <tr>
                                            <td class="myspace-label">Tools:</td>
                                            <td>Figma, Adobe Creative Cloud, Claude Code, Miro, Webflow, HTML/CSS</td>
                                        </tr>
                                        <tr>
                                            <td class="myspace-label">Research Focus:</td>
                                            <td>Digital infrastructures, Design applied to policy-making, Smart Cities</td>
                                        </tr>
                                        <tr>
                                            <td class="myspace-label">Community:</td>
                                            <td>Secretary at Red Star Club Montreuil (diving/acrobatics), Member of Art Nunz International Contemporary Arts Collective</td>
                                        </tr>
                                    </table>
                                </div>

                                <!-- Blurbs -->
                                <div class="myspace-section">
                                    <div class="myspace-section-title">Jordan's Blurbs</div>
                                    <div class="myspace-section-content">
                                        <strong>Current Role (2023-present):</strong>
                                        <br>
                                        Senior Product Designer at Concord - Piloting all design activity, research, Design system, project management, and AI workflow adoption.
                                        <br><br>
                                        <strong>Previous Experience:</strong>
                                        <br>
                                        • Sennder (2021-2023): Senior Product Designer on 4 road freight logistics management platforms<br>
                                        • Bluenove (2019-2021): Lead Designer on "Assembl" collective intelligence platform<br>
                                        • 40/60 Service Design Studio (2019): Service/UX Designer internship<br>
                                        • Freelance (2018-2019): Service design for Michelin, UX/UI for Nexity and Matrice
                                        <br><br>
                                        <strong>Education & Research:</strong>
                                        <br>
                                        Masters in Design for Smart Cities from Strate École de Design (2019). Research focus on digital infrastructures and design applied to policy-making. Academic clients include Orange, Valéo, Région IDF, Lucitopia RDC, and La Principauté de Monaco.
                                    </div>
                                </div>

                                <!-- Friend Space -->
                                <div class="myspace-friends-box">
                                    <div class="myspace-section-title">Jordan's Friend Space (Top 5)</div>
                                    <div class="myspace-section-content" style="margin-bottom: 8px;">Jordan has <strong>500+ friends</strong>.</div>
                                    <div class="myspace-friends-grid">
                                        <div class="myspace-friend">
                                            <div class="myspace-friend-photo">[Photo]</div>
                                            <div class="myspace-friend-name">Marc</div>
                                        </div>
                                        <div class="myspace-friend">
                                            <div class="myspace-friend-photo">[Photo]</div>
                                            <div class="myspace-friend-name">Sophie</div>
                                        </div>
                                        <div class="myspace-friend">
                                            <div class="myspace-friend-photo">[Photo]</div>
                                            <div class="myspace-friend-name">Alex</div>
                                        </div>
                                        <div class="myspace-friend">
                                            <div class="myspace-friend-photo">[Photo]</div>
                                            <div class="myspace-friend-name">Claire</div>
                                        </div>
                                        <div class="myspace-friend">
                                            <div class="myspace-friend-photo">[Photo]</div>
                                            <div class="myspace-friend-name">Thomas</div>
                                        </div>
                                    </div>
                                    <div class="myspace-view-all">
                                        <a href="#">View All of Jordan's Friends</a>
                                    </div>
                                </div>

                                <!-- Comments -->
                                <div class="myspace-comments-box">
                                    <div class="myspace-section-title">Jordan's Friends Comments</div>

                                    <div class="myspace-comment">
                                        <div class="myspace-comment-header">
                                            <div class="myspace-comment-photo"></div>
                                            <div class="myspace-comment-info">
                                                <div class="myspace-comment-name">Marc (Concord)</div>
                                                <div class="myspace-comment-date">Feb 15 2024 4:32 PM</div>
                                            </div>
                                        </div>
                                        <div class="myspace-comment-text">
                                            Your work on the design system has been transformative. The AI workflow adoption is already saving the team hours each week!
                                        </div>
                                    </div>

                                    <div class="myspace-comment">
                                        <div class="myspace-comment-header">
                                            <div class="myspace-comment-photo"></div>
                                            <div class="myspace-comment-info">
                                                <div class="myspace-comment-name">Sophie (Bluenove)</div>
                                                <div class="myspace-comment-date">Jan 8 2024 11:15 AM</div>
                                            </div>
                                        </div>
                                        <div class="myspace-comment-text">
                                            Still thinking about the collective intelligence platform work we did together. Your approach to service design really pushed the boundaries!
                                        </div>
                                    </div>

                                    <div class="myspace-comment">
                                        <div class="myspace-comment-header">
                                            <div class="myspace-comment-photo"></div>
                                            <div class="myspace-comment-info">
                                                <div class="myspace-comment-name">Alex (Art Nunz)</div>
                                                <div class="myspace-comment-date">Dec 22 2023 7:48 PM</div>
                                            </div>
                                        </div>
                                        <div class="myspace-comment-text">
                                            Great seeing you at the collective's latest show. Your perspective on design extending into policy and urban systems is always inspiring.
                                        </div>
                                    </div>

                                    <div class="myspace-add-comment">
                                        <a href="#">Add Comment</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    </div>
                </div>

                <!-- Status Bar -->
                <div class="ie-statusbar">
                    <div class="ie-statusbar-section">Done</div>
                    <div style="flex: 1;"></div>
                    <div class="ie-statusbar-section">🌐 Internet</div>
                </div>
            </div>
        `;
    }
}

// Initialize MySpace app
window.myspaceApp = new MySpaceApp();
