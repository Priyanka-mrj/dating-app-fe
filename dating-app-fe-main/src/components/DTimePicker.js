import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {COLORS} from '../common/Colors';
import STYLES from '../common/CommonStyles';
import UpArrowSvg from '../assets/upArrow.svg';
import DownArrowSvg from '../assets/downArrow.svg';
import DDropDown from './DDropDown';

const HOUR_DATA = [
  {id: '1', value: '01'},
  {id: '2', value: '02'},
  {id: '3', value: '03'},
  {id: '4', value: '04'},
  {id: '5', value: '05'},
  {id: '6', value: '06'},
  {id: '7', value: '07'},
  {id: '8', value: '08'},
  {id: '9', value: '09'},
  {id: '10', value: '10'},
  {id: '11', value: '11'},
  {id: '12', value: '12'},
]

const DTimePicker = props => {
  const { selectedTime, onChangeTime} = props;

  const [hour, setHour] = useState(selectedTime?.hour);
  const [minute, setMinute] = useState(selectedTime.min);
  const [isAM, setIsAM] = useState(selectedTime.isAm);

  const toggleAMPM = () => {
    onChangeTime(!isAM, "isAm");
    setIsAM(!isAM);
  };

  const incrementHour = () => {
    const hr = (hour + 1) % 12 || 12;
    onChangeTime(hr, "hour");
    setHour(hr);
    //console.log("timePickerRef ====> ", timePickerRef);
  };

  const decrementHour = () => {
    const hr = (hour - 1) % 12 || 12;
    onChangeTime(hr, "hour");
    setHour(hr);
  };

  const incrementMinute = () => {
    const min = (minute + 1) % 60;
    onChangeTime(min, "min");
    setMinute(min);
  };

  const decrementMinute = () => {
    const min = (minute - 1 + 60) % 60;
    onChangeTime(min, "min");
    setMinute(min);
  };

  const onSelectHour = () => {

  }

  return (
    <>
    <View style={styles.timeContainer}>
      <View style={styles.arrowContainer}>
      <TouchableOpacity onPress={incrementHour} style={styles.iconSpacing}>
          <UpArrowSvg />
        </TouchableOpacity>
        <Text style={styles.timeText}>{hour < 10 ? `0${hour}` : hour}</Text>
        <TouchableOpacity onPress={decrementHour} style={styles.iconSpacing}>
          <DownArrowSvg />
        </TouchableOpacity>
      </View> 
      <Text style={styles.colon}>{":"}</Text>
      <View style={styles.arrowContainer}>
        <TouchableOpacity onPress={incrementMinute} style={styles.iconSpacing}>
          <UpArrowSvg />
        </TouchableOpacity>
        <Text style={styles.timeText}>
          {minute < 10 ? `0${minute}` : minute}
        </Text>
        <TouchableOpacity onPress={decrementMinute} style={styles.iconSpacing}>
          <DownArrowSvg />
        </TouchableOpacity>
      </View> 
      <TouchableOpacity onPress={toggleAMPM}>
        <Text style={styles.ampmText}>{isAM ? 'AM' : 'PM'}</Text>
      </TouchableOpacity>
    </View>
    </>
  )
};

const styles = StyleSheet.create({
  headingText: {
    color: COLORS.BLACK,
    fontWeight: 'bold',
    fontSize: 24,
    marginLeft: 30,
    marginBottom: 10,
  },
  timeContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderColor: '#E5E7F0',
    borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
   // height: 150,
   paddingVertical: 20,
    ...STYLES.shadow,
    justifyContent: 'space-evenly',
  },
  arrowContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: 30,
  },
  timeText: {
    fontSize: 24,
    marginHorizontal: 5,
    color: '#454545',
    fontWeight: '400',
    paddingVertical: 10,
  },
  colon: {
    fontSize: 24,
    marginHorizontal: 5,
    color: COLORS.BLACK
    //left: 65,
  },
  ampmText: {
    fontSize: 18,
    marginHorizontal: 5,
    color: '#454545',
    fontWeight: '400',
  },
  iconSpacing: {
    paddingHorizontal: 10,
    paddingVertical: 5
  }
});

export default React.memo(DTimePicker);
