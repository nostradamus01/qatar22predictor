require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const uri = process.env.MongoURL;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const defautlPort = 3000;

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

const connect = async (callback) => {
    try {
        await client.connect();
        await callback();
        client.close();
    } catch (e) { }
}

app.post('/login', async (req, res) => {
    await connect(async () => {
        let success = false;
        try {
            const { username, pinCode } = req.body;

            await client.connect();
            const user = await client.db('fifa22cup').collection('users').findOne({
                username: username
            });
            if (user) {
                if (await bcrypt.compare(pinCode, user.pinCode)) {
                    success = true;
                }
            }
        } catch (e) { }
        res.send({ success: success });
    });
});

app.post('/setPrediction', async (req, res) => {
    await connect(async () => {
        let success = false;
        try {
            const { matchId, userId, g1, g2, winnerTeamCode, willPenalties } = req.body;

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

            const match = await client.db('playoff').collection('matches').findOne({
                matchId: matchId
            });
            if (match) {
                let matchTime = new Date(match.date);
                let timeNow = new Date();
                if (matchTime.getTime() > timeNow.getTime()) {
                    await client.db('playoff').collection('predictions').updateOne(
                        { userId: userId, matchId: matchId },
                        { $set: obj }
                    );
                    success = true;
                }
            }
        } catch (e) { }
        res.send({ success: success });
    });
});

app.post('/getAllUsers', async (req, res) => {
    await connect(async () => {
        try {
            const users = await client.db('fifa22cup').collection('users').find().toArray();
            users.forEach(user => {
                delete user.pinCode;
            });
            res.send({ users: users });
        } catch (e) { }
    });
});

app.post('/getAllData', async (req, res) => {
    await connect(async () => {
        try {
            const users = await client.db('fifa22cup').collection('users').find().toArray();
            users.forEach(user => {
                delete user.pinCode;
            });
            const matches = await client.db('fifa22cup').collection('matches').find().toArray();
            const predictions = await client.db('fifa22cup').collection('predictions').find().toArray();
            const results = await client.db('fifa22cup').collection('results').find().toArray();
            res.send({
                allUsers: users,
                allMatches: matches,
                allPredictions: predictions,
                allResults: results
            });
        } catch (e) { }
    });
});

app.post('/getAllDataPlayoff', async (req, res) => {
    await connect(async () => {
        try {
            const users = await client.db('fifa22cup').collection('users').find().toArray();
            users.forEach(user => {
                delete user.pinCode;
            });
            const matches = await client.db('playoff').collection('matches').find().toArray();
            const predictions = await client.db('playoff').collection('predictions').find().toArray();
            const results = await client.db('playoff').collection('results').find().toArray();
            res.send({
                allUsers: users,
                allMatches: matches,
                allPredictions: predictions,
                allResults: results
            });
        } catch (e) { }
    });
});

app.listen(defautlPort, () => {
    console.log('Server is live...');
});
