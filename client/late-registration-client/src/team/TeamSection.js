import React from 'react';
import CardSection from '../shared/CardSection';
import TeamCard from './TeamCard';

const TeamSection = props => {
    return (
        <CardSection title={props.title}>
            {props.teams.map(team => <TeamCard key={team._id}
                                               id={team._id}
                                               team={team}
                                               name={team.name}
                                               logo={team.logo}
                                               mascot={team.mascot}
                                               hometown={team.hometown}
                                               coach={team.coach}
                                               players={team.players}
                                               posts={team.posts}
                                               updateTeam={(update) => props.updateTeam(team._id, update)}
                                               deleteTeam={() => props.updateTeam(team._id)}
                                               addPlayerToTeam={(userId) => props.addPlayerToTeam(team._id, userId)}
                                               removePlayerFromTeam={(userId) => props.removePlayerFromTeam(team._id, userId)}/>
            )}
        </CardSection>
    );
};

TeamSection.propTypes = {};

TeamSection.defaultProps = {};

export default TeamSection;