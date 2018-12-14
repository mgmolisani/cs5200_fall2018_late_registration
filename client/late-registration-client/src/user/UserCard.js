import React, {Component, Fragment} from 'react';
import UserContext from '../contexts/UserContext';
import DynamicCardField from '../shared/DynamicCardField';
import {FitbitService} from '../services/FitbitService';

export default class UserCard
    extends Component {

    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            firstName: '',
            lastName: '',
            password: '',
            userType: '',
            yearsExperience: '',
            fitbitId: '',
            fitbitToken: '',
            editMode: false,
            showPlayerDetails: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    handleChange(input, value) {
        this.setState({[input]: value});
    }

    updateUser() {
        if (this.state.editMode) {
            console.log(this.state.userType);
            const user = {
                ...this.props.user,
                username: this.state.username || this.props.username,
                firstName: this.state.firstName || this.props.firstName,
                lastName: this.state.lastName || this.props.lastName,
                userType: this.state.userType || this.props.userType,
                fitbitId: this.state.fitbitId || this.props.fitbitId,
                fitbitToken: this.state.fitbitToken || this.props.fitbitToken,
                yearsExperience: this.state.yearsExperience ? parseInt(this.state.yearsExperience, 10) : parseInt(this.props.yearsExperience, 10),
            };
            this.props.updateUser(user);
        }
        this.setState(state => ({editMode: !state.editMode}));
    }

    render() {
        const {id, username, firstName, lastName, password, userType, fitbitId, fitbitToken, distance, steps, teams, endorsedBy, rating, yearsExperience, hiredOn} = this.props;
        return (
            <UserContext.Consumer>
                {({currentUser}) => {
                    return (
                        <div className='col-md-6 col-lg-4 mb-4'>
                            <div className='card'>
                                <div className='card-body'>
                                    <DynamicCardField id={id}
                                                      label={'Username'}
                                                      value={this.state.username}
                                                      defaultValue={username}
                                                      onChange={event => this.handleChange('username', event.target.value)}
                                                      isEditing={this.state.editMode}/>
                                    <DynamicCardField id={id}
                                                      label={'First Name'}
                                                      value={this.state.firstName}
                                                      defaultValue={firstName}
                                                      onChange={event => this.handleChange('firstName', event.target.value)}
                                                      isEditing={this.state.editMode}/>
                                    <DynamicCardField id={id}
                                                      label={'Last Name'}
                                                      value={this.state.lastName}
                                                      defaultValue={lastName}
                                                      onChange={event => this.handleChange('lastName', event.target.value)}
                                                      isEditing={this.state.editMode}/>
                                    {fitbitId
                                    && fitbitToken
                                    && <Fragment>
                                        <DynamicCardField id={id}
                                                          label={'Distance Traveled'}
                                                          defaultValue={distance + ' km'}/>
                                        <DynamicCardField id={id}
                                                          label={'Steps'}
                                                          defaultValue={steps + ' steps'}/>
                                    </Fragment>}
                                    {
                                        (
                                            currentUser.userType === 'ADMIN'
                                            || currentUser._id === id
                                        )
                                        && <Fragment>
                                            <DynamicCardField id={id}
                                                              label={'Password'}
                                                              value={this.state.password}
                                                              defaultValue={password}
                                                              onChange={event => this.handleChange('password', event.target.value)}
                                                              isEditing={this.state.editMode}/>
                                            <DynamicCardField id={id}
                                                              label={'Fitbit ID'}
                                                              value={this.state.fitbitId}
                                                              defaultValue={fitbitId}
                                                              onChange={event => this.handleChange('fitbitId', event.target.value)}
                                                              isEditing={this.state.editMode}
                                                              hidden/>
                                            <DynamicCardField id={id}
                                                              label={'Fitbit Token'}
                                                              value={this.state.fitbitToken}
                                                              defaultValue={fitbitToken}
                                                              onChange={event => this.handleChange('fitbitToken', event.target.value)}
                                                              isEditing={this.state.editMode}
                                                              hidden/>
                                        </Fragment>
                                    }
                                    {currentUser.userType === 'ADMIN'
                                    && <div className='form-group'>
                                        <label htmlFor={id + '_User Type'}>
                                            User Type
                                        </label>
                                        {
                                            this.state.editMode
                                                ? <select className='form-control'
                                                          id={id + '_User Type'}
                                                          value={this.state.userType || userType}
                                                          onChange={event => this.handleChange('userType', event.target.value)}>
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
                                                : <h5>
                                                    {userType}
                                                </h5>
                                        }
                                    </div>}
                                    {userType === 'COACH'
                                    && <DynamicCardField id={id}
                                                         label={'Years Experience'}
                                                         value={this.state.yearsExperience}
                                                         defaultValue={yearsExperience}
                                                         onChange={event => this.handleChange('yearsExperience', event.target.value)}
                                                         isEditing={this.state.editMode}/>}
                                    {userType === 'MANAGER'
                                    && <DynamicCardField id={id}
                                                         label={'Date of Hire'}
                                                         defaultValue={hiredOn}/>}
                                    {userType === 'COACH'
                                    && !isNaN(rating)
                                    && <DynamicCardField id={id}
                                                         label={'Rating'}
                                                         defaultValue={rating}/>}
                                </div>
                                <div className='card-footer'>
                                    {userType === 'COACH'
                                    && currentUser.userType === 'PLAYER'
                                    && <div className='form-group'>
                                        <label>
                                            Leave A Rating
                                        </label>
                                        <div className='btn-group w-100'>
                                            {[1, 2, 3, 4, 5].map(rating => <button key={rating}
                                                                                   className='btn btn-secondary w-100'
                                                                                   onClick={() => this.props.rateCoach(rating)}>
                                                {rating}
                                            </button>)}
                                        </div>
                                    </div>}
                                    {userType === 'PLAYER'
                                    && currentUser.userType === 'PLAYER'
                                    && currentUser._id !== id
                                    && <div className='form-group'>
                                        <label>
                                            Endorse This Player
                                        </label>
                                        <input className='form-control'
                                               checked={endorsedBy.some(endorserId => {
                                                   return endorserId === currentUser._id;
                                               })}
                                               type={'checkbox'}
                                               onChange={() => this.props.toggleEndorsement(currentUser)}/>
                                    </div>}
                                    {(
                                        currentUser.userType === 'ADMIN'
                                        || currentUser._id === id
                                    )
                                    && <Fragment>
                                        <button className='btn btn-secondary btn-block'
                                                onClick={this.updateUser}>
                                            {this.state.editMode ? 'Update' : 'Enter Edit Mode'}
                                        </button>
                                        <button className='btn btn-danger btn-block'
                                                onClick={this.props.deleteUser}>
                                            Delete
                                        </button>
                                    </Fragment>}
                                </div>
                            </div>
                        </div>
                    );
                }}
            </UserContext.Consumer>
        );
    };
};