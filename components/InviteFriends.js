import React, { useState } from 'react'
import { Overlay, Button, Icon } from 'react-native-elements';
import InviteFriendsModal from './InviteFriendsModal';

export default function InviteFriends(props) {
  const [visible, setVisible] = useState(false);

  const showInviteModal = () => setVisible(true);

  //close InviteFriend Component
  const goBack = () => setVisible(false);

  return (
    <>
      <Button 
        onPress={showInviteModal}
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
            goBack={goBack}
          />
        }
      />
    </>

  )
}

