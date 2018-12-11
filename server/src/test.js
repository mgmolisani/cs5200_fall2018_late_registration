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
      teams: [],
      endorsedBy: []
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

  let aliceid = userDao.findUserByCredentials(alice.username, alice.password);
  let bobid = userDao.findUserByCredentials(bob.username, bob.password);
  let charlieid = userDao.findUserByCredentials(charlie.username, charlie.password);
  let danid = userDao.findUserByCredentials(dan.username, dan.password);
  let echoid = userDao.findUserByCredentials(echo.username, alice.password);

  queries.push(teamDao.createTeam(celtics));
  queries.push(teamDao.createTeam(redsox));
  queries.push(teamDao.createTeam(patriots));

  let celticsid = teamDao.getTeamByName("Boston Celtics")
  let patriotsid = teamDao.getTeamByName("New England Patriots")
  let redsoxid = teamDao.getTeamByName("Boston Red Sox",)

  ids = Promise.all(
      [aliceid, bobid, charlieid, danid, echoid, celticsid, patriotsid,
        redsoxid]);

  return ids.then(result => {
    console.log(result)

    alice_obj = result[0];
    bob_obj = result[1];
    charlie_obj = result[2];
    dan_obj = result[3];
    echo_obj = result[4];
    celtics_obj = result[5];
    patriots_obj = result[6];
    redsox_obj = result[7];

    queries.push(teamDao.addPlayerToTeam(alice_obj._id, patriots_obj._id));
    queries.push(teamDao.addPlayerToTeam(bob_obj._id, celtics_obj._id));
    queries.push(teamDao.addPlayerToTeam(bob_obj._id, redsox_obj._id));
    // queries.push(teamDao.addPlayerToTeam(echo_obj._id, patriots_obj._id));
    //
    queries.push(teamDao.updateCoach(celtics_obj._id, dan_obj._id));
    queries.push(teamDao.updateCoach(redsox_obj._id, charlie_obj._id));
    queries.push(teamDao.updateCoach(patriots_obj._id, charlie_obj._id));
  })
  .then(() => {
    return Promise.all(queries);
  });
};

module.exports = {
  truncateDatabase,
  populateDatabase
};
