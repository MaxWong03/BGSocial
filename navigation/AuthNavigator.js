import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator} from 'react-navigation';
import fbScreen from '../screens/facebookScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const authStack = createStackNavigator(
  {
    Auth: fbScreen,
  },
  config
);

authStack.navigationOptions = {
  title: 'Please sign in',
  };

authStack.path = '';


//
// Dont know if I m gonna need this but will keep for now
//
// authStack.navigationOptions = {
//   tabBarLabel: 'Home',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={
//         Platform.OS === 'ios'
//           ? `ios-information-circle${focused ? '' : '-outline'}`
//           : 'md-information-circle'
//       }
//     />
//   ),
// };

// HomeStack.path = '';

export default authStack