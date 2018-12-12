import React, {Component, Fragment} from 'react';
import TeamSection from '../team/TeamSection';
import Omnibar from '../shared/Omnibar';
import UserContext from '../contexts/UserContext';
import {TeamService} from '../services/TeamService';

export default class Team
    extends Component {

    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            teams: [],
            search: ''
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.createNewTeam = this.createNewTeam.bind(this);
        this.updateTeam = this.updateTeam.bind(this);
        this.deleteTeam = this.deleteTeam.bind(this);
        this.addPlayerToTeam = this.addPlayerToTeam.bind(this);
        this.removePlayerFromTeam = this.removePlayerFromTeam.bind(this);
    }

    handleSearch(search) {
        this.setState({search});
    }

    filterTeams(teams) {
        const search = this.state.search.toLowerCase();
        return teams.filter(team => team.name.toLowerCase().includes(search)
            || team.mascot.toLowerCase().includes(search)
            || team.hometown.toLowerCase().includes(search));
    }

    createNewTeam(coachId) {
        TeamService.createTeam({
            name: 'new team',
            coach: coachId
        }).then(() => this.refreshData());
    }

    updateTeam(teamId, team) {
        TeamService.updateTeam(teamId, team)
            .then(() => this.refreshData());
    }

    deleteTeam(teamId) {
        TeamService.deleteTeam(teamId)
            .then(() => this.refreshData());
    }

    addPlayerToTeam(teamId, userId) {
        TeamService.addPlayerToTeam(teamId, userId)
            .then(() => this.refreshData());
    }

    removePlayerFromTeam(teamId, userId) {
        TeamService.removePlayerFromTeam(teamId, userId)
            .then(() => this.refreshData());
    }

    refreshData() {
        return TeamService.findAllTeams()
            .then(teams => {
                this.setState({
                    teams: teams
                });
            });
    }

    componentDidMount() {
        this.refreshData();
    }

    render() {
        return (
            <UserContext.Consumer>
                {({currentUser}) => <Fragment>
                    <Omnibar value={this.state.search}
                             onChange={event => this.handleSearch(event.target.value)}
                             showButton={currentUser.userType === 'COACH'}
                             onClick={() => this.createNewTeam(currentUser._id)}
                             buttonLabel={'Create New Team'}/>
                    <TeamSection title={'My Teams'}
                                 teams={this.filterTeams(this.state.teams.filter(team => team.coach._id === currentUser._id))}
                                 updateTeam={this.updateTeam}
                                 deleteTeam={this.deleteTeam}
                                 addPlayerToTeam={this.addPlayerToTeam}
                                 removePlayerFromTeam={this.removePlayerFromTeam}/>
                    <TeamSection title={'All Teams'}
                                 teams={this.filterTeams(this.state.teams)}
                                 updateTeam={this.updateTeam}
                                 deleteTeam={this.deleteTeam}
                                 addPlayerToTeam={this.addPlayerToTeam}
                                 removePlayerFromTeam={this.removePlayerFromTeam}/>
                </Fragment>}
            </UserContext.Consumer>
        );
    }
}