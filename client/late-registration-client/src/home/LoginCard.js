import React, {Component} from 'react';

export default class LoginCard
    extends Component {

    static propTypes = {};

    static defaultProps = {};

    render() {
        const {id, username, currentUser, setCurrentUser} = this.props;
        return (
            <div className='col-md-6 col-lg-4 mb-4 text-center'>
                <div className={`card ${currentUser._id === id ? 'bg-secondary text-white' : ''}`}
                     onClick={setCurrentUser}>
                    <div className='card-body'>
                        <h3>
                            {username}
                        </h3>
                    </div>
                </div>
            </div>
        );
    };
};