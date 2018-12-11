import React, {Component, Fragment} from 'react';
import GameSection from '../game/GameSection';

export default class Game
    extends Component {

    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            myGames: [],
            allGames: []
        }
    }

    componentDidMount() {
        const games = [{
            _id: 1,
            gameType: 'Football',
            start: '2018-12-12',
            location: 'My house',
            isOver: true,
            manager: {
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
                <GameSection title={'My Games'}
                             games={this.state.myGames}/>
                <GameSection title={'All Games'}
                             games={this.state.allGames}/>
            </Fragment>
        );
    }
}