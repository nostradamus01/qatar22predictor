function PlayoffPage() {
    const mainEl = document.createElement('div');
    mainEl.classList.add('cards-container');

    (async () => {
        const createCard = (data) => {
            return `
                <div class="card" data-time="${data.time}" data-match=${data.matchNum}>
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
                                    <div class="goals-count" data-team="${1}">
                                        ${data.team1Goals}
                                    </div>
                                    <div class="goals-chooser" data-match="${data.matchNum}" data-team="${1}"></div>
                                </div>
                                <div class="seperator">:</div>
                                <div class="goal-conatiner ${data.isChangable ? 'changable' : ''}">
                                    <div class="goals-count" data-team="${2}">
                                        ${data.team2Goals}
                                    </div>
                                    <div class="goals-chooser" data-match="${data.matchNum}" data-team="${2}"></div>
                                </div>
                            </div>
                            <div class="results ${!data.isFinished ? 'hidden' : ''}">
                                <div class="original-score">${data.scoreText}</div>
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
                    <div class="additional-predictions ${!data.hasAdditionalInfo ? 'hidden' : ''} ${data.isChangable ? 'changable' : ''}" data-match="${data.matchNum}">
                        <div class="container">
                            <select class="select-css" ${!data.isChangable ? 'disabled' : ''} data-match="${data.matchNum}">
                                <option disabled ${!(data.winnerTeamCode.length > 0) ? 'selected' : ''} hidden>Ով կանցնի (Кто пройдет)</option>
                                <option value="${data.team1Code.toLowerCase()}" ${data.team1Code.toLowerCase() === data.winnerTeamCode ? 'selected' : ''}>${data.team1Code}</option>
                                <option value="${data.team2Code.toLowerCase()}" ${data.team2Code.toLowerCase() === data.winnerTeamCode ? 'selected' : ''}>${data.team2Code}</option>
                            </select>
                        </div>
                        <div>
                            <span class="switch">
                            <h4 class="pen">Будут пенальти</h4>
                                <input class="switch-round" ${data.willPenalties ? 'checked' : ''} id="switch-round-${data.matchNum}" type="checkbox" data-match="${data.matchNum}" ${!data.isChangable ? 'disabled' : ''}/>
                                <label for="switch-round-${data.matchNum}"></label>
                            </span>
                        </div>
                    </div>
                </div>
            `;
        }

        const mainContainer = mainEl;
        const allData = await (await sendPostRequest('getAllDataPlayoff', {})).json();
        const { allUsers, allMatches, allPredictions, allResults } = allData;

        allMatches.sort((a, b) => {
            return a.matchId - b.matchId;
        });

        let currentUser = allUsers.find((user) => user.username === userCookie.username);

        currentUser.predictions = allPredictions.filter(prediction => currentUser.userId === prediction.userId);

        let allPoints = 0;
        currentUser.predictions.forEach((prediction) => {
            const result = allResults.find((result) => result.matchId === prediction.matchId)
            if (result.finished === 'yes') {
                let points = 0;
                let pg1 = prediction.g1,
                    pg2 = prediction.g2;
                if ((pg1 || pg1 === 0) && (pg2 || pg2 === 0)) {
                    pg1 = +pg1;
                    pg2 = +pg2;
                    let og1 = +result.g1,
                        og2 = +result.g2;
                    if (pg1 === og1 && pg2 === og2) {
                        points = 5;
                    } else if ((pg1 - pg2) === (og1 - og2)) {
                        points = 2;
                    } else if (((pg1 > pg2) && (og1 > og2)) || ((pg2 > pg1) && (og2 > og1))) {
                        points = 1;
                    }

                    if (pg1 === pg2) {
                        if ((result.willPenalties.length > 0) && (result.willPenalties === prediction.willPenalties)) {
                            points++;
                        }
                        if (result.winnerTeamCode.length === 3) {
                            if (result.winnerTeamCode === prediction.winnerTeamCode) {
                                points++;
                            }
                        }
                    }
                }
                prediction.points = points;
                allPoints += points;
            }
        });
        currentUser.points = allPoints;

        allMatches.forEach((match) => {
            const currentPrediction = currentUser.predictions.find((prediction) => prediction.matchId === match.matchId);
            const currentMatchResult = allResults.find(result => result.matchId === currentPrediction.matchId);
            const finished = currentMatchResult.finished === 'yes';
            const timeNow = new Date();
            const hasAdditionalInfo = currentPrediction.g1 && (currentPrediction.g1 === currentPrediction.g2);

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
                isFinished: finished,
                pointsText: '',
                scoreText: '',
                isChangable: matchTime.getTime() > timeNow.getTime(),
                hasAdditionalInfo,
                winnerTeamCode: currentPrediction.winnerTeamCode,
                willPenalties: currentPrediction.willPenalties === 'yes'
            }

            if (finished) {
                matchData.pointsText = `+${currentPrediction.points} Point${currentPrediction.points > 1 ? 's' : ''}`;
                matchData.scoreText = `${currentMatchResult.g1} : ${currentMatchResult.g2}`;
                if (currentMatchResult.g1 === currentMatchResult.g2) {
                    matchData.scoreText += `&nbsp;(${currentMatchResult.winnerTeamCode.toUpperCase()} wins)`;
                }
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
                    const currentCard = mainEl.querySelector(`div.card[data-match='${obj.matchId}']`);
                    if (currentCard) {
                        const goal1 = currentCard.querySelector('div.goals-count[data-team="1"]').innerText;
                        const goal2 = currentCard.querySelector('div.goals-count[data-team="2"]').innerText;
                        const addit = currentCard.querySelector(`.additional-predictions`);
                        if (goal1 === goal2) {
                            addit.classList.remove('hidden');
                        } else {
                            addit.classList.add('hidden');
                        }
                    }
                    await sendPostRequest('setPrediction', obj);
                })
                goalsChooser.appendChild(el);
            }

            goalsCount.addEventListener('click', () => {
                const allGoalsChoosers = mainEl.querySelectorAll('.goals-chooser');
                if (goalsChooser.classList.contains('expanded')) {
                    goalsChooser.classList.remove('expanded');
                } else {
                    allGoalsChoosers.forEach((chooser) => {
                        chooser.classList.remove('expanded');
                    });
                    goalsChooser.classList.add('expanded');
                }
            });
        });

        const additionalPreds = mainEl.querySelectorAll('.additional-predictions.changable');
        additionalPreds.forEach(pred => {
            const selectTeam = pred.querySelector('.select-css');
            const penal = pred.querySelector('.switch-round');
            selectTeam.addEventListener('input', async (e) => {
                const obj = {
                    userId: currentUser.userId,
                    matchId: +selectTeam.getAttribute('data-match')
                };
                obj['winnerTeamCode'] = e.target.value;
                await sendPostRequest('setPrediction', obj);
            })
            penal.addEventListener('input', async (e) => {
                const obj = {
                    userId: currentUser.userId,
                    matchId: +penal.getAttribute('data-match')
                };
                obj['willPenalties'] = e.target.checked ? 'yes' : 'no';
                await sendPostRequest('setPrediction', obj);
            })
        })
        stopLoader();
    })();

    return mainEl;
}