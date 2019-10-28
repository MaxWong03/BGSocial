import React, { useState } from 'react'
import { Overlay } from 'react-native-elements';
import InviteFriendsModal from './InviteFriends';

export default function InviteFriends(props) {
  const [visible, setVisible] = useState(true);

  //close InviteFriend Component
  const goBack = () => setVisible(false);

  return (
    <Overlay
      isVisible={visible}
      children={
        <InviteFriendsModal
          goBack={goBack}
        />
      }
    />

  )
}

