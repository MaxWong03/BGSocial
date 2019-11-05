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
import useDuration from '../hooks/useDuration';
import { formatDuration } from '../utils/formatDuration';

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
  const { hour, minute, second, changeHour, changeMinute, changeSecond } = useDuration();

  const createScoreAction = () => {
    const duration = formatDuration(hour, minute, second);
    const newPlay = {
      "date": date,
      "duration": duration,
      "game_id": Number(gameRecord[0]),
      "event_id": null,
      "playsUsers": scoreList.map(scoreObj => {
        return {
          "score": Number(scoreObj.score),
          "is_winner": getWinners().includes(scoreObj.id),
          "user_id": Number(scoreObj.id)
        }
      })
    }

    api.post(`/plays/`, newPlay)
      .then(() => navigate('Plays'))
      .catch(err => console.log(err));
  }

  return (
    <>
      <ScrollView>
        <RecordTime
          date={date}
          setDate={setDate}
        />
        <RecordDuration
          hour={hour}
          minute={minute}
          second={second}
          changeHour={changeHour}
          changeMinute={changeMinute}
          changeSecond={changeSecond}
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

