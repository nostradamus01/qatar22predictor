function MainPage() {
    const mainEl = document.createElement('div');

    //<span class="nav-item" data-goto="groups">Groups</span>

    mainEl.insertAdjacentHTML('afterbegin', `
        <link rel="stylesheet" href="styles/main.css">

        <div class="main-content">
            <header class="header">
                <nav class="nav">
                    <span class="nav-item active" data-goto="playoff">Playoff</span>
                    <span class="nav-item" data-goto="points">Points</span>
                </nav>
            </header>

            <main class="main">
                <div class="content"></div>
                <footer class="footer">
                    <div>
                        <button class="logout-btn">Logout</button>
                    </div>
                    <span>FIFA Qatar World Cup 2022 Predictor By MainNightDev</span>
                </footer>
            </main>            
        </div>
    `);

    const loadContent = (content) => {
        const contentCmp = mainEl.querySelector('.content');
        contentCmp.innerHTML = '';
        contentCmp.insertAdjacentElement('afterbegin', content);
    }

    const addLoader = () => {
        const loader = `
            <div class="inner-loader">
                <div class="loader-cmp">
                    <div class="circle cyan"></div>
                    <div class="circle magenta"></div>
                    <div class="circle yellow"></div>
                </div>
            </div>
        `;
        const contentCmp = mainEl.querySelector('.content');
        contentCmp.innerHTML = '';
        contentCmp.insertAdjacentHTML('afterbegin', loader);
    }

    (async () => {
        addLoader();
        const navItems = mainEl.querySelectorAll('.nav-item');
        navItems.forEach((item) => {
            item.addEventListener('click', () => {
                if (!item.classList.contains('active')) {
                    addLoader();
                    navItems.forEach(nav => {
                        nav.classList.remove('active');
                    });
                    item.classList.add('active');
                    let page = null;
                    const pageName = item.dataset.goto;
                    switch (pageName) {
                        case 'groups':
                            GroupPage((el) => {
                                loadContent(el);
                            });
                            break;
                        case 'playoff':
                            PlayoffPage((el) => {
                                loadContent(el);
                            });
                            break;
                        case 'points':
                            PointsPage((el) => {
                                loadContent(el);
                            });
                            break;
                    }
                }
            });
        });

        PlayoffPage((el) => {
            loadContent(el);
        });

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

