import React, {useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import Styles from '../common/CommonStyles';
import Button from '../components/Button';
import {SCREENS_NAME} from '../navigation/ScreensName';
import {generateOTP, setPhnumber} from '../redux/saga/SagaActions';
import ScreenContainer from '../components/ScreenContainer';
import { SCREEN_WIDTH } from '../common/Constants';
import CallSvg from '../assets/Call.svg'
import { LayoutWrapper } from '../components/layoutWrapper/LayoutWrapper';
import { goBack, navigate } from '../navigation/NavigationService';

const LoginPhNumber = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const handlePhoneInputChange = text => {
    const numericValue = text.replace(/[^0-9]/g, '');
    const trimmedValue = numericValue.slice(0, 10);
    setPhoneNumber(trimmedValue);
    setModalMessage('');
  };
  const dispatch = useDispatch();
  const error = useSelector(state => state?.datingAppReducer?.error);
  const otp = useSelector(state => state?.datingAppReducer?.otp);


  const usePrevious = value => {
    const ref = useRef();

    useEffect(() => {
      ref.current = value;
    }, [value]);

    return ref.current;
  };

  const prevOtp = usePrevious(otp);

  useEffect(() => {
    if (otp !== prevOtp && otp !== null && prevOtp !== undefined) {
      alert(`Your Otp is ${otp}`);
    }
  }, [otp]);

  const handleGenerateOTP = () => {
    const phoneNumberRegex = /^\d{10}$/;
    if (phoneNumberRegex.test(phoneNumber)) {
      dispatch(setPhnumber(phoneNumber));
      const mobileNo = phoneNumber;
      dispatch(generateOTP(mobileNo));
      navigate(SCREENS_NAME.OTPPAGE, {phoneNumber, otp})
    } else {
      setModalMessage('Invalid phone number');
    }
  };


  return (
    <LayoutWrapper>
      <ScreenContainer onPressBack={goBack}>
        <View style={{alignItems: 'center', flex: 1,}}>
          <Text style={styles.text4}>Enter your number</Text>
          {modalMessage ? <Text style={styles.text3}>{modalMessage}</Text> : null}
          <View style={styles.view2}>
            <CallSvg/>
            <Text style={styles.text2}>Get OTP</Text>
          </View>
          <View>
            <View style={styles.views}>
              <Text style={styles.countryCode}>+91</Text>
              <TextInput
                style={styles.textinput}
                maxLength={13}
                keyboardType="phone-pad"
                value={phoneNumber}
                defaultValue={'+91'}
                onChangeText={handlePhoneInputChange}
              />
            </View>
          </View>
          <Button
            text="Continue"
            onPress={handleGenerateOTP}
            style={{width: (SCREEN_WIDTH - 80)}}
          />
        </View>
      </ScreenContainer>
    </LayoutWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textinput: {
    flex: 1,
    color: '#212121',
    left: 6,
    fontWeight: '500',
    fontSize: 16,
  },
  countryCode: {
    color: '#212121',
    fontWeight: '500',
    fontSize: 16,
  },
  views: {
    width: (SCREEN_WIDTH - 80),
    height: 45,
    borderWidth: 1,
    borderColor: '#676767',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 50, 
    marginBottom: 30
  },
  text2: {
    color: '#000000',
    marginLeft: 5,
    fontWeight: '500',
    fontSize: 16,
  },
  text3: {
    color: 'red',
    fontWeight: '700',
    fontSize: 10,
    // bottom: 20,
    // right: 50,
  },
  text4: {
    color: '#000000',
    // bottom: 150,
    // right: 50,
    fontWeight: '700',
    fontSize: 28,
  },
  view2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
    // bottom: 130,
    // right: 50,
  },
  view3: {
    position: 'relative',
    marginLeft: 90,
    top: -50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginPhNumber;
