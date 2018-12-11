import React from 'react';
import PropTypes from 'prop-types';
import TeamCard from '../team/TeamCard';
import CardSection from '../shared/CardSection';
import GameCard from './GameCard';

const GameSection = props => {
    return (
        <CardSection title={props.title}>
            {props.games.map(game => <GameCard key={game._id}
                                               id={game._id}
                                               gameType={game.gameType}
                                               start={game.start}
                                               location={game.location}
                                               isOver={game.isOver}
                                               manager={game.manager}
                                               teams={game.teams}/>
            )}
        </CardSection>
    );
};

GameSection.propTypes = {};

GameSection.defaultProps = {};

export default GameSection;