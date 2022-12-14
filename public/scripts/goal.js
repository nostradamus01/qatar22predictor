const createCard = (match) => {
    return `
        <div class="card" id="${match.id}">
            <p class="clock">${match.date.toLocaleString()}</p>
            <div class="group">
                <div class="goals">
                    <div class="country">                      
                        <img class="flag" src="${match.team1Flag}" alt="">
                        <p class="name">${match.team1Code}</p>
                    </div>
                    <div class="open">
                        <div class="goals-count not-expanded">
                        <span>${match.team1Goals}</span>
                    </div>
                        <div class="open-numbers hidden" data-match="${match.matchNum}" data-team="${1}"></div>
                    </div>            
                </div>

                ${match.pointsCmp}

                <div class="goals">
                    <div class="open">
                        <div class="goals-count not-expanded">
                            <span>${match.team2Goals}</span>
                        </div>
                        <div class="open-numbers hidden" data-match="${match.matchNum}" data-team="${2}"></div> 
                    </div>
                    <div class="country">                        
                        <img class="flag" src="${match.team2Flag}" alt="">
                        <p class="name">${match.team2Code}</p>
                    </div>
                </div>    
            </div>  
        </div>
    `;
}

const toggleElClass = (element, class1, class2) => {
    if (element.classList.contains(class1)) {
        element.classList.remove(class1);
        element.classList.add(class2);
    } else if (element.classList.contains(class2)) {
        element.classList.remove(class2);
        element.classList.add(class1);
    }
}

const mainContainer = document.querySelector('main.main');
if (mainContainer) {
    const renderSite = async () => {
        const allData = await (await sendPostRequest(createUrl('/getAllData'), {})).json();
        const { allUsers, allMatches, allPredictions, allResults } = allData;
        
        allMatches.sort((a, b) => {
            return a.matchId - b.matchId;
        });

        const usersWPred = [];
        allUsers.forEach((user) => {
            const pred = allPredictions.filter(prediction=> user.userId === prediction.userId);
            user.predictions = pred;
            usersWPred.push(user);
        });

        usersWPred.forEach((user) => {
            let allPoints = 0;
            user.predictions.forEach((prediction) => {
                const result = allResults.find((result)=> result.matchId === prediction.matchId)
                if (result.finished === 'yes') {
                    let pg1 = prediction.g1,
                        pg2 = prediction.g2;
                    let og1 = result.g1,
                        og2 = result.g2;
                    let points = 0;
                    if (pg1 === og1 && pg2 === og2) {
                        points = 5;         
                    } else if ((pg1 - pg2) === (og1 - og2)) {
                        points = 2;
                    } else if (((pg1 > pg2) && (og1 > og2)) || ((pg2 > pg1) && (og2 > og1))) {
                        points = 1;
                    }
                    prediction.points = points;
                    allPoints += points; 
                }
            });
            user.points = allPoints;
        });

        const currentUser = usersWPred.find((user) => user.username === userCookie.username);
        const pointCMP = document.querySelector('.pointsCMP');
        usersWPred.sort((a,b) => {
            return b.points - a.points;
        });
        usersWPred.forEach((user)=>{
            if (user.userId === currentUser.userId) {
                pointCMP.insertAdjacentHTML('beforeend',`
                    <tr class="all-points" style="color: #ad214d;">
                        <td style="padding-right:30px">${user.name_tr}</td>
                        <td>${user.points}</td>
                    </tr>
                `);
            } else {
                pointCMP.insertAdjacentHTML('beforeend',`
                    <tr class="all-points">
                        <td style="padding-right:30px">${user.name_tr}</td>
                        <td>${user.points}</td>
                    </tr>
                `);
            }
        });
        allMatches.forEach((match) => {
            const currentPrediction = currentUser.predictions.find((prediction) => prediction.matchId === match.matchId);
            const currentMatchResult = allResults.find(result => result.matchId === currentPrediction.matchId);
            const finished = currentMatchResult.finished === 'yes';
            let pointsCmp = `<span class="line">-</span>`;
            if (finished) {
                const originalScore = `${currentMatchResult.g1} - ${currentMatchResult.g2}`;
                let pointsText = `+${currentPrediction.points} Point${currentPrediction.points > 1 ? 's' : ''}`;
                pointsCmp = `
                    <div class="poisult">
                        <div class="points">${pointsText}</div>
                        <div class="result">${originalScore}</div>
                    </div>
                `;
            }
            
            const matchTime = new Date(match.date);
            const matchData = {
                id: matchTime.getTime(),
                date: matchTime.toLocaleString(),
                team1Code: match.t1.toUpperCase(),
                team2Code: match.t2.toUpperCase(),
                team1Flag: `../images/${match.t1.toUpperCase()}.png`,
                team2Flag: `../images/${match.t2.toUpperCase()}.png`,
                team1Goals: currentPrediction.g1,
                team2Goals: currentPrediction.g2,
                matchNum: match.matchId,
                pointsCmp: pointsCmp
            }
            mainContainer.insertAdjacentHTML('beforeend', createCard(matchData));
            
            const timeNow = new Date();
            if (matchTime.getTime() < timeNow.getTime()) {
                match.unchangeable = true;
            }
        });

        const menuBtn = document.querySelector('.bg-img');
        const headerCmp = document.querySelector('.header');
        const menu = document.querySelector('.navbar');
        headerCmp.addEventListener('click', (e) => {
            if (e.target === menuBtn) {
                menu.classList.toggle('opened');
                headerCmp.classList.toggle('showed');
                menuBtn.classList.toggle('opened');
            } else {
                menu.classList.remove('opened');
                headerCmp.classList.remove('showed');
                menuBtn.classList.remove('opened');
            }
        });

        menu.addEventListener('click', (e) => {
            const pointsCmp = menu.querySelector('.menu');
            if (!(e.target === pointsCmp || pointsCmp.contains(e.target))) {
                menu.classList.remove('opened');
                headerCmp.classList.remove('showed');
                menuBtn.classList.remove('opened');
            }
        });

        const goalsCount = document.querySelectorAll('.goals-count');
        const box = document.querySelectorAll('.open-numbers');
        for (let i = 0; i < goalsCount.length; i++) {
            let matchNum = box[i].getAttribute('data-match');
            let teamNum = box[i].getAttribute('data-team');
            if (!allMatches[(+matchNum)-1].unchangeable) {
                goalsCount[i].addEventListener('click', () => {
                    let openedNumbers = document.querySelector('.open-numbers.not-hidden');
                    if (openedNumbers && openedNumbers !== box[i]) {
                        toggleElClass(openedNumbers, 'hidden', 'not-hidden');
                    }
                    toggleElClass(box[i], 'hidden', 'not-hidden');
                    let expandedGoals = document.querySelector('.goals-count.expanded');
                    if (expandedGoals && expandedGoals !== goalsCount[i]) {
                        toggleElClass(expandedGoals, 'expanded', 'not-expanded');
                    }
                    toggleElClass(goalsCount[i], 'expanded', 'not-expanded');
                });
    
                for (let j = 0; j < 10; j++) {
                    box[i].insertAdjacentHTML('beforeend', `
                        <div class="goal-count" data-goal="${j}">
                            <span>${j}</span>
                        </div>
                    `);
                }
    
                const goals = box[i].querySelectorAll('.goal-count');
                goals.forEach(goal => {
                    if (!allMatches[(+matchNum)-1].unchangeable) {
                        goal.addEventListener('click', async (e) => {
                            if (!allMatches[(+matchNum)-1].unchangeable) {
                                console.log(e.target);
                                const goalCount = +goal.getAttribute('data-goal');
                                goalsCount[i].innerHTML = `<span>${goalCount}</span>`;
                                toggleElClass(box[i], 'hidden', 'not-hidden');
                                toggleElClass(goalsCount[i], 'expanded', 'not-expanded');
                                const obj = {
                                    userId: currentUser.userId,
                                    matchId: +matchNum,
                                }
                                obj[`g${teamNum}`] = goalCount;
                                await sendPostRequest(createUrl('/setPrediction'), obj);
                            }
                        });
                    }
                });
            }
        };
        let timeNow = new Date();
        timeNow = timeNow.getTime();
        const cards = document.querySelectorAll('.card');
        let cardsLenght = cards.length;
        let currentMatchCard = cards[cards.length - 1];
        for (let i = 0; i < cardsLenght; i++) {
            if (timeNow < +cards[i].id) {
                currentMatchCard = cards[i - 2];
                break;
            }
        }
        currentMatchCard.scrollIntoView();
        stopLoader();
    }
    renderSite();
}