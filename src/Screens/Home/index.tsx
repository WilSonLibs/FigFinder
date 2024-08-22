import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

const Home = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setSelectedEndDate(date);
    } else {
      setSelectedStartDate(date);
      setSelectedEndDate(null); // Reset end date when a new start date is selected
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Select a date range:</Text>
      <CalendarPicker
        startFromMonday={true}
        allowRangeSelection={true}
        minDate={new Date(2020, 1, 1)}
        maxDate={new Date(2050, 6, 3)}
        todayBackgroundColor="#f2e6ff"
        selectedDayColor="#7300e6"
        selectedDayTextColor="#FFFFFF"
        onDateChange={onDateChange}
      />
      <View style={styles.dateContainer}>
        <Text style={styles.text}>
          Selected Start Date:{' '}
          {selectedStartDate ? selectedStartDate.toString() : ''}
        </Text>
        <Text style={styles.text}>
          Selected End Date: {selectedEndDate ? selectedEndDate.toString() : ''}
        </Text>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  text: {
    fontSize: 18,
    marginVertical: 10,
  },
  dateContainer: {
    marginTop: 20,
  },
});
