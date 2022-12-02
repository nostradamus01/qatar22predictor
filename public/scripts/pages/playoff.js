function PlayoffPage() {
    const mainEl = document.createElement('div');
    mainEl.classList.add('cards-container');

    (async () => {
        const createCard = (data) => {
            return `
                <div class="card" data-time="${data.time}">
                    <div class="date-container">
                        <span class="date">${data.date}</span>
                    </div>
                    <div class="score-container">
                        <div class="team-container">
                            <div class="team-logo">
                                <img src="${data.team1Flag}" alt="${data.team1Code}">
                            </div>
                            <div class="team-name">${data.team1Code}</div>
                        </div>
                        <div class="goals-container">
                            <div class="goals">
                                <div class="goal-conatiner ${data.isChangable ? 'changable' : ''}">
                                    <div class="goals-count">
                                        ${data.team1Goals}
                                    </div>
                                    <div class="goals-chooser" data-match="${data.matchNum}" data-team="${1}"></div>
                                </div>
                                <div class="seperator">:</div>
                                <div class="goal-conatiner ${data.isChangable ? 'changable' : ''}">
                                    <div class="goals-count">
                                        ${data.team2Goals}
                                    </div>
                                    <div class="goals-chooser" data-match="${data.matchNum}" data-team="${2}"></div>
                                </div>
                            </div>
                            <div class="results ${!data.isFinished ? 'hidden' : ''}">
                                <div class="original-score">${data.originalG1} : ${data.originalG2}</div>
                                <div class="points">${data.pointsText}</div>
                            </div>
                        </div>
                        <div class="team-container">
                            <div class="team-logo">
                                <img src="${data.team2Flag}" alt="${data.team2Code}">
                            </div>
                            <div class="team-name">${data.team2Code}</div>
                        </div>
                    </div>
                    <div class="others-predictions-container">
            
                    </div>
                </div>
            `;
        }

        const mainContainer = mainEl;
        const allData = await (await sendPostRequest(createUrl('/getAllDataPlayoff'), {})).json();
        const { allUsers, allMatches, allPredictions, allResults } = allData;

        allMatches.sort((a, b) => {
            return a.matchId - b.matchId;
        });

        const usersWPred = [];
        allUsers.forEach((user) => {
            const pred = allPredictions.filter(prediction => user.userId === prediction.userId);
            user.predictions = pred;
            usersWPred.push(user);
        });

        usersWPred.forEach((user) => {
            let allPoints = 0;
            user.predictions.forEach((prediction) => {
                const result = allResults.find((result) => result.matchId === prediction.matchId)
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
        
        allMatches.forEach((match) => {
            const currentPrediction = currentUser.predictions.find((prediction) => prediction.matchId === match.matchId);
            const currentMatchResult = allResults.find(result => result.matchId === currentPrediction.matchId);
            const finished = currentMatchResult.finished === 'yes';
            const timeNow = new Date();

            const matchTime = new Date(match.date);
            const matchData = {
                time: matchTime.getTime(),
                date: matchTime.toLocaleString(),
                team1Code: match.t1.toUpperCase(),
                team2Code: match.t2.toUpperCase(),
                team1Flag: `images/${match.t1.toUpperCase()}.png`,
                team2Flag: `images/${match.t2.toUpperCase()}.png`,
                team1Goals: currentPrediction.g1,
                team2Goals: currentPrediction.g2,
                matchNum: match.matchId,
                finished: finished,
                pointsText: '',
                originalG1: '',
                originalG2: '',
                isChangable: matchTime.getTime() > timeNow.getTime()
            }

            if (finished) {
                matchData.pointsText = `+${currentPrediction.points} Point${currentPrediction.points > 1 ? 's' : ''}`;
                matchData.originalG1 = currentMatchResult.g1;
                matchData.originalG2 = currentMatchResult.g2;
            }
            mainContainer.insertAdjacentHTML('beforeend', createCard(matchData));
        });

        const allGoalContainers = mainEl.querySelectorAll('.goal-conatiner.changable');
        allGoalContainers.forEach(goalContainer => {
            const goalsCount = goalContainer.querySelector('.goals-count');
            const goalsChooser = goalContainer.querySelector('.goals-chooser');
            for (let i = 0; i <= 9; i++) {
                const el = document.createElement('div');
                el.classList.add('goal-count');
                el.setAttribute('data-goal', i);
                el.insertAdjacentHTML('afterbegin', i);
                el.addEventListener('click', async () => {
                    goalsCount.innerHTML = i;
                    const obj = {
                        userId: currentUser.userId,
                        matchId: +goalsChooser.getAttribute('data-match')
                    };
                    const teamNum = goalsChooser.getAttribute('data-team');
                    obj[`g${teamNum}`] = i;
                    goalsChooser.classList.remove('expanded');
                    await sendPostRequest(createUrl('/setPrediction'), obj);
                })
                goalsChooser.appendChild(el);
            }

            goalsCount.addEventListener('click', () => {
                const allGoalsChoosers = mainEl.querySelectorAll('.goals-chooser');
                allGoalsChoosers.forEach((chooser) => {
                    chooser.classList.remove('expanded');
                });
                goalsChooser.classList.add('expanded');
            });
        })
        stopLoader();
    })();

    return mainEl;
}