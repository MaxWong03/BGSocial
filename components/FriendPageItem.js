import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, ListItem } from "react-native-elements";

// this is the component in the 
// 'My Friend' group of 
// 'Friend Navigator' 
export default function FriendPageItem({ person, dispatchFriends, REMOVE_FRIEND, unfriend, navigation }) {

  return (
    <ListItem
      key = {person.id}
      leftAvatar = {{ size: 80, rounded: true, source: { uri: person.avatar } }}
      title = { person.name }
      subtitle = {
        <View style = { styles.subtitleViewStyle } >
          <Button
            buttonStyle = { styles.buttonStyle }
            title = { "More info" }
            type = 'outline'
            iconRight = {true}
            onPress = { 
              () => navigation.navigate('UserMoreInfo', { user: person })
            }
          />
          <Button
            buttonStyle = { [styles.buttonStyle, {borderColor: 'red'}] }
            title={ "Unfriend"}
            titleStyle={{color: 'red'}}
            type='outline'
            iconRight={true}
            onPress={()=> ( unfriend(person.id) )}
          />
        </View>
      }
      topDivider
      bottomDivider
    />
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 200,
    padding: 10,
    borderWidth: 1
  },
  subtitleViewStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 8
  }
});