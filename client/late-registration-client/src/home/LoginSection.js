import React from 'react';
import CardSection from '../shared/CardSection';
import UserContext from '../contexts/UserContext';
import LoginCard from './LoginCard';

const LoginSection = props => {
    return (
        <UserContext.Consumer>
            {({currentUser, setCurrentUser}) => {
                return (
                    <CardSection title={props.title}>
                        {props.users.map(user => <LoginCard key={user._id}
                                                            id={user._id}
                                                            username={user.username}
                                                            currentUser={currentUser}
                                                            setCurrentUser={() => setCurrentUser(user)}/>
                        )}
                    </CardSection>
                );
            }}
        </UserContext.Consumer>
    );
};

LoginSection.propTypes = {};

LoginSection.defaultProps = {};

export default LoginSection;