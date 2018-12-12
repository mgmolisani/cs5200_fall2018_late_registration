import React, {Component, Fragment} from 'react';
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
            team: '',
            editMode: false,
            showPlayerDetails: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.updateGame = this.updateGame.bind(this);
        this.addTeam = this.addTeam.bind(this);
    }

    handleChange(input, value) {
        this.setState({[input]: value});
    }

    updateGame() {
        if (this.state.editMode) {
            this.props.updateGame({
                ...this.props.game,
                start: this.state.start || this.props.start,
                location: this.state.location || this.props.location,
                gameType: this.state.gameType || this.props.gameType
            });
        }
        this.setState(state => ({editMode: !state.editMode}));
    }

    addTeam() {
        this.props.addTeamToGameByTeamName(this.state.team);
        this.setState({team: ''});
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
                                                      checked={this.props.isOver}
                                                      type={'checkbox'}
                                                      onChange={teams.length > 0
                                                          ? this.props.endGame
                                                          : () => alert('Cannot end a game with no teams.')}
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
                                    <div className='form-group mb-0'>
                                        <label>
                                            Scoreboard
                                        </label>
                                        <ul className='list-group'>
                                            {teams.map(team => <li key={team.team._id}
                                                                   className='list-group-item'>
                                                <div className='row justify-content-between align-items-center'>
                                                    <div className='col'>
                                                        {team.team.name}
                                                    </div>
                                                    <div
                                                        className='row justify-content-end align-items-center col-auto'>
                                                        <div className='col-auto text-nowrap'>
                                                            {team.score}
                                                        </div>
                                                        {
                                                            (
                                                                currentUser._id === manager._id
                                                                || currentUser.userType === 'ADMIN'
                                                            )
                                                            && <div className='btn-group-vertical col-auto'>
                                                                <button className='btn btn-success'
                                                                        onClick={() => this.props.updateScore(team.team._id, team.score + 1)}>
                                                                    +
                                                                </button>
                                                                <button className='btn btn-danger'
                                                                        onClick={() => this.props.updateScore(team.team._id, team.score - 1)}>
                                                                    -
                                                                </button>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            </li>)}
                                        </ul>
                                    </div>
                                </div>
                                <div className='card-footer'>
                                    {
                                        (
                                            currentUser._id === manager._id
                                            || currentUser.userType === 'ADMIN'
                                        )
                                        && <Fragment>
                                            <div className='form-group'>
                                                <label htmlFor={'team'}>
                                                    Team To Add
                                                </label>
                                                <input className='form-control'
                                                       id={'team'}
                                                       type={'text'}
                                                       value={this.state.team}
                                                       onChange={event => this.handleChange('team', event.target.value)}/>
                                            </div>
                                            <button className='btn btn-dark btn-block'
                                                    onClick={this.addTeam}>
                                                Add Team
                                            </button>
                                        </Fragment>
                                    }
                                    {
                                        currentUser.userType === 'ADMIN'
                                        || currentUser._id === manager._id
                                            ? <Fragment>
                                                <button className='btn btn-secondary btn-block'
                                                        onClick={this.updateGame}>
                                                    {this.state.editMode ? 'Update' : 'Enter Edit Mode'}
                                                </button>
                                                <button className='btn btn-danger btn-block'
                                                        onClick={this.props.deleteGame}>
                                                    Delete
                                                </button>
                                            </Fragment>
                                            : null
                                    }
                                </div>
                            </div>
                        </div>
                    );
                }}
            </UserContext.Consumer>
        );
    };
};