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
                                               logo={'https://images-platform.99static.com/BYBl73kycvZMCvyWN6v7Ssm4c_U=/420x0:1502x1082/fit-in/900x675/99designs-contests-attachments/80/80458/attachment_80458293'}
                                               mascot={team.mascot}
                                               hometown={team.hometown}
                                               coach={team.coach}
                                               players={team.players}
                                               posts={team.posts}
                                               updateTeam={(update) => props.updateTeam(team._id, update)}
                                               deleteTeam={() => props.updateTeam(team._id)}/>
            )}
        </CardSection>
    );
};

TeamSection.propTypes = {};

TeamSection.defaultProps = {};

export default TeamSection;