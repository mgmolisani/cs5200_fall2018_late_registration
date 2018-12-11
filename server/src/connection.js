const mongoose = require('mongoose');
const express = require('express')
const app = express();
const bodyParser = require('body-parser');

const gameRoute = require('./routes/api/gameRoute');
const postRoute = require('./routes/api/postRoute');
const teamRoute = require('./routes/api/teamRoute');
const userRoute = require('./routes/api/userRoute');


app.use(bodyParser.json());

const connect = function () {
    return mongoose.connect('mongodb://localhost/late_registration');
};


connect()
    .then(() => {
        require('./models/Game').create({
            gameType: 'Fooseball'
        });
        require('./models/Game').create({
            gameType: 'Football'
        });

        require('./models/Team').create({
            name: 'Warriors'
        });
        //
        // require('./daos/game').addTeamToGame('5c0173ee378849299c5e2990', '5c0173ee378849299c5e2991');
        // require('./daos/game').updateTeamScore('5c0173ee378849299c5e2990', '5c0173ee378849299c5e2991', 12);
        // require('./daos/game').endGame('5c0173ee378849299c5e2990');
        // require('./daos/game').findAllGamesByType('Football').then(res => console.log(res));

        app.use('/game', gameRoute);
        app.use('/team', teamRoute);
        app.use('/post', postRoute);
        app.use('/user', userRoute);

    })


const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});

module.exports = connect;