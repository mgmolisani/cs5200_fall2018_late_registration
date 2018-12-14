import React, {Component, Fragment} from 'react';
import UserSection from '../user/UserSection';
import Omnibar from '../shared/Omnibar';
import UserContext from '../contexts/UserContext';
import {UserService} from '../services/UserService';
import {FitbitService} from '../services/FitbitService';

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
        this.rateCoach = this.rateCoach.bind(this);
        this.toggleEndorsement = this.toggleEndorsement.bind(this);
    }

    handleSearch(search) {
        this.setState({search});
    }

    searchUsers(users) {
        const search = this.state.search.toLowerCase();
        return users.filter(user => (user.username && user.username.toLowerCase().includes(search))
            || (user.firstName && user.firstName.toLowerCase().includes(search))
            || (user.lastName && user.lastName.toLowerCase().includes(search)));
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

    rateCoach(coachId, rating) {
        UserService.rateCoach(coachId, rating)
            .then(() => this.refreshData());
    }

    toggleEndorsement(endorsee, endorser) {
        if (endorsee.endorsedBy.some(endoId => {
            return endoId === endorser._id;
        })) {
            UserService.unendorsePlayer(endorsee._id, endorser._id)
                .then(() => this.refreshData());
        } else {
            UserService.endorsePlayer(endorsee._id, endorser._id)
                .then(() => this.refreshData());
        }
    }

    refreshData() {
        return UserService.findAllUsers()
            .then(users => {
                return Promise.all(users.map(user => {
                    if ((user.fitbitToken && user.fitbitToken) !== undefined) {
                        return FitbitService.findLifetimeStats(user.fitbitToken, user.fitbitId)
                            .then(stats => {
                                console.log(stats);
                                user.distance = stats.distance;
                                user.steps = stats.steps;
                                return user;
                            });
                    } else {
                        return user;
                    }
                }));
            })
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
                                 deleteUser={this.deleteUser}
                                 rateCoach={this.rateCoach}
                                 toggleEndorsement={this.toggleEndorsement}/>
                    {currentUser.userType === 'PLAYER' && <UserSection title={'Endorse Me'}
                                 users={this.searchUsers(users.filter(user => currentUser.endorsedBy.some(id => id === user._id)))}
                                 updateUser={this.updateUser}
                                 deleteUser={this.deleteUser}
                                 rateCoach={this.rateCoach}
                                 toggleEndorsement={this.toggleEndorsement}/>}
                    {currentUser.userType === 'PLAYER' && <UserSection title={'My Endorsements'}
                                 users={this.searchUsers(users.filter(user => user.userType === 'PLAYER' && user.endorsedBy.some(id => id === currentUser._id)))}
                                 updateUser={this.updateUser}
                                 deleteUser={this.deleteUser}
                                 rateCoach={this.rateCoach}
                                 toggleEndorsement={this.toggleEndorsement}/>}
                    <UserSection title={'Players'}
                                 users={this.searchUsers(users.filter(user => user.userType === 'PLAYER'))}
                                 updateUser={this.updateUser}
                                 deleteUser={this.deleteUser}
                                 rateCoach={this.rateCoach}
                                 toggleEndorsement={this.toggleEndorsement}/>
                    <UserSection title={'Coaches'}
                                 users={this.searchUsers(users.filter(user => user.userType === 'COACH'))}
                                 updateUser={this.updateUser}
                                 deleteUser={this.deleteUser}
                                 rateCoach={this.rateCoach}
                                 toggleEndorsement={this.toggleEndorsement}/>
                    <UserSection title={'Managers'}
                                 users={this.searchUsers(users.filter(user => user.userType === 'MANAGER'))}
                                 updateUser={this.updateUser}
                                 deleteUser={this.deleteUser}
                                 rateCoach={this.rateCoach}
                                 toggleEndorsement={this.toggleEndorsement}/>
                    <UserSection title={'Administrators'}
                                 users={this.searchUsers(users.filter(user => user.userType === 'ADMIN'))}
                                 updateUser={this.updateUser}
                                 deleteUser={this.deleteUser}
                                 rateCoach={this.rateCoach}
                                 toggleEndorsement={this.toggleEndorsement}/>
                    <UserSection title={'All Users'}
                                 users={this.searchUsers(this.state.users)}
                                 updateUser={this.updateUser}
                                 deleteUser={this.deleteUser}
                                 rateCoach={this.rateCoach}
                                 toggleEndorsement={this.toggleEndorsement}/>
                </Fragment>}
            </UserContext.Consumer>
        );
    }
}