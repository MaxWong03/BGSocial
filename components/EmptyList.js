import React from 'react';
import { ListItem, Icon } from 'react-native-elements';

export default function EmptyList({ title }) {
  return (
    <ListItem
      leftIcon={
        <Icon
          name='arrow-up'
          type='font-awesome'
          color='black'
        />
      }
      title={title}
    />
  )
}