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

export default function CreatePlayScreen() {
  const userFriends = useNavigationParam('userFriends');
  const userGames = useNavigationParam('userGames');
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

