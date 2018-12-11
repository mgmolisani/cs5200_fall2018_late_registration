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
    coach: 3,
    players: []
  };

    let patriots = {
      _id: 2,
    name: "New England Patriots",
    mascot: "Pat Patriot",
    hometown: "New England",
    coach: 4,
    players: [1, 11]
  };

  let redsox = {
    name: "Boston Red Sox",
    mascot: "Red Sox",
    hometown: "Boston",
    coach: 4,
    players: [1, 2]
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

  queries.push(teamDao.(patriots));


  queries.push(dao.createAnswer(a123));
  queries.push(dao.createAnswer(a234));
  queries.push(dao.createAnswer(a345));
  queries.push(dao.createAnswer(a456));
  queries.push(dao.createAnswer(a567));
  queries.push(dao.createAnswer(a678));
  queries.push(dao.createAnswer(a789));
  queries.push(dao.createAnswer(a890));

  results = Promise.all(queries);

  return results;
};

testStudentsInitialCount = () => {
  return truncateDatabase()
  .then( () => {
    return populateDatabase();
  })
  .then( () => {
    return dao.findAllStudents();
  })
  .then( students => {
    let count = students.length;
    return assert.strictEqual(count, 2, 'Student list size does not equal 2.')
  })
};


testQuestionsInitialCount = () => {
  return truncateDatabase()
  .then( () => {
    return populateDatabase();
  })
  .then( () => {
    return dao.findAllQuestions();
  })
  .then( questions => {
    let count = questions.length;
    return assert.strictEqual(count, 4, 'Question list size does not equal 4.')
  })
};

testAnswersInitialCount = () => {
  return truncateDatabase()
  .then( () => {
    return populateDatabase();
  })
  .then( () => {
    return dao.findAllAnswers();
  })
  .then( answers => {
    let count = answers.length;
    return assert.strictEqual(count, 8, 'Answer list size does not equal 8.')
  })
};

testDeleteAnswer = () => {
  return truncateDatabase()
  .then( () => {
    return populateDatabase();
  })
  .then( () => {
    return dao.deleteAnswer(123);
  })
  .then( () => {
    return dao.findAllAnswers();
  })
  .then( answers => {
    let count = answers.length;
    return assert.strictEqual(count, 7, 'Answer list size does not equal 7.')
  })
};

testDeleteQuestion = () => {
  return truncateDatabase()
  .then( () => {
    return populateDatabase();
  })
  .then( () => {
    return dao.deleteQuestion(321);
  })
  .then( () => {
    return dao.findAllQuestions();
  })
  .then( questions => {
    let count = questions.length;
    return assert.strictEqual(count, 3, 'Question list size does not equal 3.')
  })
};

testDeleteStudent = () => {
  return truncateDatabase()
  .then( () => {
    return populateDatabase();
  })
  .then( () => {
    return dao.deleteStudent(123);
  })
  .then( () => {
    return dao.findAllStudents();
  })
  .then( students => {
    let count = students.length;
    return assert.strictEqual(count, 1, 'Student list size does not equal 1.')
  })
};

module.exports = {
  truncateDatabase,
  populateDatabase,
  testStudentsInitialCount,
  testQuestionsInitialCount,
  testAnswersInitialCount,
  testDeleteAnswer,
  testDeleteQuestion,
  testDeleteStudent,
};
