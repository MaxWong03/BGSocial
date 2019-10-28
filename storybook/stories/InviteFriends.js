import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react-native';
import CenterView from './CenterView';
import InviteFriendsOverlay from '../../components/InviteFriendsOverlay';

storiesOf('InviteFriends', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('InviteFriends can be closed via a button', () => (
    <InviteFriendsOverlay
    />
  ))
  .add('InviteFriends search bar placeholder text changes with input', () => (
    <InviteFriendsOverlay
    />
  ))
  .add('InviteFriends render user friends avatar and their name', () => (
    <InviteFriendsOverlay
    />
  ))
  .add('InviteFriends filter users friends by name', () => (
    <InviteFriendsOverlay
    />
  ))
  .add('InviteFriends filter users friends by skill level', () => (
    <InviteFriendsOverlay
    />
  ))
  .add('InviteFriends can be opened via a button', () => (
    <InviteFriendsOverlay
    />
  ))
  .add('InviteFriends can select friends from list', () => (
    <InviteFriendsOverlay
      
    />
  ))
  .add('InviteFriends can unselect friends from list', () => (
    <InviteFriendsOverlay
    />
  ))
  .add("InviteFriends closes on valid invitation", () => (
    <InviteFriendsOverlay
    />
  ))
  .add("InviteFriends stays open on invalid invitation", () => (
    <InviteFriendsOverlay
    />
  ))
