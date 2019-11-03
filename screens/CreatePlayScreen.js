import React, { useState } from 'react';
import { Button, Icon } from 'react-native-elements';
import useFriendSlot from '../hooks/useFriendSlot';
import { useNavigationParam } from 'react-navigation-hooks';
import { getUserInfo } from './../hooks/sessionContext';
import RecordPlayer from '../components/RecordPlayer';
import RecordGame from '../components/RecordGame';

export default function CreatePlayScreen() {
  const userFriends = useNavigationParam('userFriends');
  const { friendSlots, changeFriendSlot } = useFriendSlot();
  const { userData } = getUserInfo();
  const { avatar, id, name } = userData;
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

  const createScoreAction = () => {
    console.log('scoreList:', scoreList);
  }

  return (
    <>
      <RecordGame /
      
      >
      <RecordPlayer
        userFriends={userFriends}
        friendSlots={friendSlots}
        changeFriendSlot={changeFriendSlot}
        creator={{ avatar, id, name }}
        addScoreList={addScoreList}
        updateScoreList={updateScoreList}
        deleteScoreList={deleteScoreList}
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

