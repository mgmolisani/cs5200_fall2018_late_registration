const teamModel = require('../models/Team');

const createTeam = Team => {
    return teamModel.create(Team);
};

const updateTeam = (id, Team) => {
    return teamModel.findByIdAndUpdate(id, Team).exec();
};

const deleteTeam = id => {
    return teamModel.findByIdAndDelete(id).exec();
};

const findAllTeams = () => {
    return teamModel.find().exec();
};


const findTeamById = id => {
    return teamModel.findById(id).exec();
};



module.exports = {
    createTeam,
    updateTeam,
    deleteTeam,
    findAllTeams,
    findTeamById
};