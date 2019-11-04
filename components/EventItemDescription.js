
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Icon, Text } from 'react-native-elements';
import { formatDateWithTime } from './../utils'


export default function EventItem({ eventTitle, chosenDate, attendants, isOwner, confirmedAssistance, onPress }) {
  let title = 'More info!';
  let icon = 'info-circle';
  if (chosenDate) {
    if (!isOwner && !confirmedAssistance) {
      title = 'Confirm';
      icon = 'check';
    }
  }
  else {
    if (isOwner) {
      title = 'Check votes!';
      icon = 'archive';
    }
    else {
      title = 'Vote!';
      icon = 'calendar';
    }
  }

  return (
    <View style={styles.textContainer}>
      <View>
        {!!eventTitle && <Text style={{ fontSize: 16 }}>{eventTitle}</Text>}
        {!!chosenDate && <Text style={styles.subtitle}>Date: {formatDateWithTime(chosenDate)}</Text>}
        {!!attendants && <Text style={styles.subtitle}>Attendants: {attendants}</Text>}
        {!attendants && isOwner && <Text style={styles.subtitle}>Choose a date for your event</Text>}
        {!attendants && !isOwner && <Text style={styles.subtitle}>Vote for the dates!</Text>}
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 }}>
        <Button
          title={title}
          type='outline'
          iconRight={false}
          onPress={onPress}
          titleStyle={{ fontSize: 12 }}
          buttonStyle={{ paddingVertical: 4, minWidth: 120 }}
          icon={
            <Icon
              size={15}
              name={icon}
              type='font-awesome'
              color='#bdbdbd'
              iconStyle={{ marginRight: 10 }}
            />
          } />
        {isOwner &&
          <Button
            title="Hosting"
            type='outline'
            iconRight={false}
            onPress={onPress}
            titleStyle={{ fontSize: 12, color: "white" }}
            buttonStyle={{ paddingVertical: 4, backgroundColor: '#F38989' }}
            type="solid"
          />
        }


      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    color: 'gray',
    fontSize: 13
  },
  textContainer: {
    flex: 1,
    padding: 14,
    justifyContent: 'space-between',
  },
  hostFlag: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 10,
    paddingBottom: 0,
    backgroundColor: '#F38989',
    borderTopRightRadius: 10,
    aspectRatio: 1,
    paddingVertical: 5
  }
});