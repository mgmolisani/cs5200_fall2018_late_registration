import React, {Component, Fragment} from 'react';
import GameSection from '../game/GameSection';
import Omnibar from '../shared/Omnibar';
import UserContext from '../contexts/UserContext';
import {GameService} from '../services/GameService';

export default class Game
    extends Component {

    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            games: [],
            search: ''
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.createNewGame = this.createNewGame.bind(this);
        this.updateGame = this.updateGame.bind(this);
        this.deleteGame = this.deleteGame.bind(this);
        this.addTeamToGameByTeamName = this.addTeamToGameByTeamName.bind(this);
        this.removeTeamFromGame = this.removeTeamFromGame.bind(this);
        this.updateScore = this.updateScore.bind(this);
        this.endGame = this.endGame.bind(this);
    }

    createNewGame(managerId) {
        GameService.createGame({
            gameType: 'Football',
            manager: managerId
        }).then(() => this.refreshData());
    }

    updateGame(gameId, game) {
        GameService.updateGame(gameId, game)
            .then(() => this.refreshData());
    }

    deleteGame(gameId) {
        GameService.deleteGame(gameId)
            .then(() => this.refreshData());
    }

    addTeamToGameByTeamName(gameId, teamName) {
        GameService.addTeamToGameByTeamName(gameId, teamName)
            .then(() => this.refreshData());
    }

    removeTeamFromGame(gameId, teamId) {
        GameService.removeTeamFromGame(gameId, teamId)
            .then(() => this.refreshData());
    }

    updateScore(gameId, teamId, score) {
        GameService.updateScore(gameId, teamId, score)
            .then(() => this.refreshData());
    }

    endGame(gameId) {
        GameService.endGame(gameId)
            .then(() => this.refreshData());
    }

    handleSearch(search) {
        this.setState({search});
    }

    filterGames(games) {
        const search = this.state.search.toLowerCase();
        return games.filter(game => game.gameType.toLowerCase().includes(search)
            || game.location.toLowerCase().includes(search)
            || game.teams.some(team => team.team.name.toLowerCase().includes(search)));
    }

    refreshData() {
        return GameService.findAllGames()
            .then(games => {
                this.setState({
                    games: games
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
                             showButton={currentUser.userType === 'MANAGER'}
                             onClick={() => this.createNewGame(currentUser._id)}
                             buttonLabel={'Create New Game'}/>
                    <GameSection title={'My Games'}
                                 games={this.filterGames(this.state.games.filter(game => game.manager._id === currentUser._id))}
                                 updateGame={this.updateGame}
                                 deleteGame={this.deleteGame}
                                 addTeamToGameByTeamName={this.addTeamToGameByTeamName}
                                 removeTeamFromGame={this.removeTeamFromGame}
                                 updateScore={this.updateScore}
                                 endGame={this.endGame}/>
                    <GameSection title={'All Games'}
                                 games={this.filterGames(this.state.games)}
                                 updateGame={this.updateGame}
                                 deleteGame={this.deleteGame}
                                 addTeamToGameByTeamName={this.addTeamToGameByTeamName}
                                 removeTeamFromGame={this.removeTeamFromGame}
                                 updateScore={this.updateScore}
                                 endGame={this.endGame}/>
                </Fragment>}
            </UserContext.Consumer>
        );
    }
}