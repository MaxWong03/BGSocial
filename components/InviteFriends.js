import React, { useState } from 'react'
import { Text, StyleSheet } from 'react-native'
import { Overlay, Button, SearchBar } from 'react-native-elements';
import  FriendSearchBar  from '../components/FriendSearchBar';

export default function InviteFriends(props) {
  const [visible, setVisible] = useState(true);


  const goBack = () => {
    setVisible(false);
  }

  return (
    <Overlay
      isVisible={visible}
      children={
        <>
          <FriendSearchBar />
          <Button
            buttonStyle={styles.container}
            onPress={goBack}
          />
        </>
      }
    />

  )
}

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 200
  }
});