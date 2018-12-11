import React, {Component, Fragment} from 'react';
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
        this.endorsePlayer = this.endorsePlayer.bind(this);
        this.rateCoach = this.rateCoach.bind(this);
    }

    handleChange(input, value) {
        this.setState({[input]: value});
    }

    toggleEditMode() {
        this.setState(state => ({editMode: !state.editMode}));
    }

    endorsePlayer(endorseeId, endorserId) {
        //TODO
        console.log(endorseeId + ' ' + endorserId);
    }

    rateCoach(coachId, rating) {
        //TODO
        console.log(coachId + ' ' + rating);
    }

    render() {
        console.log(this.props);
        const {id, username, firstName, lastName, userType, teams, endorsedBy, rating, yearsExperience, hiredOn} = this.props;
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
                                                         value={this.state.hiredOn}
                                                         defaultValue={hiredOn}
                                                         onChange={event => this.handleChange('hiredOn', event.target.value)}
                                                         isEditing={this.state.editMode}/>}
                                    {userType === 'COACH'
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
                                                                                   onClick={() => this.rateCoach(id, rating)}>
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
                                               onChange={() => this.endorsePlayer(id, currentUser._id)}/>
                                    </div>}
                                    {(
                                        currentUser.userType === 'ADMIN'
                                        && currentUser._id !== id
                                    )
                                    && <Fragment>
                                        <button className='btn btn-secondary btn-block'
                                                onClick={this.toggleEditMode}>
                                            {this.state.editMode ? 'Update' : 'Enter Edit Mode'}
                                        </button>
                                        <button className='btn btn-danger btn-block'>
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