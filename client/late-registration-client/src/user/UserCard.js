import React, {Component} from 'react';
import PropTypes from 'prop-types';
import UserContext from '../contexts/UserContext';
import DynamicCardField from '../shared/DynamicCardField';

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
            yearsExperience: '',
            hiredOn: '',
            editMode: false,
            showPlayerDetails: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.toggleEditMode = this.toggleEditMode.bind(this);
    }

    handleChange(input, value) {
        this.setState({[input]: value});
    }

    toggleEditMode() {
        this.setState(state => ({editMode: !state.editMode}));
    }

    render() {
        const {id, username, firstName, lastName, userType, teams, endoresements, rating, yearsExperience, hiredOn } = this.props;
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
                                    {yearsExperience && <DynamicCardField id={id}
                                                      label={'Years Experience'}
                                                      value={this.state.yearsExperience}
                                                      defaultValue={yearsExperience}
                                                      onChange={event => this.handleChange('yearsExperience', event.target.value)}
                                                      isEditing={this.state.editMode}/>}
                                    {hiredOn && <DynamicCardField id={id}
                                                      label={'Date of Hire'}
                                                      value={this.state.hiredOn}
                                                      defaultValue={hiredOn}
                                                      onChange={event => this.handleChange('hiredOn', event.target.value)}
                                                      isEditing={this.state.editMode}/>}
                                    {rating && <DynamicCardField id={id}
                                                      label={'Rating'}
                                                      defaultValue={rating}/>}
                                    {/*<div className='form-group mb-0'>*/}
                                        {/*<label>*/}
                                            {/*Players*/}
                                        {/*</label>*/}
                                        {/*{this.state.showPlayerDetails*/}
                                            {/*? <ul className='list-group'>*/}
                                                {/*{players.map(player => <li key={player._id}*/}
                                                                           {/*className='list-group-item'>*/}
                                                    {/*{player.firstName} {player.lastName}*/}
                                                {/*</li>)}*/}
                                            {/*</ul>*/}
                                            {/*: <h5>*/}
                                                {/*{players.length}*/}
                                            {/*</h5>}*/}
                                        {/*<button className='btn btn-secondary btn-block mt-3'*/}
                                                {/*onClick={this.togglePlayerDetails}>*/}
                                            {/*{this.state.showPlayerDetails ? 'Hide' : 'Show'} Player Details*/}
                                        {/*</button>*/}
                                    {/*</div>*/}
                                </div>
                                {
                                    currentUser.userType === 'ADMIN'
                                    || currentUser._id === id
                                        ? <div className='card-footer'>
                                            <button className='btn btn-secondary btn-block'
                                                    onClick={this.toggleEditMode}>
                                                {this.state.editMode ? 'Update' : 'Enter Edit Mode'}
                                            </button>
                                            <button className='btn btn-danger btn-block'>
                                                Delete
                                            </button>
                                        </div>
                                        : null
                                }
                            </div>
                        </div>
                    );
                }}
            </UserContext.Consumer>
        );
    };
};