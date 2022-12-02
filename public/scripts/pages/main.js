function MainPage() {
    const mainEl = document.createElement('div');

    mainEl.insertAdjacentHTML('afterbegin', `
        <link rel="stylesheet" href="styles/main.css">

        <div class="main-content">
            <header class="header">
                <nav class="nav">
                    <span class="nav-item" data-goto="groups">Groups</span>
                    <span class="nav-item active" data-goto="playoff">Playoff</span>
                    <span class="nav-item" data-goto="points">Points</span>
                </nav>
            </header>

            <main class="main"></main>

            <footer class="footer">
                <div>
                    <button class="logout-btn">Logout</button>
                </div>
                <span>FIFA Qatar World Cup 2022 Predictor By MainNightDev</span>
            </footer>
        </div>
    `);

    const loadContent = (content) => {
        const mainCmp = mainEl.querySelector('.main');
        mainCmp.innerHTML = '';
        mainCmp.insertAdjacentElement('afterbegin', content);
    }

    (async () => {
        const navItems = mainEl.querySelectorAll('.nav-item');
        navItems.forEach((item) => {
            item.addEventListener('click', () => {
                if (!item.classList.contains('active')) {
                    navItems.forEach(nav => {
                        nav.classList.remove('active');
                    });
                    item.classList.add('active');
                    let page = null;
                    const pageName = item.dataset.goto;
                    switch (pageName) {
                        case 'groups':
                            page = GroupPage();
                            break;
                        case 'playoff':
                            page = PlayoffPage();
                            break;
                        case 'points':
                            page = PointsPage();
                            break;
                    }
                    loadContent(page);
                }
            });
        });

        loadContent(PlayoffPage());

        const logoutBtn = mainEl.querySelector('.logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                startLoader();
                setTimeout(() => {
                    loadPage(LoginPage());
                }, 500);
            });
        }

        stopLoader();
    })();

    return mainEl;
}

