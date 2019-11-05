import React from 'react';
import { ScrollView } from 'react-native';
import { Overlay, Button, Icon } from 'react-native-elements';
import useVisibility from '../hooks/useVisibility';
import PlayerModal from '../components/PlayerModal'
import useList from '../hooks/useList';
import RecordListItem from '../components/RecordListItem';

export default function RecordPlayer({ userFriends, recordFriendList, changeFriendSlot, creator, addScoreList, updateScoreList, deleteScoreList, isWinner }) {

  userFriends = userFriends.map(friend => {
    return { ...friend, 'selected': false }
  })

  if (recordFriendList) {
    userFriends = userFriends.map(friend => {
      if (recordFriendList.includes(friend.id)) return { ...friend, 'selected': true }
      else return friend;
    })
  }

  const { visible, showModal, closeModal } = useVisibility(false);
  const { list: friendSelectList, onSelectRecord: onSelect } = useList(userFriends);

  const filterSelectedFriends = () => {
    return friendSelectList.filter((friend) => friend['selected'])
  };

  const selectedFriends = filterSelectedFriends();

  const deleteRecordFriend = (friendID) => {
    const friendList = onSelect(friendID)
      .filter(friend => friend['selected'])
      .map(friend => friend['id']);

    changeFriendSlot(friendList);
    deleteScoreList(friendID);
  }

  return (
    <>
      <Button
        title={'Create Player Score'}
        onPress={showModal}
        icon={
          <Icon
            name='group-add'
            type='material-icons'
            color='white'
          />
        }
      />
      <Overlay
        isVisible={visible}
        children={
          <PlayerModal
            closeModal={closeModal}
            userFriends={userFriends}
            changeFriendSlot={changeFriendSlot}
            friendSelectList={friendSelectList}
            onSelect={onSelect}
            addScoreList={addScoreList}
            deleteScoreList={deleteScoreList}
          />
        }
      />
      {
        <RecordListItem
          id={creator.id}
          title={creator.name}
          leftAvatar={{ uri: creator.avatar }}
          canDelete={false}
          updateScoreList={updateScoreList}
          isWinner={isWinner}
        />
      }
      {
        selectedFriends.map((friend) => (
          <RecordListItem
            key={friend.id}
            id={friend.id}
            title={friend.name}
            leftAvatar={{ uri: friend.avatar }}
            deleteRecordFriend={deleteRecordFriend}
            canDelete={true}
            updateScoreList={updateScoreList}
            isWinner={isWinner}
          />
        ))
      }
    </>
  )
}
