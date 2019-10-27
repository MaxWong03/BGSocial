import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react-native';
import CenterView from './CenterView';
import InviteFriends from '../../components/InviteFriends';

storiesOf('InviteFriends', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('InviteFriends can be closed via a button', () => (
    <InviteFriends
    />
  ))
  .add('InviteFriends have a search bar', () => (
    <InviteFriends
    />
  ))
  .add('InviteFriends render user friends avatar and their name', () => (
    <InviteFriends
    />
  ))
  .add('InviteFriends filter users friends by name', () => (
    <InviteFriends
    />
  ))
  .add('InviteFriends filter users friends by skill level', () => (
    <InviteFriends
    />
  ))
  .add('InviteFriends can be opened via a button', () => (
    <InviteFriends
    />
  ))
  .add('InviteFriends can select friends from list', () => (
    <InviteFriends
    />
  ))
  .add('InviteFriends can unselect friends from list', () => (
    <InviteFriends
    />
  ))
  .add("InviteFriends closes on valid invitation", () => (
    <InviteFriends
    />
  ))
  .add("InviteFriends stays open on invalid invitation", () => (
    <InviteFriends
    />
  ))