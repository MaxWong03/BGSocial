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

export default authStack