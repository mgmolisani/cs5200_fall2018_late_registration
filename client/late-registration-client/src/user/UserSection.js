import React from 'react';
import CardSection from '../shared/CardSection';
import UserCard from './UserCard';

const UserSection = props => {
    return (
        <CardSection title={props.title}>
            {props.users.map(user => <UserCard key={user._id}
                                               id={user._id}
                                               userType={user.userType}
                                               username={user.username}
                                               firstName={user.firstName}
                                               lastName={user.lastName}
                                               teams={user.userType === 'COACH' || user.userType === 'PLAYER' ? user.teams : null}
                                               endorsements={user.userType === 'PLAYER' ? user.endorsedBy : null}
                                               yearsExperience={user.userType === 'COACH' ? user.yearsExperience : null}
                                               rating={user.userType === 'COACH' ? Math.round(user.ratings.reduce((value, acc) => value + acc, 0) / user.ratings.length * 100) / 100 : null}
                                               hiredOn={user.userType === 'MANAGER' ? user.hiredOn : null}
                />
            )}
        </CardSection>
    );
};

UserSection.propTypes = {};

UserSection.defaultProps = {};

export default UserSection;