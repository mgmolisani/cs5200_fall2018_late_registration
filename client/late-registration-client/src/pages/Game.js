import React, {Component, Fragment} from 'react';
import GameSection from '../game/GameSection';
import Omnibar from '../shared/Omnibar';
import UserContext from '../contexts/UserContext';

export default class Game
    extends Component {

    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            myGames: [],
            allGames: [],
            search: ''
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.createNewGame = this.createNewGame.bind(this);
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

    createNewGame() {
        //TODO
    }

    componentDidMount() {
        const games = [{
            _id: 1,
            gameType: 'Football',
            start: '2018-12-12',
            location: 'My house',
            isOver: true,
            manager: {
                _id: 3,
                firstName: 'Dick',
                lastName: 'Help'
            },
            teams: [
                {
                    team: {
                        _id: 1,
                        name: 'Rogue Nation',
                        logo: 'https://images-platform.99static.com/BYBl73kycvZMCvyWN6v7Ssm4c_U=/420x0:1502x1082/fit-in/900x675/99designs-contests-attachments/80/80458/attachment_80458293',
                        mascot: 'Rogue',
                        hometown: 'Boston, MA',
                        coach: {
                            firstName: 'Bobby',
                            lastName: 'Boy'
                        },
                        players: [
                            {
                                _id: 1,
                                firstName: 'Mike',
                                lastName: 'Molisani'
                            }
                        ]
                    },
                    score: 100
                },
                {
                    team: {
                        _id: 2,
                        name: 'Rogie Nation',
                        logo: 'https://images-platform.99static.com/BYBl73kycvZMCvyWN6v7Ssm4c_U=/420x0:1502x1082/fit-in/900x675/99designs-contests-attachments/80/80458/attachment_80458293',
                        mascot: 'Rogue',
                        hometown: 'Boston, MA',
                        coach: {
                            firstName: 'Bobby',
                            lastName: 'Boy'
                        },
                        players: [
                            {
                                _id: 1,
                                firstName: 'Mike',
                                lastName: 'Molisani'
                            }
                        ]
                    },
                    score: 99
                }
            ]
        }];
        this.setState({
            myGames: games,
            allGames: games
        });
    }

    render() {
        return (
            <Fragment>
                <UserContext.Consumer>
                    {({currentUser}) => <Omnibar value={this.state.search}
                                                 onChange={event => this.handleSearch(event.target.value)}
                                                 showButton={currentUser.userType === 'MANAGER'}
                                                 onClick={this.createNewGame}
                                                 buttonLabel={'Create New Game'}/>
                    }
                </UserContext.Consumer>
                <GameSection title={'My Games'}
                             games={this.filterGames(this.state.myGames)}/>
                <GameSection title={'All Games'}
                             games={this.filterGames(this.state.allGames)}/>
            </Fragment>
        );
    }
}