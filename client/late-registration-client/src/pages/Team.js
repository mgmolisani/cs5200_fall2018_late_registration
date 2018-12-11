import React, {Component, Fragment} from 'react';
import TeamSection from '../team/TeamSection';
import SearchBar from '../shared/SearchBar';

export default class Team
    extends Component {

    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            myTeams: [],
            allTeams: [],
            search: ''
        };
        this.handleSearch = this.handleSearch.bind(this);
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

    componentDidMount() {
        const teams = [{
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
            ],
            posts: [
                {
                    _id: 1,
                    content: 'Hello there',
                    created: '2011-10-10',
                    postedBy: {
                        _id: 1,
                        username: 'mmmm',
                        firstName: 'Mike',
                        lastName: 'Molisani'
                    }
                },
                {
                    _id: 2,
                    content: 'Hello there Hello there Hello there Hello there Hello there Hello there Hello there' +
                        ' Hello there Hello there Hello there',
                    created: '2011-10-10',
                    postedBy: {
                        _id: 1,
                        username: 'mmmm',
                        firstName: 'Mike',
                        lastName: 'Molisani'
                    }
                }
            ]
        },
            {
                _id: 2,
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
                        _id: 5,
                        firstName: 'Mike',
                        lastName: 'Molisani'
                    }
                ],
                posts: []
            }];
        this.setState({
            myTeams: teams,
            allTeams: teams
        });
    }

    render() {
        return (
            <Fragment>
                <SearchBar value={this.state.search}
                           onChange={event => this.handleSearch(event.target.value)}/>
                <TeamSection title={'My Teams'}
                             teams={this.filterTeams(this.state.myTeams)}/>
                <TeamSection title={'All Teams'}
                             teams={this.filterTeams(this.state.allTeams)}/>
            </Fragment>
        );
    }
}