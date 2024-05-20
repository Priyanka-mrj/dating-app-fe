import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import Styles from '../../../common/CommonStyles';
import {SCREENS_NAME} from '../../../navigation/ScreensName';
import {setProfileName} from '../../../redux/saga/SagaActions';
import SelectDateCard from '../../../components/SelectDateCard';
import {DATING_TYPE} from '../../../common/Constants';
import {COLORS} from '../../../common/Colors';
import NextButtonSvg from '../../../assets/nextButton.svg';
import BackIcon from '../../../components/BackIcon';
import { removeElementFromArray, showToast } from '../../../common/CommonUtils';
import Toast from 'react-native-toast-message';

const SelectDates = (props) => {
  const {date_choice, selectedProfile = {}} = props?.route?.params;

  const [name, setName] = useState('');
  const [selectedDatesType, setSelectedDatesType] = useState('');

  const navigation = useNavigation();

  // const dispatch = useDispatch();
  // React.useEffect(() => {
  //   dispatch(setProfileName(name));
  // }, [dispatch, name]);

  const goBack = () => {
    navigation.goBack();
  };

  const onPressNextButton = () => {
    if(selectedDatesType.length) {
      navigation.navigate(SCREENS_NAME.DATING_DETAILS, {selectedDateChoice: selectedDatesType, datingDetails: selectedProfile});
    }
    else {
      Alert.alert('Alert!', 'Please select atleast one dating choice', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  };

  const onSelectDateCard = (datingType) => {
    // let selectedDate = [...selectedDatesType];
    // if(selectedDate.includes(datingType)){
    //   selectedDate = removeElementFromArray(selectedDate, datingType);
    // }
    // else{
    //   selectedDate.push(datingType);
    // }
    setSelectedDatesType(datingType);
  }

  return (
    <View style={styles.container}>
      <BackIcon containerStyle={styles.backButton} onPress={goBack}/>
      <View>
        <Text style={styles.heading}>Select Your date choice</Text>
        <Text style={styles.description}>
          Select your desired date, time & coin {'\n'} {'   '}and send your
          dating invitation
        </Text>
        <View style={styles.rowContainer}>
          { date_choice.map((item) => {
            return (
              <SelectDateCard
                key={item.id}
                datingDetail={item}
                isSelected={selectedDatesType.includes(item.date_type)}
                onPressCheckBox={onSelectDateCard}
              />
            );
          })
          }
          </View>
      </View>
      <View style={{alignItems: 'flex-end', marginBottom: 40}}>
        <TouchableOpacity onPress={onPressNextButton}>
            <NextButtonSvg />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    backgroundColor: COLORS.WHITE
  },
  body: {
    marginTop: 50,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.BLACK,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.BLACK,
    textAlign: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap:'wrap',
  },
  backButton: {
   marginTop: 50
  }
});

export default SelectDates;
