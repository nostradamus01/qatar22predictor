const { MongoClient, ServerApiVersion } = require('mongodb');
const bcrypt = require('bcrypt');

const uri = process.env.MongoURL;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const getAllData = async () => {
    try {
        await client.connect();
        const users = await client.db('fifa22cup').collection('users').find().toArray();
        users.forEach(user => {
            delete user.pinCode;
        });
        const matches = await client.db('fifa22cup').collection('matches').find().toArray();
        const results = await client.db('fifa22cup').collection('results').find().toArray();
        const predictions = await client.db('fifa22cup').collection('predictions').find().toArray();
        return {
            allUsers: users,
            allMatches: matches,
            allResults: results,
            allPredictions: predictions,
        }
    } catch (e) {
        return null;
    } finally {
        client.close();
    }
};

const getAllUsers = async () => {
    try {
        await client.connect();
        const users = await client.db('fifa22cup').collection('users').find().toArray();
        users.forEach(user => {
            delete user.pinCode;
        });
        return {
            users: users
        }
    } catch (e) {
        return null;
    } finally {
        client.close();
    }
};

const getAllDataPlayoff = async () => {
    try {
        await client.connect();
        const users = await client.db('fifa22cup').collection('users').find().toArray();
        users.forEach(user => {
            delete user.pinCode;
        });
        const matches = await client.db('playoff').collection('matches').find().toArray();
        const results = await client.db('playoff').collection('results').find().toArray();
        const predictions = await client.db('playoff').collection('predictions').find().toArray();
        return {
            allUsers: users,
            allMatches: matches,
            allResults: results,
            allPredictions: predictions,
        }
    } catch (e) {
        return null;
    } finally {
        client.close();
    }
};

const login = async (data) => {
    try {
        let success = false;
        const { username, pinCode } = data;

        await client.connect();
        const user = await client.db('fifa22cup').collection('users').findOne({
            username: username
        });
        if (user) {
            if (await bcrypt.compare(pinCode, user.pinCode)) {
                success = true;
            }
        }
        return {
            success: success
        }
    } catch (e) {
        return null;
    } finally {
        client.close();
    }
};

const setPrediction = async (data) => {
    try {
        let success = false;
        const { matchId, userId, g1, g2, winnerTeamCode, willPenalties } = data;

        let obj = {};
        if (g1 && g1 !== 0) {
            obj['g1'] = parseInt(g1);
        } else if (g2 && g2 !== 0) {
            obj['g2'] = parseInt(g2);
        } else if (winnerTeamCode && winnerTeamCode.length === 3) {
            obj['winnerTeamCode'] = winnerTeamCode;
        } else if (willPenalties && willPenalties.length > 0) {
            obj['willPenalties'] = willPenalties;
        }

        const match = await client.db('fifa22cup').collection('matches').findOne({
            matchId: matchId
        });
        if (match) {
            let matchTime = new Date(match.date);
            let timeNow = new Date();
            if (matchTime.getTime() > timeNow.getTime()) {
                await client.db('playoff').collection('predictions').updateOne(
                    {userId: userId, matchId: matchId},
                    {$set: obj}
                );
                success = true;
            }
        }
        return {
            success: success
        }
    } catch (e) {
        return null;
    } finally {
        client.close();
    }
};

module.exports.handler = async (event, context) => {
    let data = null;

    const body = JSON.parse(event.body);

    switch (body.action) {
        case 'getAllUsers':
            data = await getAllUsers();
            break;
        case 'getAllData':
            data = await getAllData();
            break;
        case 'getAllDataPlayoff':
            data = await getAllDataPlayoff();
            break;
        case 'login':
            data = await login(body.data);
            break;
        case 'setPrediction':
            data = await setPrediction(body.data);
            break;
    }

    let response = null;
    if (data) {
        response = {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    } else {
        response = {
            statusCode: 404
        }
    }

    return response;
}