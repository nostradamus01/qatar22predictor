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
        console.log('Connected successfully');
        await callback();
        client.close();
    } catch (e) {
        console.error(e);
    }
}

app.get('/toLogin', async (req, res) => {
    res.redirect('pages/login.html');
});

app.post('/createUser', async (req, res) => {
    await connect(async () => {
        let success = false;
        const { userId, username, pinCode, name, name_tr } = req.body;
        try {
            const bcryptedPinCode = await bcrypt.hash(pinCode, 3);
            await client.db('fifa22cup').collection('users').insertOne({
                userId: userId,
                username: username,
                pinCode: bcryptedPinCode,
                name: name,
                name_tr: name_tr
            });
            success = true;
        } catch (e) {
            console.error(e);
        }
        res.send({success: success});
    });
});

app.post('/changePIN', async (req, res) => {
    await connect(async () => {
        let success = false;
        const { username, pinCode } = req.body;
        try {
            const bcryptedPinCode = await bcrypt.hash(pinCode, 3);
            await client.db('fifa22cup').collection('users').updateOne(
                {username: username},
                {$set: {
                    pinCode: bcryptedPinCode
                }}
            );
            success = true;
        } catch (e) {
            console.error(e);
        }
        res.send({success: success});
    });
});

app.post('/getAllUsers', async (req, res) => {
    await connect(async () => {
        try {
            const users = await client.db('fifa22cup').collection('users').find().toArray();
            users.forEach(user => {
                delete user.pinCode;
            });
            res.send({users: users});
        } catch (e) {
            console.error(e);
        }
    });
});

app.post('/login', async (req, res) => {
    await connect(async () => {
        let success = false;
        const username = req.body.username;
        const pinCode = req.body.pinCode;
        try {
            const user = await client.db('fifa22cup').collection('users').findOne({
                username: username
            });
            if (user) {
                if (await bcrypt.compare(pinCode, user.pinCode)) {
                    success = true;
                }
            }
        } catch (e) {
            console.error(e);
        }
        res.send({success: success});
    });
});

app.post('/setPrediction', async (req, res) => {
    await connect(async () => {
        let success = false;
        let { userId, matchId, g1, g2 } = req.body;
        let obj = {};
        if (g1 && g1 !== 0) {
            obj['g1'] = parseInt(g1);
        } else if (g2 && g2 !== 0) {
            obj['g2'] = parseInt(g2);
        }
        try {
            const match = await client.db('fifa22cup').collection('matches').findOne({
                matchId: matchId
            });
            if (match) {
                let matchTime = new Date(match.date);
                let timeNow = new Date();
                if (matchTime.getTime() > timeNow.getTime()) {
                    await client.db('fifa22cup').collection('predictions').updateOne(
                        {userId: userId, matchId: matchId},
                        {$set: obj}
                    );
                    success = true;
                }
                await client.db('fifa22cup').collection('predictions').updateOne(
                    {userId: userId, matchId: matchId},
                    {$set: obj}
                );
                success = true;
            }
        } catch (e) {
            console.error(e);
        }
        res.send({success: success});
    });
});

app.post('/setResult', async (req, res) => {
    await connect(async () => {
        let success = false;
        let { matchId, g1, g2, finished } = req.body;
        try {
            await client.db('fifa22cup').collection('results').updateOne(
                {matchId: matchId},
                {$set: {
                    g1: parseInt(g1),
                    g2: parseInt(g2),
                    finished: finished
                }}
            );
            success = true;
        } catch (e) {
            console.error(e);
        }
        res.send({success: success});
    });
});

app.post('/setPoints', async (req, res) => {
    await connect(async () => {
        let success = false;
        let { userId, matchId, points } = req.body;
        try {
            await client.db('fifa22cup').collection('predictions').updateOne(
                {userId: userId, matchId: matchId},
                {$set: {
                    points: points
                }}
            );
            success = true;
        } catch (e) {
            console.error(e);
        }
        res.send({success: success});
    });
});

app.post('/setAllPoints', async (req, res) => {
    await connect(async () => {
        let success = false;
        let { username, points } = req.body;
        try {
            await client.db('fifa22cup').collection('users').updateOne(
                {username: username},
                {$set: {
                    points: points
                }}
            );
            success = true;
        } catch (e) {
            console.error(e);
        }
        res.send({success: success});
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
        } catch (e) {
            console.error(e);
        }
    });
});

// DON'T DELETE

// app.post('/createTeams', async (req, res) => {
//     let success = false;
//     let { teamId, code, name } = req.body;
//     try {
//         code = code.toLowerCase();
//         await client.db('fifa22cup').collection('teams').insertOne({
//             teamId: teamId,
//             code: code,
//             name: name
//         });
//         success = true;
//     } catch (e) {
//         console.error(e);
//     }
//     res.send({success: success});
// });

// app.post('/createMatches', async (req, res) => {
//     let success = false;
//     let { matchId, t1, t2, date } = req.body;
//     try {
//         await client.db('fifa22cup').collection('matches').insertOne({
//             matchId: matchId,
//             t1: t1.toLowerCase(),
//             t2: t2.toLowerCase(),
//             date: date
//         });
//         success = true;
//     } catch (e) {
//         console.error(e);
//     }
//     res.send({success: success});
// });

// app.post('/createPredictions', async (req, res) => {
//     let success = false;
//     let { matchId, userId, g1, g2, points } = req.body;
//     try {
//         await client.db('fifa22cup').collection('predictions').insertOne({
//             userId: userId,
//             matchId: matchId,
//             g1: g1,
//             g2: g2,
//             points: points
//         });
//         success = true;
//     } catch (e) {
//         console.error(e);
//     }
//     res.send({success: success});
// });

// app.post('/createResults', async (req, res) => {
//     let success = false;
//     let { matchId, g1, g2 } = req.body;
//     try {
//         await client.db('fifa22cup').collection('results').insertOne({
//             matchId: matchId,
//             g1: g1,
//             g2: g2
//         });
//         success = true;
//     } catch (e) {
//         console.error(e);
//     }
//     res.send({success: success});
// });

app.listen(defautlPort, () => {
    console.log('Server is live...');
});
