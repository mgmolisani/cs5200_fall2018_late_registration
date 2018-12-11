import React, {Component, Fragment} from 'react';
import UserSection from '../user/UserSection';

export default class User
    extends Component {

    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            players: [],
            coaches: [],
            managers: [],
            administrators: [],
            allUsers: []
        };
    }

    componentDidMount() {
        const players = [
            {
                _id: 1,
                username: 'mm',
                firstName: 'Mike',
                lastName: 'Molisani',
                userType: 'PLAYER',
                endorsedBy: [
                    {
                        _id: 4,
                        username: 'mm',
                        firstName: 'Mgm',
                        lastName: 'Molisani',
                        userType: 'PLAYER'
                    }
                ],
                teams: []
            }
        ];
        const coaches = [
            {
                _id: 2,
                username: 'mgm',
                firstName: 'Mike',
                lastName: 'Molisani',
                userType: 'COACH',
                ratings: [1,2,3,4,5,5,5,5,5,5,4,5,4,3,2,3,4,5],
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
            players: players,
            coaches: coaches,
            managers: managers,
            administrators: administrators,
            allUsers: [...players, ...coaches, ...managers, ...administrators]
        });
    }

    render() {
        return (
            <Fragment>
                <UserSection title={'Players'}
                             users={this.state.players}/>
                <UserSection title={'Coaches'}
                             users={this.state.coaches}/>
                <UserSection title={'Managers'}
                             users={this.state.managers}/>
                <UserSection title={'Administrators'}
                             users={this.state.administrators}/>
                <UserSection title={'All Users'}
                             users={this.state.allUsers}/>
            </Fragment>
        );
    }
}