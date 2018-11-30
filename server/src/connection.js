const mongoose = require('mongoose');

const connect = function() {
  mongoose.connect('mongodb://localhost/late_registration');
};

connect();
require('./models/Game').create({
    gameType: 'Fooseball'
});
require('./models/Game').create({
    gameType: 'Football'
});

require('./models/Team').create({
    name: 'Warriors'
});

require('./daos/game').addTeamToGame('5c0173ee378849299c5e2990', '5c0173ee378849299c5e2991');
require('./daos/game').updateTeamScore('5c0173ee378849299c5e2990', '5c0173ee378849299c5e2991', 12);
require('./daos/game').endGame('5c0173ee378849299c5e2990');
require('./daos/game').findAllGamesByType('Football').then(res => console.log(res));

module.exports = connect;