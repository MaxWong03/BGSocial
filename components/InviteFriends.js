import React, { useState } from 'react'
import { Overlay, Button, Icon } from 'react-native-elements';
import useVisibility from '../hooks/useVisibility';
import InviteFriendsModal from './InviteFriendsModal';
import useList from '../hooks/useList';

export default function InviteFriends({ getEventFriendList, friendInviteList, onSelect }) {
  const { visible, showModal, closeModal } = useVisibility(false);

  //Get all invited friends id
  const inviteAction = () => {
    const inviteList = [];
    friendInviteList.forEach((friend) => {
      friend['invited'] && inviteList.push(friend['id']);
    });
    getEventFriendList(inviteList);
    closeModal();
  };

  return (
    <>
      <Button
        title="Invite Friends"
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
          <InviteFriendsModal
            goBack={closeModal}
            friendInviteList={friendInviteList}
            onSelect={onSelect}
            inviteAction={inviteAction}
          />
        }
      />
    </>

  )
}

