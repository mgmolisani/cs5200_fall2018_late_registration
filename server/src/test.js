let gameDao = require('./daos/gameDao')
let postDao = require('./daos/postDao')
let teamDao = require('./daos/teamDao')
let userDao = require('./daos/userDao')

const gameModel = require('./models/Game');
const postModel = require('./models/Post');
const teamModel = require('./models/Team');
const userModel = require('./models/User');

const assert = require('assert');

truncateDatabase = () => {
  return Promise.all([
    gameModel.deleteMany({}),
    postModel.deleteMany({}),
    teamModel.deleteMany({}),
    userModel.deleteMany({})
  ]);
};

populateDatabase = () => {

  queries = [];

  let alice = {
    firstName: "Alice",
    lastName: "Wonderland",
    username: "alice",
    password: "alice",
    userType: "PLAYER",
    player: {

    }
  };

  let bob = {
    firstName: "Bob",
    lastName: "Hope",
    username: "bob",
    password: "bob",
    userType: "MANAGER",
    manager: {
      hiredOn: new Date()
    }
  };

  let echo = {
    firstName: "Echo",
    lastName: "Wonderland",
    username: "echo",
    password: "echo",
    userType: "PLAYER",
    player: {
      teams: [],
      endorsedBy: []
    }
  };

  let charlie = {
    firstName: "Charlie",
    lastName: "Brown",
    username: "charlie",
    password: "charlie",
    userType: "COACH",
    coach: {
      ratings: [1, 2, 3, 4, 5, 5, 5, 5, 5, 5, 4, 5, 4, 3, 2, 3, 4, 5],
      yearsExperience: 20,
    }
  };

  let dan = {
    firstName: "Dan",
    lastName: "Craig",
    username: "dan",
    password: "dan",
    userType: "COACH",
    coach: {
      ratings: [4, 5, 4, 3, 2, 3, 4, 5],
      yearsExperience: 15,
    }
  };

  let admin = {
    username: "admin",
    password: "admin",
  };

  let celtics = {
    name: "Boston Celtics",
    mascot: "Lucky the Leprechaun",
    hometown: "Boston",
    players: []
  };

  let patriots = {
    name: "New England Patriots",
    mascot: "Pat Patriot",
    hometown: "New England",
    players: []
  };

  let redsox = {
    name: "Boston Red Sox",
    mascot: "Red Sox",
    hometown: "Boston",
    players: []
  };

  queries = []

  queries.push(userDao.createUser(alice));
  queries.push(userDao.createUser(bob));
  queries.push(userDao.createUser(charlie));
  queries.push(userDao.createUser(dan));
  queries.push(userDao.createUser(echo));

  queries.push(teamDao.createTeam(celtics));
  queries.push(teamDao.createTeam(redsox));
  queries.push(teamDao.createTeam(patriots));

  return Promise.all(queries).then(result => {
    alice_obj = result[0];
    bob_obj = result[1];
    charlie_obj = result[2];
    dan_obj = result[3];
    echo_obj = result[4];
    celtics_obj = result[5];
    redsox_obj = result[6];
    patriots_obj = result[7];

    updates = []

    updates.push(teamDao.addPlayerToTeam(patriots_obj._id, alice_obj._id));
    updates.push(teamDao.addPlayerToTeam(celtics_obj._id, alice_obj._id));
    updates.push(teamDao.addPlayerToTeam(redsox_obj._id, echo_obj._id));
    updates.push(teamDao.addPlayerToTeam(patriots_obj._id, echo_obj._id));

    updates.push(teamDao.updateCoach(celtics_obj._id, dan_obj._id));
    updates.push(teamDao.updateCoach(redsox_obj._id, charlie_obj._id));
    updates.push(teamDao.updateCoach(patriots_obj._id, charlie_obj._id));

    Promise.all(updates).then(result => {
      return result;
    });
  })

};

module.exports = {
  truncateDatabase,
  populateDatabase
};
