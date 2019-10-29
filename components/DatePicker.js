import React, { useState } from "react";
import { StyleSheet } from 'react-native';
import { Button, Icon } from "react-native-elements";
import DateTimePicker from "react-native-modal-datetime-picker";

export default function DatePicker() {
  const [visible, setVisible] = useState(false);

  const showDatePicker = () => {
    setVisible(true);
  }


  const closeDatePicker = () => {
    setVisible(false);

  }
  const getPickedDate = (date) => {
    console.log("A date has been picked: ", date);
    closeDatePicker();
  }

  return (
    <>
      <Button
        onPress={showDatePicker}
        buttonStyle={styles.buttonContainer}
        icon={
          <Icon
          name='edit'
          type='material-icons'
          color='white'
          />
        }
      />
      <DateTimePicker
        mode={'datetime'}
        isVisible={visible}
        onConfirm={getPickedDate}
        onCancel={closeDatePicker}
      />
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 10
  }
})