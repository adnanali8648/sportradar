import React, { useState } from 'react'
import { diff_minutes, getRandomInt } from '../utils'
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

const footballPlayers = [
    "Lionel Messi",
    "Cristiano Ronaldo",
    "Neymar Jr.",
    "Kylian Mbappe",
    "Mohamed Salah",
    "Robert Lewandowski",
    "Kevin De Bruyne",
    "Sergio Ramos",
    "Virgil van Dijk",
    "Luka Modric",
    "Sadio Mane",
    "Harry Kane"
];

const cards = ['Yellow', 'Red']


const Scoreboard = () => {
    const [matches, setMatches] = useState([])


    // function to update the team record
    const updateTeamRecord = (match) => {
        let randomPlayer = footballPlayers[getRandomInt(footballPlayers.length - 1)]
        let cardType = getRandomInt(6)
        let cardIssued = cardType <= 1 ? cards[cardType] : null
        return {
            ...match, goalHistory: [
                ...match.goalHistory,
                {
                    homeScore: match.currentHomeTeamScore,
                    awayScore: match.currentAwayTeamScore,
                    player: randomPlayer,
                    dateTime: diff_minutes(match.goalHistory[0].dateTime, new Date().getTime()),
                    card: cardIssued
                }]
        }
    }

    // function to start the match
    const startMatch = (id, homeTeam, awayTeam) => {

        if (matches.some(item => id === item.id)) {
            return false
        } else {
            const newMatch = {
                id,
                homeTeam,
                awayTeam,
                currentHomeTeamScore: 0,
                currentAwayTeamScore: 0,
                goalHistory: [{ homeScore: 0, awayScore: 0, card: null, dateTime: new Date().getTime() }],
                cards: []
            }
            setMatches([...matches, newMatch])
        }
    }

    // on update function to change score and record on the bases of random team
    const updateMatch = (id) => {
        let team = getRandomInt(2)
        let updateMatches = []
        if (team === 0) {
            updateMatches = matches.map(((match) => {

                if (id === match.id) {
                    match.currentHomeTeamScore += 1
                    return updateTeamRecord(match)
                } else return match
            }))
        }

        else if (team === 1) {
            updateMatches = matches.map(((match) => {
                if (id === match.id) {
                    match.currentAwayTeamScore += 1
                    return updateTeamRecord(match)
                } else return match
            }))
        }
        setMatches(updateMatches)
    }



    // function to finish the match
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
                <div className='flex w-full flex-col justify-start gap-10'>
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
