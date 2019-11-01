import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';


const textColor = '#777';

export default function IconVerticalWithLabel({ iconName, iconType, iconColor, textInfo, onPress }) {

  return (
    <View style={styles.flexBoxText}>
      <View style={styles.iconContainer}>
        <Icon
          size={20}
          name={iconName}
          type={iconType || 'font-awesome'}
          color={iconColor || textColor}
          onPress={onPress}
        />
      </View>
      <Text style={{...styles.text, color: iconColor || textColor}} onPress={onPress}>{textInfo}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  flexBoxText: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {
    flex: 1,
    color: textColor
  },
  iconContainer: {
    flex: 0,
    width: 30,
    alignItems: 'center',
  }
});
