import React from "react";

const Summary = ({ matches }) => {
    const updateMaches = [...matches];
    const sortedMatches = updateMaches?.sort((a, b) => {
        const totalScoreA = a.currentHomeTeamScore + a.currentAwayTeamScore;
        const totalScoreB = b.currentHomeTeamScore + b.currentAwayTeamScore;
        if (totalScoreA === totalScoreB) {
            return updateMaches.indexOf(b) - updateMaches.indexOf(a);
        }
        return totalScoreB - totalScoreA;
    });

    return sortedMatches?.map((match) => (
        <div
            data-testid="mock-match"
            key={match.id}
            className="flex justify-center gap-10 content-center items-center px-5 py-5"
        >
            <div className="font-bold">{match.homeTeam}</div>
            <div className="flex ">
                <span className="score">
                    {match.currentHomeTeamScore}-{match.currentAwayTeamScore}
                </span>
            </div>
            <div className="font-bold">{match.awayTeam}</div>
        </div>
    ));
};

export default Summary;
