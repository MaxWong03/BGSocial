import React, { useState } from 'react'
import { Text } from 'react-native'
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
    >
      <Text>I am max</Text>
    </Overlay>

  )
}

