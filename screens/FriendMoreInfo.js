import { Icon, Button } from 'react-native-elements';
import React, { useEffect } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, Linking } from 'react-native';

export default function FriendMoreInfoScreen({navigation}) {
  const individualUser = navigation.getParam("user");

  const userEmail = individualUser.email;
  
  return (
    <View>
      <ScrollView style = {{height: '100%'}}>
          <View 
            style={styles.imageContainer}
          >
            <Image
              style={styles.image}
              source={{ uri: `${individualUser.avatar}` }}
            />
          </View>

          <View 
            style={styles.textContainer}
          >
            <Text style={styles.titleStyle} >{individualUser.name}</Text>

            <View
              style={{ paddingVertical: 15, textAlign: 'center', }}
            >
              <Text style={{textAlign: 'center'}}>NickName:</Text>
              <Text style={{textAlign: 'center', }}>{individualUser.nickname}</Text>

              <Text style={{ textAlign: 'center', }}>User Email:</Text>

              <Button
                onPress = {() => Linking.openURL(`mailto: ${individualUser.email}`) }
                style = {{ }}
                title= {userEmail}
              />
            </View>
          </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: 'red',
    margin: 10,
    // borderRadius: 20,
    // borderWidth: 1,
  },
  image: {
    height: 250,
    width: '100%',
    // resizeMode: 'cover',
  },
  textContainer: {
    fontSize: 30,
    textAlign: 'center', // <-- the magics
  },
  titleStyle: {
    fontSize: 50,
    textAlign: 'center', // <-- the magic
  },
  // descriptionStyle: {
  //   aspectRatio: 1,
  //   backgroundColor: '#E2DBDB',
  //   margin: 5,
  //   padding: 5,
  //   textAlign: 'center', // <-- the magic
  //   borderRadius: 10,
  //   borderWidth: 1,
  //   borderColor: '#fff'
  // },
  infoContainerStyle: {
    textAlign: 'center', // <-- the magic
    alignItems: 'center',
  }
});