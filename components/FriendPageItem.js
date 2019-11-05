import React from 'react';
import { View } from 'react-native';
import { Button, ListItem } from "react-native-elements";

export default function FriendPageItem({ person, dispatchFriends, REMOVE_FRIEND, unfriend }) {

  return (
    <ListItem
      key={person.id}
      leftAvatar={{ size: 60, rounded: true, source: { uri: person.avatar } }}
      title={ person.name }
      subtitle = {
        <View style= { {flexDirection: 'row', justifyContent: 'flex-end', paddingVertical: 8} } >
          <Button
            title={"More info "}
            type='outline'
            iconRight={true}
            onPress={ 
              () => navigation.navigate('UserMoreInfo', { user: person })
            }
          />
          <Button
            title={"Unfriend"}
            type='outline'
            iconRight={true}
            onPress={()=> ( unfriend(person.id) )}
          />
        </View>
      }
      bottomDivider
    />
  );
}
