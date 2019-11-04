import { Icon, Button } from 'react-native-elements';
import React, { useEffect }from 'react';
import { StyleSheet, View, Image, Text, ScrollView } from 'react-native';

export default function FriendMoreInfoScreen({navigation}) {
  const individualUser = navigation.getParam("user");
  
  return (
    <View>
      <ScrollView>
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
              style={{ paddingVertical: 15 }}
            >
              <Text>NickName: {individualUser.nickname}</Text>
              <Text>User Email: {individualUser.email}</Text>
            </View>
            <Button
              buttonStyle={styles.button}
              title= ' back'
              type='outline'
              iconLeft={true}
              onPress={ () => navigation.goBack() }
              icon={
                <Icon
                  size={20}
                  name='arrow-circle-left'
                  type='font-awesome'
                  color='#bdbdbd'
                  title='Go back previous page'
                />
              } />
          </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: 'red',
  },
  image: {
    height: 250,
    width: '100%',
    // resizeMode: 'cover',
  },
  textContainer: {
    fontSize: 30,
  },
  titleStyle: {
    fontSize: 50,
    textAlign: 'center', // <-- the magic
  },
  descriptionStyle: {
    aspectRatio: 1,
    backgroundColor: '#E2DBDB',
    margin: 5,
    padding: 5,
    textAlign: 'center', // <-- the magic
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
});