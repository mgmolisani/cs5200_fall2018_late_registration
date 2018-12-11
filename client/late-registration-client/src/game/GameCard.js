import React, {Component} from 'react';
import DynamicCardField from '../shared/DynamicCardField';
import UserContext from '../contexts/UserContext';

export default class GameCard
    extends Component {

    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            gameType: '',
            start: '',
            location: '',
            isOver: null,
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

    displayWinner() {
        const {id} = this.props;
        const teams = [...this.props.teams];
        const winner = teams.sort((team1, team2) => team2.score - team1.score)[0];
        return <DynamicCardField id={id}
                                 label={'Winner'}
                                 defaultValue={winner.team.name}/>;
    }

    render() {
        const {id, gameType, start, location, isOver, manager, teams} = this.props;
        return (
            <UserContext.Consumer>
                {({currentUser}) => {
                    return (
                        <div className='col-md-6 col-lg-4 mb-4'>
                            <div className='card'>
                                <div className='card-body'>
                                    <DynamicCardField id={id}
                                                      label={'Game Type'}
                                                      value={this.state.gameType}
                                                      defaultValue={gameType}
                                                      onChange={event => this.handleChange('gameType', event.target.value)}
                                                      isEditing={this.state.editMode}/>
                                    <DynamicCardField id={id}
                                                      label={'Start Time'}
                                                      value={this.state.start}
                                                      defaultValue={start}
                                                      onChange={event => this.handleChange('start', event.target.value)}
                                                      isEditing={this.state.editMode}/>
                                    <DynamicCardField id={id}
                                                      label={'Location'}
                                                      value={this.state.location}
                                                      defaultValue={location}
                                                      onChange={event => this.handleChange('location', event.target.value)}
                                                      isEditing={this.state.editMode}/>
                                    <DynamicCardField id={id}
                                                      label={'Game Over?'}
                                                      checked={this.state.isOver !== null ? this.state.isOver : isOver}
                                                      type={'checkbox'}
                                                      onChange={event => this.handleChange('isOver', event.target.checked)}
                                                      isEditing={this.state.editMode}
                                                      hidden/>
                                    <DynamicCardField id={id}
                                                      label={'Manager'}
                                                      defaultValue={manager.firstName + ' ' + manager.lastName}/>
                                    {isOver
                                        ? this.displayWinner()
                                        : <div className='form-group'>
                                            Game is still in progress
                                        </div>}
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