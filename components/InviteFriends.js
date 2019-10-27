import React, { useState } from 'react'
import { Overlay, Button } from 'react-native-elements';
import { Text, StyleSheet } from 'react-native'

export default function InviteFriends(props) {
  const [visible, setVisible] = useState(true);


  const goBack = () => {
    setVisible(false);
  }

  return (
    <Overlay
      isVisible={visible}
    >
      <Button
        buttonStyle={styles.container}
        onPress={goBack}
      > style</Button>
    </Overlay>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 200
  }
});