import { Platform } from 'react-native';
import { createStackNavigator} from 'react-navigation';
//Authorize Screen contains Login and Register
import AuthScreen from '../screens/LoginRegisterScreen'; 

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const authStack = createStackNavigator(
  {
    Auth: AuthScreen,
  },
  config
);

authStack.navigationOptions = {
  title: 'Please sign in',
  };

authStack.path = '';

export default authStack