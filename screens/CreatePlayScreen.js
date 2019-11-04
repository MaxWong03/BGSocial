import React, { useState } from 'react';
import { Button, Icon } from 'react-native-elements';
import useFriendSlot from '../hooks/useFriendSlot';
import { useNavigationParam } from 'react-navigation-hooks';
import { getUserInfo } from './../hooks/sessionContext';
import RecordPlayer from '../components/RecordPlayer';
import RecordGame from '../components/RecordGame';
import RecordTime from '../components/RecordTime';
import useScore from '../hooks/useScore';


export default function CreatePlayScreen() {
  const userFriends = useNavigationParam('userFriends');
  const userGames = useNavigationParam('userGames');
  const { friendSlots, changeFriendSlot } = useFriendSlot();
  const { userData } = getUserInfo();
  const { avatar, id, name } = userData;
  const { scoreList, addScoreList, updateScoreList, deleteScoreList, isWinner, getWinners } = useScore(id);
  const [gameRecord, setGameRecord] = useState([]);
  const [recordDate, setRecordTime] = useState(new Date());

  const createScoreAction = () => {
    console.log('timeSlots:', timeSlots);
    console.log('scoreList:', scoreList);
    console.log('gameRecord:', gameRecord);
    console.log('winnerList:', getWinners());

  }

  return (
    <>
      <RecordTime 
        recordDate={recordDate}
        setRecordTime={setRecordTime}
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

