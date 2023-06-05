import React, { useState } from 'react'
import Match from './Match'
import Summary from './Summary'

const matchesList = [{
    id: 1,
    homeTeam: "Mexico",
    awayTeam: "Canada"
},
{
    id: 2,
    homeTeam: "Spain",
    awayTeam: "Brazil"
},
{
    id: 3,
    homeTeam: "Germany",
    awayTeam: "France"
},
{
    id: 4,
    homeTeam: "Uruguay",
    awayTeam: "Italy"
},
{
    id: 5,
    homeTeam: "Argentina",
    awayTeam: "Australia"
}

]


const Scoreboard = () => {
    const [matches, setMatches] = useState([])
    const startMatch = (id, homeTeam, awayTeam) => {

        if (matches.some(item => id === item.id)) {
            return false
        } else {
            const newMatch = {
                id,
                homeTeam,
                awayTeam,
                homeScore: 0,
                awayScore: 0,
            }
            setMatches([...matches, newMatch])
        }

    }

    const updateMatch = (id, homeScore, awayScore) => {
        const updateMatches = matches.map(((match, i) => {
            if (id === match.id) {
                return {
                    ...match, homeScore: homeScore + 1, awayScore: awayScore + 1
                }
            } else return match
        }))
        setMatches(updateMatches)
    }
    const finishMatch = (id) => {
        const filterMatch = matches.filter(match => id !== match.id)
        setMatches(filterMatch)
    }
    return (
        <div className='w-4/5 m-auto flex flex-col items-center mt-11 gap-16'>
            <div className='font-bold text-3xl'>Start Match</div>
            <div className='flex flex-row gap-2 justify-center items-center'>
                {matchesList && matchesList?.map((match, index) => (
                    <button key={index} className='px-3 py-2 shadow-sm shadow-blue-500/50 rounded-sm' onClick={() => startMatch(match.id, match.homeTeam, match.awayTeam)}> Match {index + 1} </button>
                ))}
            </div>


            <div className='w-full flex justify-between gap-10'>
                <div className='flex w-full flex-col justify-start gap-2'>
                    <div>Live Scores</div>
                    {matches && matches?.map((match, index) => (
                        <Match key={index}  {...match} updateMatch={updateMatch} finishMatch={finishMatch} />
                    ))}
                    {!matches.length && <div>no live mach yet</div>}
                </div>
                <div className='flex w-full flex-col justify-start'>
                    <div>Summary</div>
                    {matches && <Summary matches={matches} />}
                    {!matches.length && <div> No Summary Found</div>}
                </div>
            </div>

        </div >


    )
}

export default Scoreboard
