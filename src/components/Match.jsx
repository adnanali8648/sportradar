import React from "react";

const Match = ({
    id,
    homeTeam,
    awayTeam,
    goalHistory,
    updateMatch,
    finishMatch,
}) => {
    return (
        <div
            name="Match"
            className="bg-blue-500 text-white w-full shadow-lg shadow-blue-500/50 rounded-sm"
        >
            {
                <div className="flex justify-end items-center">
                    <button
                        className="px-3 py-2 hover:text-green-500"
                        name="Edit"
                        onClick={() => updateMatch(id)}
                    >
                        Update{" "}
                    </button>
                    |
                    <button
                        className="px-3 py-2  hover:text-red-500"
                        name="Finish"
                        onClick={() => finishMatch(id)}
                    >
                        Finish Match
                    </button>
                </div>
            }
            {goalHistory?.length > 0 &&
                goalHistory?.map((item, i) => (
                    <div key={i} className="flex flex-col gap-2 ">
                        {i !== 0 && (
                            <div className="items-start ">
                                goal scored by{" "}
                                <span className="font-bold text-green-400">{item.player} </span>
                                at {item.dateTime && item.dateTime} minutes
                            </div>
                        )}
                        <div className="flex justify-center gap-10 content-center items-center px-5 py-5">
                            <div className="font-bold">{homeTeam}</div>
                            <div className="flex ">
                                <span className="score">
                                    {item?.homeScore}-{item?.awayScore}
                                </span>
                            </div>
                            <div className="font-bold">{awayTeam}</div>
                        </div>
                        {item.card && (
                            <p>{`${item.card} card to ${item.player}  at ${item.dateTime && item.dateTime
                                }`}</p>
                        )}
                        <hr />
                    </div>
                ))}
        </div>
    );
};

export default Match;
