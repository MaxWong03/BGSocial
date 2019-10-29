import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react-native';
import CenterView from './CenterView';
import InviteFriends from '../../components/InviteFriends';

storiesOf('testing', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('InviteFriends can be closed via a button', () => (
    <InviteFriends
    />
  ))
  .add('InviteFriends search bar placeholder text changes with input', () => (
    <InviteFriends
    />
  ));