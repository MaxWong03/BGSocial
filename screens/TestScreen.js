import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Overlay, Button, Icon } from 'react-native-elements';
import SelectGamesModal from './../components/SelectGamesModal';


export default function TestScreen() {
  
  return (
    <View>
      <SelectGamesModal/>
    </View>
  );
}