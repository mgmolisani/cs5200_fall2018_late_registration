import React, {Component} from 'react';
import DynamicCardField from '../shared/DynamicCardField';
import UserContext from '../contexts/UserContext';

export default class TeamCard
    extends Component {

    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            logo: '',
            mascot: '',
            hometown: '',
            editMode: false,
            showPlayerDetails: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.toggleEditMode = this.toggleEditMode.bind(this);
        this.togglePlayerDetails = this.togglePlayerDetails.bind(this);
    }

    handleChange(input, value) {
        this.setState({[input]: value});
    }

    toggleEditMode() {
        this.setState(state => ({editMode: !state.editMode}));
    }

    togglePlayerDetails() {
        this.setState(state => ({showPlayerDetails: !state.showPlayerDetails}));
    }

    render() {
        const {id, name, logo, mascot, hometown, coach, players} = this.props;
        return (
            <UserContext.Consumer>
                {({currentUser}) => {
                    return (
                        <div className='col-md-6 col-lg-4 mb-4'>
                            <div className='card'>
                                <img className='card-img-top'
                                     src={logo}
                                     alt={name}/>
                                <div className='card-body'>
                                    <DynamicCardField id={id}
                                                      label={'Team Name'}
                                                      value={this.state.name}
                                                      defaultValue={name}
                                                      onChange={event => this.handleChange('name', event.target.value)}
                                                      isEditing={this.state.editMode}/>
                                    <DynamicCardField id={id}
                                                      label={'Logo'}
                                                      value={this.state.logo}
                                                      defaultValue={logo}
                                                      onChange={event => this.handleChange('logo', event.target.value)}
                                                      isEditing={this.state.editMode}
                                                      hidden/>
                                    <DynamicCardField id={id}
                                                      label={'Mascot'}
                                                      value={this.state.mascot}
                                                      defaultValue={mascot}
                                                      onChange={event => this.handleChange('mascot', event.target.value)}
                                                      isEditing={this.state.editMode}/>
                                    <DynamicCardField id={id}
                                                      label={'Hometown'}
                                                      value={this.state.hometown}
                                                      defaultValue={hometown}
                                                      onChange={event => this.handleChange('hometown', event.target.value)}
                                                      isEditing={this.state.editMode}/>
                                    <DynamicCardField id={id}
                                                      label={'Coach'}
                                                      defaultValue={coach.firstName + ' ' + coach.lastName}/>
                                    <div className='form-group mb-0'>
                                        <label>
                                            Players
                                        </label>
                                        {this.state.showPlayerDetails
                                            ? <ul className='list-group'>
                                                {players.map(player => <li key={player._id}
                                                                           className='list-group-item'>
                                                    {player.firstName} {player.lastName}
                                                </li>)}
                                            </ul>
                                            : <h5>
                                                {players.length}
                                            </h5>}
                                        <button className='btn btn-secondary btn-block mt-3'
                                                onClick={this.togglePlayerDetails}>
                                            {this.state.showPlayerDetails ? 'Hide' : 'Show'} Player Details
                                        </button>
                                    </div>
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