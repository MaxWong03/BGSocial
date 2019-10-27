import React, { Fragment } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Overlay, Button } from 'react-native-elements';


import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

// eslint-disable-next-line import/extensions
// import Button from './Button';
import CenterView from './CenterView';
import Welcome from './Welcome';
import InviteFriends from '../../components/InviteFriends';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

// storiesOf('Button', module)
//   .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
//   .add('with text', () => (
//     <Button onPress={action('clicked-text')}>
//       <Text>Hello Button</Text>
//     </Button>
//   ))
//   .add('with some emoji', () => (
//     <Button onPress={action('clicked-emoji')}>
//       <Text>😀 😎 👍 💯</Text>
//     </Button>
//   ));

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