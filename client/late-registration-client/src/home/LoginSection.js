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
                        {props.users.map((user, index) => <LoginCard key={index}
                                                                     username={user.username}
                                                                     password={user.password}
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