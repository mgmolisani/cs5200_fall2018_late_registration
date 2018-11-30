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
require('./daos/game').addTeamToGame('5c00c79ff034dd40402afcf7', '5c00c5b50caaf149d876ed3b');



module.exports = connect;