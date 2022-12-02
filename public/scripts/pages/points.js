function PointsPage() {
    const mainEl = document.createElement('table');
    mainEl.classList.add('.pointsCMP');

    (async () => {
        const allData = await (await sendPostRequest('getAllData')).json();
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
        usersWPred.sort((a,b) => {
            return b.points - a.points;
        });
        usersWPred.forEach((user)=>{
            if (user.userId === currentUser.userId) {
                mainEl.insertAdjacentHTML('beforeend',`
                    <tr class="all-points" style="color: #ad214d;">
                        <td style="padding-right:30px">${user.name_tr}</td>
                        <td>${user.points}</td>
                    </tr>
                `);
            } else {
                mainEl.insertAdjacentHTML('beforeend',`
                    <tr class="all-points">
                        <td style="padding-right:30px">${user.name_tr}</td>
                        <td>${user.points}</td>
                    </tr>
                `);
            }
        });
        stopLoader();
    })();

    return mainEl;
}