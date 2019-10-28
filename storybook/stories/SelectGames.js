import React from 'react';
import { storiesOf } from '@storybook/react-native';
import CenterView from './CenterView';
import SelectGames from '../../components/SelectGames';

storiesOf('SelectGames', module)
.addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
.add('SelectGames has a search bar that changes value with userinput', () => {
  <SelectGames />
})
.add('SelectGames render all games own by users', () => {
  <SelectGames />
})
.add('SelectGames filter games with search bar value', () => {
  <SelectGames />
})
.add('SelectGames can be closed via button', () => {
  <SelectGames />
})
.add('SelectGames can select and unselect games', () => {
  <SelectGames />
})
