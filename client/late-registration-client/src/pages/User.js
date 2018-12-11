import React, {Component, Fragment} from 'react';
import UserSection from '../user/UserSection';
import Omnibar from '../shared/Omnibar';
import UserContext from '../contexts/UserContext';
import {UserService} from '../services/UserService';

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
            users: [],
            search: ''
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.createNewUser = this.createNewUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.refreshData = this.refreshData.bind(this);
    }

    handleSearch(search) {
        this.setState({search});
    }

    searchUsers(users) {
        const search = this.state.search.toLowerCase();
        return users.filter(user => user.username.toLowerCase().includes(search)
            || user.firstName.toLowerCase().includes(search)
            || user.lastName.toLowerCase().includes(search));
    };

    createNewUser() {
        UserService.createUser({
            username: 'newuser',
            password: 'password',
            firstName: 'first',
            lastName: 'last',
            userType: 'PLAYER'
        }).then(() => this.refreshData());
    }

    updateUser(userId, user) {
        UserService.updateUser(userId, user)
            .then(() => this.refreshData());
    }

    deleteUser(userId) {
        UserService.deleteUser(userId)
            .then(() => this.refreshData());
    }

    refreshData() {
        return UserService.findAllUsers()
            .then(users => {
                this.setState({
                    users: users
                });
            });
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
            administrators: administrators
        });
        this.refreshData();
    }

    render() {
        const {users} = this.state;
        return (
            <UserContext.Consumer>
                {({currentUser}) => <Fragment>
                    <Omnibar value={this.state.search}
                             onChange={event => this.handleSearch(event.target.value)}
                             showButton={currentUser.userType === 'ADMIN'}
                             onClick={this.createNewUser}
                             buttonLabel={'Create New User'}/>
                    <UserSection title={'My Profile'}
                                 users={this.searchUsers(users.filter(user => user._id === currentUser._id))}
                                 updateUser={this.updateUser}
                                 deleteUser={this.deleteUser}/>
                    <UserSection title={'Players'}
                                 users={this.searchUsers(users.filter(user => user.userType === 'PLAYER'))}
                                 updateUser={this.updateUser}
                                 deleteUser={this.deleteUser}/>
                    <UserSection title={'Coaches'}
                                 users={this.searchUsers(users.filter(user => user.userType === 'COACH'))}
                                 updateUser={this.updateUser}
                                 deleteUser={this.deleteUser}/>
                    <UserSection title={'Managers'}
                                 users={this.searchUsers(users.filter(user => user.userType === 'MANAGER'))}
                                 updateUser={this.updateUser}
                                 deleteUser={this.deleteUser}/>
                    <UserSection title={'Administrators'}
                                 users={this.searchUsers(users.filter(user => user.userType === 'ADMIN'))}
                                 updateUser={this.updateUser}
                                 deleteUser={this.deleteUser}/>
                    <UserSection title={'All Users'}
                                 users={this.searchUsers(this.state.users)}
                                 updateUser={this.updateUser}
                                 deleteUser={this.deleteUser}/>
                </Fragment>}
            </UserContext.Consumer>
        );
    }
}