import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import useFriendSlot from '../hooks/useFriendSlot';
import { useNavigationParam } from 'react-navigation-hooks';
import { getUserInfo } from './../hooks/sessionContext';
import RecordPlayer from '../components/RecordPlayer';
import RecordGame from '../components/RecordGame';
import RecordTime from '../components/RecordTime';
import RecordDuration from '../components/RecordDuration';
import useScore from '../hooks/useScore';
import { api } from './../api';
import { useNavigation } from 'react-navigation-hooks';

export default function CreatePlayScreen() {
  const userFriends = useNavigationParam('userFriends');
  const userGames = useNavigationParam('userGames');
  const { navigate } = useNavigation();
  const { friendSlots, changeFriendSlot } = useFriendSlot();
  const { userData } = getUserInfo();
  const { avatar, id, name } = userData;
  const { scoreList, addScoreList, updateScoreList, deleteScoreList, isWinner, getWinners } = useScore(id);
  const [gameRecord, setGameRecord] = useState([]);
  const [date, setDate] = useState(new Date());
  const [duration, setDuration] = useState('');

  const changeDuration = (newDuration) => {
    (/^\d+$/.test(newDuration) || !newDuration) && setDuration(newDuration);
  }

  const createScoreAction = () => {
    console.log('date:', date);
    console.log('scoreList:', scoreList);
    console.log('gameRecord:', gameRecord);
    console.log('duration:', duration);
    console.log('winnerList:', getWinners());
    const newPlay = {
      date,
      duration: "05:10:00",
      game_id: gameRecord[0],
      playUsers: scoreList.map(scoreObj => {
        return {
          score: scoreObj.score,
          user_id: scoreObj.id,
          is_winner: getWinners().includes(scoreObj.id)
        }
      })
    }
    api.post(`/plays/`, {
      "date": "2019-09-11T00:00:00.000Z",
      "duration": "05:10:00",
      "game_id": 4,
      "event_id": null,
      "playsUsers": [{
        "score": 56,
        "is_winner": false,
        "user_id": 1
      }]
    })
      .then(() => navigate('Plays'))
  }

  return (
    <>
      <ScrollView>
        <RecordTime
          date={date}
          setDate={setDate}
        />
        <RecordDuration
          duration={duration}
          changeDuration={changeDuration}
        />
        <RecordGame
          userGames={userGames}
          setGameRecord={setGameRecord}
        />
        <RecordPlayer
          userFriends={userFriends}
          friendSlots={friendSlots}
          changeFriendSlot={changeFriendSlot}
          creator={{ avatar, id, name }}
          addScoreList={addScoreList}
          updateScoreList={updateScoreList}
          deleteScoreList={deleteScoreList}
          isWinner={isWinner}
        />
      </ScrollView>
      <Button
        title={'Create Score!'}
        icon={
          <Icon
            name='check-circle'
            type='font-awesome'
            color='white'
          />
        }
        onPress={createScoreAction}
      />
    </>
  )
}

