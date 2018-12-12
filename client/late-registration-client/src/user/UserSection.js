import React from 'react';
import CardSection from '../shared/CardSection';
import UserCard from './UserCard';

const UserSection = props => {
    return (
        <CardSection title={props.title}>
            {props.users.map(user => <UserCard key={user._id}
                                               id={user._id}
                                               user={user}
                                               userType={user.userType}
                                               username={user.username}
                                               firstName={user.firstName}
                                               lastName={user.lastName}
                                               password={user.password}
                                               teams={user.userType === 'COACH' || user.userType === 'PLAYER' ? user.teams : null}
                                               endorsedBy={user.userType === 'PLAYER' ? user.endorsedBy : null}
                                               yearsExperience={user.userType === 'COACH' ? user.yearsExperience.toString() : null}
                                               rating={user.userType === 'COACH' ? Math.round(user.ratings.reduce((value, acc) => value + acc, 0) / user.ratings.length * 100) / 100 : null}
                                               hiredOn={user.userType === 'MANAGER' ? user.hiredOn : null}
                                               updateUser={(update) => props.updateUser(user._id, update)}
                                               deleteUser={() => props.deleteUser(user._id)}
                />
            )}
        </CardSection>
    );
};

UserSection.propTypes = {};

UserSection.defaultProps = {};

export default UserSection;