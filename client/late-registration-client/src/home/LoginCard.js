import React, {Component} from 'react';

export default class LoginCard
    extends Component {

    static propTypes = {};

    static defaultProps = {};

    render() {
        const {username, password, setCurrentUser} = this.props;
        return (
            <div className='col-md-6 col-lg-4 mb-4 text-center'>
                <div className='card'
                     onClick={setCurrentUser}>
                    <div className='card-body'>
                        <h3>
                            Username: {username}
                        </h3>
                        <h5>
                            Password: {password}
                        </h5>
                    </div>
                </div>
            </div>
        );
    };
};