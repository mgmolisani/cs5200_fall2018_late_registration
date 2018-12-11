import React, {Component, Fragment} from 'react';
import UserSection from '../user/UserSection';
import Omnibar from '../shared/Omnibar';
import UserContext from '../contexts/UserContext';

export default class User
    extends Component {

    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            profile: [],
            players: [],
            coaches: [],
            managers: [],
            administrators: [],
            allUsers: [],
            search: ''
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.createNewUser = this.createNewUser.bind(this);
    }

    handleSearch(search) {
        this.setState({search});
    }

    filterUsers(users) {
        const search = this.state.search.toLowerCase();
        return users.filter(user => user.username.toLowerCase().includes(search)
            || user.firstName.toLowerCase().includes(search)
            || user.lastName.toLowerCase().includes(search));
    };

    createNewUser() {
        //TODO
    }

    componentDidMount() {
        const profile = [
            {
                _id: 1,
                username: 'mm',
                firstName: 'Mike',
                lastName: 'Molisani',
                userType: 'PLAYER',
                endorsedBy: [4],
                teams: []
            }
        ];
        const players = [
            {
                _id: 1,
                username: 'mm',
                firstName: 'Mike',
                lastName: 'Molisani',
                userType: 'PLAYER',
                endorsedBy: [4],
                teams: []
            },
            {
                _id: 5,
                username: 'mm',
                firstName: 'Mgm',
                lastName: 'Molisani',
                userType: 'PLAYER',
                teams: [],
                endorsedBy: []
            }
        ];
        const coaches = [
            {
                _id: 2,
                username: 'mgm',
                firstName: 'Mike',
                lastName: 'Molisani',
                userType: 'COACH',
                ratings: [1, 2, 3, 4, 5, 5, 5, 5, 5, 5, 4, 5, 4, 3, 2, 3, 4, 5],
                yearsExperience: 20,
                teams: []
            }
        ];
        const managers = [
            {
                _id: 3,
                username: 'mmm',
                firstName: 'Mike',
                lastName: 'Molisani',
                userType: 'MANAGER',
                hiredOn: '2011-12-12'
            }
        ];
        const administrators = [
            {
                _id: 4,
                username: 'admin',
                firstName: 'Mike',
                lastName: 'Molisani',
                userType: 'ADMIN'
            }
        ];

        this.setState({
            profile: profile,
            players: players,
            coaches: coaches,
            managers: managers,
            administrators: administrators,
            allUsers: [...players, ...coaches, ...managers, ...administrators]
        });
    }

    render() {
        return (
            <Fragment>
                <UserContext.Consumer>
                    {({currentUser}) => <Omnibar value={this.state.search}
                                                 onChange={event => this.handleSearch(event.target.value)}
                                                 showButton={currentUser.userType === 'ADMIN'}
                                                 onClick={this.createNewUser}
                                                 buttonLabel={'Create New User'}/>
                    }
                </UserContext.Consumer>
                <UserSection title={'My Profile'}
                             users={this.filterUsers(this.state.profile)}/>
                <UserSection title={'Players'}
                             users={this.filterUsers(this.state.players)}/>
                <UserSection title={'Coaches'}
                             users={this.filterUsers(this.state.coaches)}/>
                <UserSection title={'Managers'}
                             users={this.filterUsers(this.state.managers)}/>
                <UserSection title={'Administrators'}
                             users={this.filterUsers(this.state.administrators)}/>
                <UserSection title={'All Users'}
                             users={this.filterUsers(this.state.allUsers)}/>
            </Fragment>
        );
    }
}