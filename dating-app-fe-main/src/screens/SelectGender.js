import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { SCREENS_NAME } from "../navigation/ScreensName";
import BoxOption from "../components/RectangleTextBox";
import { useDispatch } from 'react-redux';
import ScreenContainer from "../components/ScreenContainer";
import { COLORS } from "../common/Colors";
import { RESGISTER_TOTAL__COUNT } from "../common/Constants";
import { REGISTER_STATE_KEY_NAMES, setRegisterFormData } from "../redux/slices/registerSlices";
import { goBack, navigate } from "../navigation/NavigationService";

const SelectGenderScreen = () => {
  const [isMaleClicked, setIsMaleClicked] = useState(false);
  const [isFemaleClicked, setIsFemaleClicked] = useState(false);
  const [gender, setUserGender] = useState('');

  const dispatch = useDispatch();

  const onPressNextButton = () => {
    if (isMaleClicked || isFemaleClicked) {
      dispatch(setRegisterFormData({keyName: REGISTER_STATE_KEY_NAMES.gender, value: gender}));
      navigate(SCREENS_NAME.HEIGHTPAGE);
    }
  };

  const handleMaleClick = () => {
    setIsMaleClicked(true);
    setIsFemaleClicked(false);
    setUserGender('M')
  };

  const handleFemaleClick = () => {
    setIsMaleClicked(false);
    setIsFemaleClicked(true);
    setUserGender('F')
  };


  return (
    <ScreenContainer 
      onPressBack={goBack} 
      isShowStepperCount={true}
      totalCount={RESGISTER_TOTAL__COUNT}
      selectedCount={3}
      onPressNext={onPressNextButton}
  >
    <View style={styles.container}>
        <Text style={styles.text2}>{'What’s your gender?'}</Text>
        <BoxOption onPress={handleMaleClick}
            label='Male'
            isClicked={isMaleClicked}
            additionalTextStyle={{...styles.btnText, color: isMaleClicked ? COLORS.BLACK : COLORS.PLACEHOLDER_TEXT}}
            style={{ marginVertical: 30 }}
          />
          <BoxOption onPress={handleFemaleClick}
            label='Female'
            isClicked={isFemaleClicked}
            additionalTextStyle={{...styles.btnText, color: isFemaleClicked ? COLORS.BLACK : COLORS.PLACEHOLDER_TEXT}}
          />
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
    alignItems: 'center',
  },
  text2: {
    color: '#000000',
    fontWeight: '700',
    fontSize: 28,
    textAlign: 'center',
  },
  text3: {
    color: COLORS.BLACK,
    fontWeight: '500',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10
  },
  btnText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default SelectGenderScreen;
