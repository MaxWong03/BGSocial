import React, { useState } from "react";
import { Button } from "react-native-elements";
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
      <Button title="Select Date" onPress={showDatePicker} />
      <DateTimePicker
        isVisible={visible}
        onConfirm={getPickedDate}
        onCancel={closeDatePicker}
      />
    </>
  );
}

// export default class DateTimePickerTester extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isDateTimePickerVisible: false
//     };
//   }

//   showDateTimePicker = () => {
//     this.setState({ isDateTimePickerVisible: true });
//   };

//   hideDateTimePicker = () => {
//     this.setState({ isDateTimePickerVisible: false });
//   };

//   handleDatePicked = date => {
//     console.log("A date has been picked: ", date);
//     this.hideDateTimePicker();
//   };

//   render() {
//     return (
//       <>
//         <Button title="Show DatePicker" onPress={this.showDateTimePicker} />
//         <DateTimePicker
//           isVisible={this.state.isDateTimePickerVisible}
//           onConfirm={this.handleDatePicked}
//           onCancel={this.hideDateTimePicker}
//         />
//       </>
//     );
//   }
// }