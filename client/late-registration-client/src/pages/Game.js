import React, {Component, Fragment} from 'react';
import GameSection from '../game/GameSection';
import Omnibar from '../shared/Omnibar';
import UserContext from '../contexts/UserContext';
import {GameService} from '../services/GameService';
import TeamSection from '../team/TeamSection';

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
                                 deleteGame={this.deleteGame}/>
                    <GameSection title={'All Games'}
                                 games={this.filterGames(this.state.games)}
                                 updateGame={this.updateGame}
                                 deleteGame={this.deleteGame}/>
                </Fragment>}
            </UserContext.Consumer>
        );
    }
}