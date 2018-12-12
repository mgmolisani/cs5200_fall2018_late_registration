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