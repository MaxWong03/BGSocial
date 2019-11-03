import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import useFriendSlot from '../hooks/useFriendSlot';
import { useNavigationParam } from 'react-navigation-hooks';
import { getUserInfo } from './../hooks/sessionContext';
import RecordPlayer from '../components/RecordPlayer';
import { ListItem } from 'react-native-elements';

export default function CreatePlayScreen() {
  const userFriends = useNavigationParam('userFriends');
  const { friendSlots, changeFriendSlot } = useFriendSlot();
  const { userData } = getUserInfo();
  const { avatar, id, name } = userData;
  const [score, setScore] = useState(0);
  const onChangeScore = (newScore) => {
    setScore(Math.round(newScore * 100));
  }

  userFriends.unshift({ avatar, id, name })
  console.log(friendSlots);
  return (
    <>
      <RecordPlayer
        userFriends={userFriends}
        friendSlots={friendSlots}
        changeFriendSlot={changeFriendSlot}
      />
      <ScrollView>
        {
          userFriends.map((friend, index) => (
            friendSlots.includes(friend.id) &&
            <ListItem
              key={index}
              title={friend.name}
            />
          ))
        }
      </ScrollView>
    </>
  )
}

