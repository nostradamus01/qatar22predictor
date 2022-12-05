function PointsPage() {
    const mainEl = document.createElement('div');
    mainEl.classList.add('points-container', 'hidden');

    mainEl.insertAdjacentHTML('afterbegin', `
        <table class="points-table">
            <thead>
                <tr>
                    <td>Name</td>
                    <td>All points</td>
                    <td>Group points</td>
                    <td>Playoff points</td>
                </tr>
            </thead>
            <tbody class="table-body">
                
            </tbody>
        </table>
    `);

    const calculatePoints = (predictions, results, isPlayoff, playoffMatches) => {
        let allPoints = 0;

        predictions.forEach((prediction) => {
            const result = results.find((result) => result.matchId === prediction.matchId);
            if (result.finished === 'yes') {
                let pg1 = +prediction.g1,
                    pg2 = +prediction.g2;
                let og1 = +result.g1,
                    og2 = +result.g2;

                let points = 0;
                if (pg1 === og1 && pg2 === og2) {
                    points = 5;
                } else if ((pg1 - pg2) === (og1 - og2)) {
                    points = 2;
                } else if (((pg1 > pg2) && (og1 > og2)) || ((pg2 > pg1) && (og2 > og1))) {
                    points = 1;
                }

                if (isPlayoff) {
                    if (pg1 === pg2) {
                        if ((result.willPenalties.length > 0) && (result.willPenalties === prediction.willPenalties)) {
                            points++;
                        }
                        if ((result.winnerTeamCode.length === 3) && (result.winnerTeamCode === prediction.winnerTeamCode)) {
                            points++;
                        }
                        const currentMatch = playoffMatches.find(match => match.matchId === prediction.matchId);
                        if (prediction.winnerTeamCode.length === 3) {
                            if (prediction.winnerTeamCode === currentMatch.t1 || prediction.winnerTeamCode === currentMatch.t2) {
                                points++;
                            }
                        }
                    }
                }
                prediction.points = points;
                allPoints += points;
            }
        });

        return allPoints;
    }

    (async () => {
        const data = await (await sendPostRequest('getGroupAndPlayoffData')).json();
        let { users, groupMatches, groupPredictions, groupResults, playoffMatches, playoffPredictions, playoffResults } = data;

        groupMatches.sort((a, b) => a.matchId - b.matchId);
        playoffMatches.sort((a, b) => a.matchId - b.matchId);

        users = users.map(user => {
            user.groupPredictions = groupPredictions.filter(prediction => user.userId === prediction.userId);
            user.playoffPredictions = playoffPredictions.filter(prediction => user.userId === prediction.userId);
            return user;
        });

        users.forEach(user => {
            user.groupPoints = calculatePoints(user.groupPredictions, groupResults, false);
            user.playoffPoints = calculatePoints(user.playoffPredictions, playoffResults, true, playoffMatches);
            user.allPoints = user.groupPoints + user.playoffPoints;
        });

        users.sort((a, b) => b.allPoints - a.allPoints);

        console.log(users);

        const currentUser = users.find((user) => user.username === userCookie.username);

        const tableBody = mainEl.querySelector('.table-body');

        users.forEach(user => {
            tableBody.insertAdjacentHTML('beforeend', `
                <tr ${user.userId === currentUser.userId ? 'class="current-user"' : ''}>
                    <td>${user.name_tr}</td>
                    <td>${user.allPoints}</td>
                    <td>${user.groupPoints}</td>
                    <td>${user.playoffPoints}</td>
                </tr>
            `);
        });

        mainEl.classList.remove('hidden');

        stopLoader();
    })();

    return mainEl;
}