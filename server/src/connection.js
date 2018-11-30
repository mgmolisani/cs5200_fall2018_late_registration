const mongoose = require('mongoose');

const connect = function() {
  mongoose.connect('mongodb://localhost/late_registration');
};

connect();
require('./models/Game').create({
    gameType: 'Fooseball'
});

require('./models/Team').create({
    name: 'Warriors'
});

require('./daos/game').findGameById('5c00ae71416a651ce40b10b8').then((res) => console.log(res));
require('./daos/game').addTeamToGame('5c00ae71416a651ce40b10b8', '5c00ae71416a651ce40b10b9');



module.exports = connect;