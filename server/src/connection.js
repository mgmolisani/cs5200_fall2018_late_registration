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

require('./daos/game').addTeamToGame('5c016bfd953c6d488cec3b39', '5c016bfd953c6d488cec3b3a');
require('./daos/game').updateTeamScore('5c016bfd953c6d488cec3b39', '5c016bfd953c6d488cec3b3a', 12);



module.exports = connect;