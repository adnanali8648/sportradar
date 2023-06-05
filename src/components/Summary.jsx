import React from 'react'
import Match from './Match';

const Summary = ({ matches }) => {
    const updateMaches = [...matches]
    const sortedMatches = updateMaches?.sort((a, b) => {
        const totalScoreA = a.homeScore + a.awayScore;
        const totalScoreB = b.homeScore + b.awayScore;
        if (totalScoreA === totalScoreB) {
            // If total score is the same, sort by the most recently started match
            return updateMaches.indexOf(b) - updateMaches.indexOf(a);
        }
        return totalScoreB - totalScoreA;
    });

    return sortedMatches?.map((match) => (
        <Match key={match.id}  {...match} />

    ));
};

export default Summary