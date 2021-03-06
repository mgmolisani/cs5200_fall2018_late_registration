import React, {Component, Fragment} from 'react';
import LoginSection from '../home/LoginSection';
import UserContext from '../contexts/UserContext';
import DynamicCardField from '../shared/DynamicCardField';
import {UserService} from '../services/UserService';

export default class Home
    extends Component {

    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            userType: 'PLAYER'
        };
        this.updateField = this.updateField.bind(this);
    }

    static users = [
        {
            username: 'alice',
            password: 'alice'
        },
        {
            username: 'bob',
            password: 'bob'
        },
        {
            username: 'charlie',
            password: 'charlie'
        },
        {
            username: 'admin',
            password: 'admin'
        }
    ];

    updateField(input, value) {
        this.setState({[input]: value});
    }

    render() {
        return (
            <UserContext.Consumer>
                {({currentUser, setCurrentUser}) => <Fragment>
                    <LoginSection title={'Select one of the following users to imitate:'}
                                  users={Home.users}/>
                    <h2 className='text-center'>
                        {currentUser
                            ? `You are currently logged in as ${currentUser.username}.`
                            : 'Select a user to log in as from the selections above or make a new user below and' +
                            ' automatically be logged in as the new user.'
                        }
                    </h2>
                    <DynamicCardField id={'username'}
                                      label={'Username'}
                                      value={this.state.username}
                                      defaultValue={this.state.username}
                                      onChange={event => this.updateField('username', event.target.value)}
                                      isEditing={true}/>
                    <DynamicCardField id={'password'}
                                      label={'password'}
                                      value={this.state.password}
                                      defaultValue={this.state.password}
                                      onChange={event => this.updateField('password', event.target.value)}
                                      isEditing={true}/>
                    <DynamicCardField id={'first'}
                                      label={'First Name'}
                                      value={this.state.firstName}
                                      defaultValue={this.state.firstName}
                                      onChange={event => this.updateField('firstName', event.target.value)}
                                      isEditing={true}/>
                    <DynamicCardField id={'last'}
                                      label={'Last Name'}
                                      value={this.state.lastName}
                                      defaultValue={this.state.lastName}
                                      onChange={event => this.updateField('lastName', event.target.value)}
                                      isEditing={true}/>
                    <div className='form-group'>
                        <label htmlFor={'_User Type'}>
                            User Type
                        </label>
                        <select className='form-control'
                                id={'_User Type'}
                                value={this.state.userType}
                                onChange={event => this.updateField('userType', event.target.value)}>
                            <option value={'PLAYER'}>
                                Player
                            </option>
                            <option value={'COACH'}>
                                Coach
                            </option>
                            <option value={'MANAGER'}>
                                Manager
                            </option>
                            <option value={'ADMIN'}>
                                Administrator
                            </option>
                        </select>
                    </div>
                    <button className='btn btn-block btn-dark mb-3'
                            onClick={() => UserService.createUser(this.state)
                                .then(user => setCurrentUser(user))}>
                        Login New User
                    </button>
                </Fragment>}
            </UserContext.Consumer>
        );
    }
}