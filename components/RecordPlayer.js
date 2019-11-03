import React from 'react';
import { Overlay, Button, Icon } from 'react-native-elements';
import useVisibility from '../hooks/useVisibility';
import PlayerModal from '../components/PlayerModal'
import useList from '../hooks/useList';

export default function RecordPlayer({ userFriends, changeFriendSlot }) {
  userFriends = userFriends.map(friend => {
    return { ...friend, 'selected': false }
  })

  const { visible, showModal, closeModal } = useVisibility(false);
  const { list: friendSelectList, onSelectRecord: onSelect } = useList(userFriends);
  
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
          />
        }
      />
    </>
  )
}



{/* <RecordPlayer
        changeFriendSlot={changeFriendSlot}
        userFriends={userFriends}
        buttonText={'Add Player Score'}
        attendance={{ id, name, avatar, invited: true }}
        score={score}
        onChangeScore={onChangeScore}
      /> */}