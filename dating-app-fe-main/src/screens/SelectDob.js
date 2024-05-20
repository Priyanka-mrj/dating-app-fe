import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  TextInput,
} from "react-native";
import { useDispatch } from 'react-redux';
import { SCREENS_NAME } from "../navigation/ScreensName";
import ScreenContainer from "../components/ScreenContainer";
import { COLORS } from "../common/Colors";
import { RESGISTER_TOTAL__COUNT } from "../common/Constants";
import { REGISTER_STATE_KEY_NAMES, setRegisterFormData } from "../redux/slices/registerSlices";
import { goBack, navigate } from "../navigation/NavigationService";


const SelectGenderScreen = () => {
  const dispatch = useDispatch();
  const [dob, setDob] = useState("");
  const [dobError, setDobError] = useState("");

  const formatDob = (dob) => {
    let formattedDob = dob;
    if (formattedDob.length === 2 && !formattedDob.includes('/')) {
      formattedDob += '/';
    }
    if (formattedDob.length === 5 && !formattedDob.includes('/', 3)) {
      formattedDob += '/';
    }
    return formattedDob;
  };

  const handleDobChange = (dob) => {
    let formattedDob = formatDob(dob);
  
    const today = new Date();
    const todayYear = today.getFullYear();
  
    const regexVar = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
    const regexVarTest = regexVar.test(formattedDob);
  
    const userBirthDate = new Date(
      formattedDob.split("/").reverse().join("-")
    );
  
    const cutOff19 = todayYear - 19;
    const cutOff95 = todayYear - 95;
  
    const dd = parseInt(formattedDob.slice(0, 2));
    const mm = parseInt(formattedDob.slice(3, 5));
    const yyyy = parseInt(formattedDob.slice(6));

    console.log('todayYear',todayYear);
  
    
    if (dd < 1 || dd > 31) {
      setDobError("Invalid date");
    } else if (mm < 1 || mm > 12) {
      setDobError("Invalid month");
    } else if (yyyy < 1000 || yyyy > todayYear) {
      setDobError("Invalid year");
    } else if (userBirthDate >= new Date(cutOff19, today.getMonth(), today.getDate())) {
      setDobError("You have to be older than 19");20
    } else if (userBirthDate <= new Date(cutOff95, today.getMonth(), today.getDate())) {
      setDobError("You have to be younger than 95");
    } else {
      setDobError("");
    }
  
    setDob(formattedDob);
  };
  // console.log("nativeEvent#1",nativeEvent);
  const handleKeyPress = ({ nativeEvent }) => {
    console.log("nativeEvent.key",nativeEvent,nativeEvent.keyIdentifier);
    if (nativeEvent.key === 'Backspace') {
      let formattedDob = formatDob(dob);

      const hasTrailingSlash = formattedDob.endsWith('/');

      formattedDob = formattedDob.slice(0, -2);

      if (hasTrailingSlash) {
        formattedDob += '/';
      }

      setDob(formattedDob);
    }
  };

  const onPressNextButton = () => {
    const today = new Date();
    const todayYear = today.getFullYear();

    const regexVar = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
    const regexVarTest = regexVar.test(dob);

    const userBirthDate = new Date(
      dob.split("/").reverse().join("-")
    );

    const cutOff19 = todayYear - 19;
    const cutOff95 = todayYear - 95;

    if (isNaN(userBirthDate)) {
      setDobError("Enter date of birth as dd/mm/yyyy");
    } else if (!regexVarTest) {
      setDobError("Enter date of birth as dd/mm/yyyy");
    } else if (userBirthDate.getDate() !== parseInt(dob.slice(0, 2))) {
      setDobError("Invalid date");
    } else if (userBirthDate.getMonth() + 1 !== parseInt(dob.slice(3, 5))) {
      setDobError("Invalid month");
    } else if (
      userBirthDate >= new Date(cutOff19, today.getMonth(), today.getDate())
    ) {
      setDobError("You have to be older than 19");
    } else if (
      userBirthDate <= new Date(cutOff95, today.getMonth(), today.getDate())
    ) {
      setDobError("You have to be younger than 95");
    } else {
      setDobError("");
      const parts = dob.split("/");
      const formattedDob = `${parts[2]}-${parts[1]}-${parts[0]}`;
      dispatch(setRegisterFormData({keyName: REGISTER_STATE_KEY_NAMES.dob, value: formattedDob}));
      navigate(SCREENS_NAME.GENDERPAGE);
    }
  };

  return (
    <ScreenContainer 
    onPressBack={goBack} 
    isShowStepperCount={true}
    totalCount={RESGISTER_TOTAL__COUNT}
    selectedCount={2}
    onPressNext={onPressNextButton}
  >
    <View style={styles.container}>
        <Text style={styles.text2}>{'Your date of birth?'}</Text>
        <View style={[styles.view1, { borderWidth: dob.length ? 0 : 1}]}>
            <TextInput
              placeholderTextColor={COLORS.PLACEHOLDER_TEXT}
              style={dob.length ? styles.filledTextInput : styles.textInput}
              value={dob}
              placeholder="DD / MM / YYYY"
              keyboardType="numeric"
              maxLength={10}
              onChangeText={handleDobChange}
            />
          </View>
          {dobError ? <Text style={styles.errorText}>{dobError}</Text> : null}
          <Text style={styles.text3}>
            {'You won’t be able to change this later.'}
          </Text>
    </View>
  </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 50,
  },
  text2: {
    color: '#000000',
    fontWeight: '700',
    fontSize: 28,
    textAlign: 'center'
  },
  view1: {
    borderColor: '#676767',
    borderRadius: 10,
    marginTop: 40,
  },
  text3: {
    color: COLORS.BLACK,
    fontWeight: '500',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10
  },
  textInput: {
    color: COLORS.BLACK,
    textAlign: 'center',
    fontSize: 18,
    borderRadius: 10,
  },
  filledTextInput: {
    color: COLORS.BLACK,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
    backgroundColor: COLORS.YELLOW_FF,
    borderRadius: 10,
  },
  errorText: {
    color: COLORS.RED,
    fontWeight: '400',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5
  }
});

export default SelectGenderScreen;