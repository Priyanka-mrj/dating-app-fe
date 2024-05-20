import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {SCREENS_NAME} from '../navigation/ScreensName';
import {setProfileName} from '../redux/saga/SagaActions';
import ScreenContainer from '../components/ScreenContainer';
import {COLORS} from '../common/Colors';
import DButton from '../components/DButton';
import { RESGISTER_TOTAL__COUNT } from '../common/Constants';
import { REGISTER_STATE_KEY_NAMES, setRegisterFormData } from '../redux/slices/registerSlices';
import { goBack, navigate } from '../navigation/NavigationService';

const UserNameScreen = () => {
  const [name, setName] = useState('');


  const onPressNextButton = () => {
    if (name) {
      dispatch(setRegisterFormData({keyName: REGISTER_STATE_KEY_NAMES.name, value:name}));
      navigate(SCREENS_NAME.DOBPAGE);
    } else {
      alert('enter your name');
    }
  };
  const dispatch = useDispatch();

  return (
    <ScreenContainer 
      onPressBack={goBack} 
      isShowStepperCount={true}
      totalCount={RESGISTER_TOTAL__COUNT}
      selectedCount={1}
      onPressNext={onPressNextButton}
    >
      <View style={styles.container}>
          <Text style={styles.text2}>{'What’s your name?'}</Text>
          <View style={[styles.view1, { borderWidth: name.length ? 0 : 1}]}>
              <TextInput
                placeholderTextColor={COLORS.PLACEHOLDER_TEXT}
                style={name.length ? styles.filledTextInput : styles.textInput}
                value={name}
                placeholder="Enter your name"
                maxLength={50}
                onChangeText={text => {
                  const filteredText = text.replace(/[^a-zA-Z\s]/g, '');
                  setName(filteredText);
                }}
              />
            </View>
            <Text style={styles.text3}>
              {'You won’t be able to change this later.'}
            </Text>
      </View>
    </ScreenContainer>
  );
};

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
  }
});

export default UserNameScreen;
