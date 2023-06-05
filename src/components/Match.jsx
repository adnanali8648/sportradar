import React from 'react'

const Match = ({ id, homeTeam, awayTeam, homeScore, awayScore, updateMatch, finishMatch }) => {
    return (
        <div name="Match" className={`${!updateMatch ? "bg-white text-black" : "bg-blue-500 text-white"} w-full shadow-lg shadow-blue-500/50 rounded-sm `}>
            <div className='flex justify-between content-center items-center px-5 py-5'>
                <div className='font-bold'>{homeTeam}</div>
                <div className='flex '>
                    <span className='score'>{homeScore}-{awayScore}</span>
                </div>
                <div className='font-bold'>{awayTeam}</div>
                {updateMatch && <div className='flex items-center'>
                    <button role="button" className='px-3 py-2 hover:text-green-500' name="Edit" onClick={() => updateMatch(id, homeScore, awayScore)} >Update Score</button>|
                    <button role="button" className='px-3 py-2  hover:text-red-500' name="Finish" onClick={() => finishMatch(id)}>Finish Match</button>
                </div>}

            </div>
        </div>
    )
}

export default Match
