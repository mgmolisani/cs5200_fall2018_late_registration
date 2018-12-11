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
    _id: 1,
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
    _id: 2,
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
    _id: 1,
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
    _id: 3,
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
    _id: 4,
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
    _id: 5,
    username: "admin",
    password: "admin",
  };

  let celtics = {
    _id: 1,
    name: "Boston Celtics",
    mascot: "Lucky the Leprechaun",
    hometown: "Boston",
    players: []
  };

    let patriots = {
      _id: 2,
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

  queries.push(teamDao.addPlayerToTeam(alice._id, patriots._id));
  queries.push(teamDao.addPlayerToTeam(bob._id, celtics._id));
  queries.push(teamDao.addPlayerToTeam(bob._id, redsox._id));
  queries.push(teamDao.addPlayerToTeam(echo._id, patriots._id));

  queries.push(teamDao.updateCoach(celtics._id, dan._id));
  queries.push(teamDao.updateCoach(redsox._id, charlie._id));
  queries.push(teamDao.updateCoach(patriots._id, charlie._id));

  results = Promise.all(queries);

  return results;
};


module.exports = {
  truncateDatabase,
  populateDatabase
};
