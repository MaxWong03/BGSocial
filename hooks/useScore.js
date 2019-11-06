import React, {useState} from 'react';

export default function useScore(id) {
  const [scoreList, setScoreList] = useState([{ id, score: 0 }])

  const addScoreList = (id) => {
    if (!scoreList.find(playerScore => playerScore.id === id)) {// if i cant find the player 
      setScoreList(prev => {
        return [...prev, { id, score: 0 }]
      })
    }
  }

  const updateScoreList = (id, newScore) => {
    const newList = scoreList.map(player => {
      if (player.id === id) return { ...player, score: newScore }
      else return player;
    });
    setScoreList(newList);
  }

  const deleteScoreList = (id) => {
    const newList = scoreList.filter(player => player.id !== id);
    setScoreList(newList);
  }

  const isWinner = (score) => {
    const scoreOnly = scoreList.map(scoreObj => scoreObj.score);
    const maxScore = Math.max(...scoreOnly);
    return score === maxScore;
  }

  const getWinners = () => {
    const winnerIDs = [];
    scoreList.forEach(scoreObj => isWinner(scoreObj.score) && winnerIDs.push(scoreObj.id))
    return winnerIDs;
  }

  return {
    scoreList,
    addScoreList,
    updateScoreList,
    deleteScoreList,
    isWinner,
    getWinners
  }
}