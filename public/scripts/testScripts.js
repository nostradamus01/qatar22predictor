const _Teams = [{
    name: 'Qatar',
    code: 'QAT',
    teamId: 1
}, {
    name: 'Ecuador',
    code: 'ECU',
    teamId: 2
}, {
    name: 'Senegal',
    code: 'SEN',
    teamId: 3
}, {
    name: 'Netherlands',
    code: 'NED',
    teamId: 4
}, {
    name: 'England',
    code: 'ENG',
    teamId: 5
}, {
    name: 'Iran',
    code: 'IRN',
    teamId: 6
}, {
    name: 'USA',
    code: 'USA',
    teamId: 7
}, {
    name: 'Wales',
    code: 'WAL',
    teamId: 8
}, {
    name: 'Argentina',
    code: 'ARG',
    teamId: 9
}, {
    name: 'Saudi Arabia',
    code: 'KSA',
    teamId: 10
}, {
    name: 'Mexico',
    code: 'MEX',
    teamId: 11
}, {
    name: 'Poland',
    code: 'POL',
    teamId: 12
}, {
    name: 'France',
    code: 'FRA',
    teamId: 13
}, {
    name: 'Australia',
    code: 'AUS',
    teamId: 14
}, {
    name: 'Denmark',
    code: 'DEN',
    teamId: 15
}, {
    name: 'Tunisia',
    code: 'TUN',
    teamId: 16
}, {
    name: 'Spain',
    code: 'ESP',
    teamId: 17
}, {
    name: 'Costa Rica',
    code: 'CRC',
    teamId: 18
}, {
    name: 'Germany',
    code: 'GER',
    teamId: 19
}, {
    name: 'Japan',
    code: 'JPN',
    teamId: 20
}, {
    name: 'Belgium',
    code: 'BEL',
    teamId: 21
}, {
    name: 'Canada',
    code: 'CAN',
    teamId: 22
}, {
    name: 'Morocco',
    code: 'MAR',
    teamId: 23
}, {
    name: 'Croatia',
    code: 'CRO',
    teamId: 24
}, {
    name: 'Brazil',
    code: 'BRA',
    teamId: 25
}, {
    name: 'Serbia',
    code: 'SRB',
    teamId: 26
}, {
    name: 'Switzerland',
    code: 'SUI',
    teamId: 27
}, {
    name: 'Cameroon',
    code: 'CMR',
    teamId: 28
}, {
    name: 'Portugal',
    code: 'POR',
    teamId: 29
}, {
    name: 'Ghana',
    code: 'GHA',
    teamId: 30
}, {
    name: 'Uruguay',
    code: 'URU',
    teamId: 31
}, {
    name: 'South Korea',
    code: 'KOR',
    teamId: 32
}];

const _Users = [{
    username: 'mike0199',
    pinCode: '2356',
    userId: 1,
    name: 'Mikayel',
    name_tr: 'Միքայել'
}, {
    username: 'ednight',
    pinCode: '9119',
    userId: 2,
    name: 'Edvard',
    name_tr: 'Էդվարդ'
}, {
    username: 'ero2022',
    pinCode: '7337',
    userId: 3,
    name: 'Erik',
    name_tr: 'Էրիկ'
}, {
    username: 'aro2022',
    pinCode: '3316',
    userId: 4,
    name: 'Arayik',
    name_tr: 'Արայիկ'
}, {
    username: 'narek2022',
    pinCode: '7332',
    userId: 5,
    name: 'Narek',
    name_tr: 'Նարեկ'
}, {
    username: 'hayk2022',
    pinCode: '2001',
    userId: 6,
    name: 'Hayk',
    name_tr: 'Հայկ'
}, {
    username: 'vahe2022',
    pinCode: '8472',
    userId: 7,
    name: 'Vahe',
    name_tr: 'Վահե'
}, {
    username: 'ando2022',
    pinCode: '0199',
    userId: 8,
    name: 'Andranik',
    name_tr: 'Անդրանիկ'
}, {
    username: 'koro2022',
    pinCode: '1717',
    userId: 9,
    name: 'Koryun',
    name_tr: 'Կորյուն'
}, {
    username: 'negouse',
    pinCode: '7700',
    userId: 10,
    name: 'Vanya',
    name_tr: 'Ваня'
}, {
    username: 'bodya',
    pinCode: '1919',
    userId: 11,
    name: 'Bodya',
    name_tr: 'Бодя'
}];

const _Matches = [{
    matchId: 1,
    t1: 'QAT',
    t2: 'ECU',
    date: new Date('20 Nov 2022, 20:00 GMT+0400')
}, {
    matchId: 2,
    t1: 'ENG',
    t2: 'IRN',
    date: new Date('21 Nov 2022, 17:00 GMT+0400')
}, {
    matchId: 3,
    t1: 'SEN',
    t2: 'NED',
    date: new Date('21 Nov 2022, 20:00 GMT+0400')
}, {
    matchId: 4,
    t1: 'USA',
    t2: 'WAL',
    date: new Date('21 Nov 2022, 23:00 GMT+0400')
},{
    matchId: 5,
    t1: 'ARG',
    t2: 'KSA',
    date: new Date('22 Nov 2022, 14:00 GMT+0400')
}, {
    matchId: 6,
    t1: 'DEN',
    t2: 'TUN',
    date: new Date('22 Nov 2022, 17:00 GMT+0400')
}, {
    matchId: 7,
    t1: 'MEX',
    t2: 'POL',
    date: new Date('22 Nov 2022, 20:00 GMT+0400')
}, {
    matchId: 8,
    t1: 'FRA',
    t2: 'AUS',
    date: new Date('22 Nov 2022, 23:00 GMT+0400')
},{
    matchId: 9,
    t1: 'MAR',
    t2: 'CRO',
    date: new Date('23 Nov 2022, 14:00 GMT+0400')
}, {
    matchId: 10,
    t1: 'GER',
    t2: 'JPN',
    date: new Date('23 Nov 2022, 17:00 GMT+0400')
}, {
    matchId: 11,
    t1: 'ESP',
    t2: 'CRC',
    date: new Date('23 Nov 2022, 20:00 GMT+0400')
}, {
    matchId: 12,
    t1: 'BEL',
    t2: 'CAN',
    date: new Date('23 Nov 2022, 23:00 GMT+0400')
},{
    matchId: 13,
    t1: 'SUI',
    t2: 'CMR',
    date: new Date('24 Nov 2022, 14:00 GMT+0400')
}, {
    matchId: 14,
    t1: 'URU',
    t2: 'KOR',
    date: new Date('24 Nov 2022, 17:00 GMT+0400')
}, {
    matchId: 15,
    t1: 'POR',
    t2: 'GHA',
    date: new Date('24 Nov 2022, 20:00 GMT+0400')
}, {
    matchId: 16,
    t1: 'BRA',
    t2: 'SRB',
    date: new Date('24 Nov 2022, 23:00 GMT+0400')
}];

const _Matches2 = [{
    matchId: 17,
    t1: 'wal',
    t2: 'irn',
    date: new Date('25 Nov 2022, 14:00 GMT+0400')
}, {
    matchId: 18,
    t1: 'qat',
    t2: 'sen',
    date: new Date('25 Nov 2022, 17:00 GMT+0400')
}, {
    matchId: 19,
    t1: 'ned',
    t2: 'ecu',
    date: new Date('25 Nov 2022, 20:00 GMT+0400')
}, {
    matchId: 20,
    t1: 'eng',
    t2: 'usa',
    date: new Date('25 Nov 2022, 23:00 GMT+0400')
},{
    matchId: 21,
    t1: 'tun',
    t2: 'aus',
    date: new Date('26 Nov 2022, 14:00 GMT+0400')
}, {
    matchId: 22,
    t1: 'pol',
    t2: 'ksa',
    date: new Date('26 Nov 2022, 17:00 GMT+0400')
}, {
    matchId: 23,
    t1: 'fra',
    t2: 'den',
    date: new Date('26 Nov 2022, 20:00 GMT+0400')
}, {
    matchId: 24,
    t1: 'arg',
    t2: 'mex',
    date: new Date('26 Nov 2022, 23:00 GMT+0400')
},{
    matchId: 25,
    t1: 'jpn',
    t2: 'crc',
    date: new Date('27 Nov 2022, 14:00 GMT+0400')
}, {
    matchId: 26,
    t1: 'bel',
    t2: 'mar',
    date: new Date('27 Nov 2022, 17:00 GMT+0400')
}, {
    matchId: 27,
    t1: 'cro',
    t2: 'can',
    date: new Date('27 Nov 2022, 20:00 GMT+0400')
}, {
    matchId: 28,
    t1: 'esp',
    t2: 'ger',
    date: new Date('27 Nov 2022, 23:00 GMT+0400')
},{
    matchId: 29,
    t1: 'cmr',
    t2: 'srb',
    date: new Date('28 Nov 2022, 14:00 GMT+0400')
}, {
    matchId: 30,
    t1: 'kor',
    t2: 'gha',
    date: new Date('28 Nov 2022, 17:00 GMT+0400')
}, {
    matchId: 31,
    t1: 'bra',
    t2: 'sui',
    date: new Date('28 Nov 2022, 20:00 GMT+0400')
}, {
    matchId: 32,
    t1: 'por',
    t2: 'uru',
    date: new Date('28 Nov 2022, 23:00 GMT+0400')
}];

const _Matches3 = [{
    matchId: 33,
    t1: 'ecu',
    t2: 'sen',
    date: new Date('29 Nov 2022, 19:00 GMT+0400')
}, {
    matchId: 34,
    t1: 'ned',
    t2: 'qat',
    date: new Date('29 Nov 2022, 19:00 GMT+0400')
}, {
    matchId: 35,
    t1: 'irn',
    t2: 'usa',
    date: new Date('29 Nov 2022, 23:00 GMT+0400')
}, {
    matchId: 36,
    t1: 'wal',
    t2: 'eng',
    date: new Date('29 Nov 2022, 23:00 GMT+0400')
},{
    matchId: 37,
    t1: 'aus',
    t2: 'den',
    date: new Date('30 Nov 2022, 19:00 GMT+0400')
}, {
    matchId: 38,
    t1: 'tun',
    t2: 'fra',
    date: new Date('30 Nov 2022, 19:00 GMT+0400')
}, {
    matchId: 39,
    t1: 'pol',
    t2: 'arg',
    date: new Date('30 Nov 2022, 23:00 GMT+0400')
}, {
    matchId: 40,
    t1: 'ksa',
    t2: 'mex',
    date: new Date('30 Nov 2022, 23:00 GMT+0400')
},{
    matchId: 41,
    t1: 'cro',
    t2: 'bel',
    date: new Date('1 Nov 2022, 19:00 GMT+0400')
}, {
    matchId: 42,
    t1: 'can',
    t2: 'mar',
    date: new Date('1 Nov 2022, 19:00 GMT+0400')
}, {
    matchId: 43,
    t1: 'crc',
    t2: 'ger',
    date: new Date('1 Nov 2022, 23:00 GMT+0400')
}, {
    matchId: 44,
    t1: 'jpn',
    t2: 'esp',
    date: new Date('1 Nov 2022, 23:00 GMT+0400')
},{
    matchId: 45,
    t1: 'gha',
    t2: 'uru',
    date: new Date('2 Nov 2022, 19:00 GMT+0400')
}, {
    matchId: 46,
    t1: 'kor',
    t2: 'por',
    date: new Date('2 Nov 2022, 19:00 GMT+0400')
}, {
    matchId: 47,
    t1: 'cmr',
    t2: 'bra',
    date: new Date('2 Nov 2022, 23:00 GMT+0400')
}, {
    matchId: 48,
    t1: 'srb',
    t2: 'sui',
    date: new Date('2 Nov 2022, 23:00 GMT+0400')
}];

const Results = [{
    g1: 0,
    g2: 2
}, {
    g1: 6,
    g2: 2
}, {
    g1: 0,
    g2: 2
}, {
    g1: 1,
    g2: 1
}, {
    g1: 1,
    g2: 2
}, {
    g1: 0,
    g2: 0
}, {
    g1: 0,
    g2: 0
}, {
    g1: 4,
    g2: 1
}, {
    g1: 0,
    g2: 0
}, {
    g1: 1,
    g2: 2
}, {
    g1: 7,
    g2: 0
}, {
    g1: 1,
    g2: 0
}, {
    g1: 1,
    g2: 0
}, {
    g1: 0,
    g2: 0
}, {
    g1: 3,
    g2: 2
}, {
    g1: 2,
    g2: 0
}];

// const btn1 = document.querySelector('.btn1');
// const btn2 = document.querySelector('.btn2');
// const btn3 = document.querySelector('.btn3');
// const btn4 = document.querySelector('.btn4');
// const btn5 = document.querySelector('.btn5');

// btn1.addEventListener('click', async () => {
//     const data = {
//         username: 'mike0199',
//         pinCode: '9089'
//     };
//     const result = await fetch('/setResult', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//     });
//     console.log(result.json());
// });

// createUser

// btn1.addEventListener('click', async () => {
//     // let i = 1;
//     for (let i = 17; i <=48; i++ ) {
//         const data = {
//             matchId: i,
//             g1: 0,
//             g2: 0,
//             finished: 'no'
//         }
//         const result = await fetch('/setResult', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(data),
//         });
//         console.log(result.json());
//         // i++;
//     }
// });

// btn2.addEventListener('click', async () => {
//     const da = {
//         userId: 1,
//         matchId: 7,
//         g2: 3
//     }
//     const result = await fetch('/setPrediction', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(da),
//     });
//     console.log(result.json());
// });

