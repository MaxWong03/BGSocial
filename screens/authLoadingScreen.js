/**
 * ABOUT THIS SCREEN COMPONENT
 * 
 * AuthLoadingScreen renders a loading screen component
 * I am not too sure what is it for, in the example 
 * https://snack.expo.io/@react-navigation/auth-flow-v3
 * snack has it there but if I follow them the app just get stuck at the output of this componenet 
 * 
 * Need to ask a mentor and maybe delete this file after
 */


// import React from 'react';
// import {
//   ActivityIndicator,
//   StatusBar,
//   View,
//   StyleSheet
// } from 'react-native';
// import { useNavigation } from 'react-navigation-hooks';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// export default function AuthLoadingScreen() {
//   const { navigate } = useNavigation();
//   _bootstrapAsync = async () => {
//     const userToken = await AsyncStorage.getItem('userToken');

//     // This will switch to the App screen or Auth screen and this loading
//     // screen will be unmounted and thrown away.
//     navigate(userToken ? 'App' : 'Auth');
//   };
  
//     // Render any loading content that you like here
//   return (
//     <View style={styles.container}>
//       <ActivityIndicator />
//       <StatusBar barStyle="default" />
//     </View>
//   );

// }


