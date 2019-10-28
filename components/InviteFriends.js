import React, { useState } from 'react'
import { Button } from 'react-native'
import { Overlay } from 'react-native-elements';
import InviteFriendsModal from './InviteFriendsModal';

export default function InviteFriends(props) {
  const [visible, setVisible] = useState(false);

  const showInviteModal = () => setVisible(true);

  //close InviteFriend Component
  const goBack = () => setVisible(false);

  return (
    <>
      <Button 
        title="Invite Friends"
        onPress={showInviteModal}
      />
        <Overlay
        isVisible={visible}
        children={
          <InviteFriendsModal
            goBack={goBack}
          />
        }
      />
    </>

  )
}

