import React, { Fragment } from 'react';
import { Text, View,  } from 'react-native'
import { storiesOf } from '@storybook/react-native';
import CreateEvent from '../../screens/CreateEvent';

storiesOf('CreateEvent', module)
  .add('Can invite friend', () => (
    <CreateEvent />
  ))
  .add('Can select 3 dates', () => (
    <CreateEvent />
  ))
  .add('Can select games', () => (
    <CreateEvent />
  ))
  .add('Can select location', () => (
    <CreateEvent />
  ))
  .add('Can create Event', () => (
    <CreateEvent />
  ))
  .add('Can go back to previous screen', () => (
    <CreateEvent />
  ))