import React from 'react';
import CardSection from '../shared/CardSection';
import GameCard from './GameCard';

const GameSection = props => {
    return (
        <CardSection title={props.title}>
            {props.games.map(game => <GameCard key={game._id}
                                               id={game._id}
                                               game={game}
                                               gameType={game.gameType}
                                               start={game.start}
                                               location={game.location}
                                               isOver={game.isOver}
                                               manager={game.manager}
                                               teams={game.teams}
                                               updateGame={(update) => props.updateGame(game._id, update)}
                                               deleteGame={() => props.deleteGame(game._id)}
                                               addTeamToGameByTeamName={teamName => props.addTeamToGameByTeamName(game._id, teamName)}
                                               removeTeamFromGame={teamId => props.removeTeamFromGame(game._id, teamId)}
                                               updateScore={(teamId, score) => props.updateScore(game._id, teamId, score)}
                                               endGame={() => props.endGame(game._id)}/>
            )}
        </CardSection>
    );
};

GameSection.propTypes = {};

GameSection.defaultProps = {};

export default GameSection;