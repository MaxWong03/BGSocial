import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import EventsScreen from '../screens/EventsScreen';
import PlaysScreen from '../screens/PlaysScreen';
import SinglePlayScreen from '../screens/SinglePlayScreen';
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
import CreatePlayScreen from '../screens/CreatePlayScreen'
import EditPlayScreen from '../screens/EditPlayScreen';

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
          ? 'ios-home'
          : 'ios-home'
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

const PlaysStack = createStackNavigator(
  {
    Plays: PlaysScreen,
    SinglePlay: SinglePlayScreen,
    CreatePlay: CreatePlayScreen,
    EditPlay: EditPlayScreen
  },
  config
);

PlaysStack.navigationOptions = {
  tabBarLabel: 'Plays',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'dice'} type={'FontAwesome5'} />
  ),
};

PlaysStack.path = '';

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


FriendsStack.navigationOptions = {
  tabBarLabel: 'Friends',
  tabBarIcon: ({ focused }) => (
      <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'} />
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
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'logo-snapchat' : 'logo-snapchat'} />
  ),
};

GamesStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  EventsStack,
  PlaysStack,
  TestStack,
  FriendsStack,
  GamesStack
});

tabNavigator.path = '';



export default tabNavigator;