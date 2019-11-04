import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import EventsScreen from '../screens/EventsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TestScreen from '../screens/TestScreen';
import CreateEventScreen from '../screens/CreateEvent';
import OwnedGameScreen from '../screens/OwnedGameScreen';
import GamesLibraryScreen from '../screens/GamesLibraryScreen';
import SingleEventScreen from '../screens/SingleEventScreen';
import GameMoreInfoScreen from '../screens/GameMoreInfoScreen';
import EditEventScreen from '../screens/EditEventScreen';
import FriendsScreen from '../screens/FriendsScreen';
import AddFriendsScreen from '../screens/AddFriendsScreen'
import FriendMoreInfoScreen from '../screens/FriendMoreInfo';


const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

HomeStack.path = '';

const EventsStack = createStackNavigator(
  {
    Events: EventsScreen,
    CreateEvent: CreateEventScreen,
    SingleEvent: SingleEventScreen,
    EditEvent: EditEventScreen

  },
  config
);

EventsStack.navigationOptions = {
  tabBarLabel: 'Events',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-calendar' : 'md-calendar'} />
  ),
};

EventsStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const TestStack = createStackNavigator(
  {
    Tests: TestScreen,
  },
  config
)

TestStack.navigationOptions = {
  tabBarLabel: 'TEST',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

TestStack.path = '';


const FriendsStack = createStackNavigator(
  {
    ShowFriends: FriendsScreen,
    AddFriends: AddFriendsScreen,
    UserMoreInfo: FriendMoreInfoScreen
  },
  config
)

const BadgedIcon = withBadge(4)(Icon)
// @connect(state => ({
//   notifications: state.notifications,
// }))
// @withBadge(props => props.notifications.length)

FriendsStack.navigationOptions = {
  tabBarLabel: 'Friends',
  tabBarIcon: ({ focused }) => (
    <>
      <BadgedIcon type="ionicon" containerStyle = { { position:'absolute', top: 0, right: -100 } }/>
      <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'} />
      {/* <Badge
        status="error"
        containerStyle={{ position: 'absolute', top: 0, right: 0,  }}
        size={50}
        selected={focused}
      /> */}
      
    </>
  ),
};

FriendsStack.path = '';


const GamesStack = createStackNavigator(
  {
    OwnedGame: OwnedGameScreen,
    GameLibrary: GamesLibraryScreen,
    GameMoreInfo: GameMoreInfoScreen
  },
  config
)

GamesStack.navigationOptions = {
  tabBarLabel: 'Games',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

GamesStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  EventsStack,
  SettingsStack,
  TestStack,
  FriendsStack,
  GamesStack
});

tabNavigator.path = '';



export default tabNavigator;