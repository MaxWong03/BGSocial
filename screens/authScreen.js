import React from 'react';
import {
  AsyncStorage,
  Button,
  StyleSheet,
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
  const { navigate } = useNavigation();
  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    // this.props.navigation.navigate('Main');
    navigate('Main');
  };

  return(
    <View style={styles.container}>
    <Button title="Sign in!" onPress={() => _signInAsync()} />
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
