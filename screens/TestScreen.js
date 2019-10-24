import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from 'react-navigation-hooks';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function authScreen() {
  return(
    <View style={styles.container}>
      <Text> Replace This Text Container To Test Out Components</Text>
  </View>
  );
};




// class SignInScreen extends React.Component {
//   static navigationOptions = {
//     title: 'Please sign in',
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <Button title="Sign in!" onPress={this._signInAsync} />
//       </View>
//     );
//   }

//   _signInAsync = async () => {
//     await AsyncStorage.setItem('userToken', 'abc');
//     this.props.navigation.navigate('App');
//   };
