import React, { Fragment } from 'react';
import { Text, View,  } from 'react-native'
import { storiesOf } from '@storybook/react-native';
import CenterView from './CenterView';
import DatePicker from '../../components/DatePicker';

storiesOf('DateTimePicker', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('DateTimePicker', () => (
    <View>
      <DatePicker />
    </View>
  ))