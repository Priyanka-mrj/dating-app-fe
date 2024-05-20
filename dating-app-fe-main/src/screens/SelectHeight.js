import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";
import { SCREENS_NAME } from "../navigation/ScreensName";
import BoxOption from "../components/RectangleTextBox";
import { useDispatch } from 'react-redux';
import ScreenContainer from "../components/ScreenContainer";
import { COLORS } from "../common/Colors";
import { RESGISTER_TOTAL__COUNT } from "../common/Constants";
import { REGISTER_STATE_KEY_NAMES, setRegisterFormData } from "../redux/slices/registerSlices";
import { goBack, navigate } from "../navigation/NavigationService";
import { formatToFeetAndInches } from "../common/CommonUtils";

const HEIGHT_VALUE_MAP = {
  _5_0: `5'0"`,
  _5_1: `5'1"`,
  _5_2: `5'2"`,
}

const SelectHeightScreen = () => {
  const dispatch = useDispatch();

  const [height, setHeight] = useState('');
  const [userInputHeight, setUserInputHeight] = useState("");
  

  const onPressNextButton = () => {
    if(height || userInputHeight) {
      const selectedHigth = height ? height : userInputHeight;
      dispatch(setRegisterFormData({keyName: REGISTER_STATE_KEY_NAMES.height, value: selectedHigth}));
      navigate(SCREENS_NAME.LANGUAGEPAGE);
    }
    else {
      alert("Please select height");
    }
  };
  

  const onChangeHeight = (value, isUserInput) => {
    if(isUserInput) {
      setHeight('');
      const numericValue = value.replace(/[^0-9]/g, "");
      const formattedValue = formatToFeetAndInches(numericValue);
      setUserInputHeight(formattedValue);
    }
    else {
      setUserInputHeight('');
      setHeight(value);
    }
  }

  return (
    <ScreenContainer
      onPressBack={goBack}
      isShowStepperCount={true}
      totalCount={RESGISTER_TOTAL__COUNT}
      selectedCount={4}
      onPressNext={onPressNextButton}
    >
      <View style={styles.container}>
        <Text style={styles.text2}>{'What’s your height?'}</Text>
        <BoxOption
          onPress={() => onChangeHeight(HEIGHT_VALUE_MAP._5_0)}
          label="5’0”"
          isClicked={height === HEIGHT_VALUE_MAP._5_0}
          style={{marginTop: 30}}
        />
        <BoxOption
          onPress={() => onChangeHeight(HEIGHT_VALUE_MAP._5_1)}
          label="5’1”"
          isClicked={height === HEIGHT_VALUE_MAP._5_1}
          style={{marginVertical: 30}}
        />
        <BoxOption
          onPress={() => onChangeHeight(HEIGHT_VALUE_MAP._5_2)}
          label="5’2”"
          isClicked={height === HEIGHT_VALUE_MAP._5_2}
        />
        <View style={[styles.textview , {borderWidth: userInputHeight.length ? 0 : 1}]}>
          <TextInput
            style={userInputHeight.length ? styles.filledTextInput : styles.textInput}
            value={userInputHeight}
            onChangeText={(text) => onChangeHeight(text, true)}
            placeholder="Enter Height"
            placeholderTextColor={COLORS.PLACEHOLDER_TEXT}
            maxLength={5}
            keyboardType="numeric"
          />
        </View>
      </View>
    </ScreenContainer>
  );
}

const textInputStyle = {
  color: COLORS.BLACK,
  textAlign: 'center',
  fontSize: 16,
  borderRadius: 10,
  height: 45
}

const styles = StyleSheet.create({
  textview :{
    borderWidth: 1,
    borderColor: "#676767",
    borderRadius: 10,
    marginTop: 30
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 50,
    //alignItems: 'center',
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
  textInput: {
    ...textInputStyle
  },
  filledTextInput: {
    ...textInputStyle,
    backgroundColor: COLORS.YELLOW_FF,
  }
});

export default SelectHeightScreen;
