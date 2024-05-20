import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import BackIcon from '../components/BackIcon';
import { useRoute } from "@react-navigation/native";
import Styles from "../common/CommonStyles";
import Button from "../components/Button";
import { SCREENS_NAME } from "../navigation/ScreensName";
import { generateOTP } from '../redux/saga/SagaActions';
import { verifyOtp } from '../services/LoginService';
import { setLogin, setLoggedInUserData} from "../redux/slices/loginSlices";
import ScreenContainer from "../components/ScreenContainer";
import DButton from "../components/DButton";
import { COLORS } from "../common/Colors";
import { goBack, navigate } from "../navigation/NavigationService";

const NumberButton = ({ number, onPress }) => {
  return (

    <TouchableOpacity
      style={styles.numberButton}
      onPress={() => onPress(number)}
    >
      <Text style={styles.numberButtonText}>{number}</Text>
    </TouchableOpacity>
  );
}

const DeleteButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.crossicon} onPress={onPress} >
      <Image source={require('../assets/backspace.png')} style={{ width: 32, height: 24, tintColor: '#111111' }} />
    </TouchableOpacity>
  );
}

const OtpScreen = () => {
  const route = useRoute();
  const { phoneNumber } = route.params;
  const [timer, setTimer] = useState(60);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [invalid, setInValidOtp] = useState(false);
  const [otps, setOtp] = useState("");
  const dispatch = useDispatch();
  const verificationResponse = useSelector((state) => state?.datingAppReducer?.verificationResponse);
  const verificationError = useSelector((state) => state?.datingAppReducer?.verificationError);

  const handleNumberPress = (number) => {
    if (otps.length < 4) {
      setOtp((prevOtp) => prevOtp + number);
    }
  };

  const handleDeletePress = () => {
    setOtp((prevOtp) => prevOtp.slice(0, -1));
  };

  const handleGenerateOTP = () => {
    const mobileNo = phoneNumber;
    dispatch(generateOTP(mobileNo));
  };

  const onPressContinue = async () => {
    if (otps.length === 4) {
      const data = await verifyOtp(phoneNumber, otps);
      if(data?.access_token) {
        dispatch(setLogin({access_token: data.access_token}));
      }
      else if(data?.message === "OTP verified successfully.") {
        navigate(SCREENS_NAME.LOCATION);
      }
    } else if (verificationError !== null) {
      setResendEnabled(true);
      setInValidOtp(true);
    }
  };

  const backHandler = () => {
    navigate(SCREENS_NAME.LOGINPAGE);
  };

  useEffect(() => {
    let interval = null;

    const startTimer = () => {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            clearInterval(interval);
            setResendEnabled(true);
            return 59;
          }
        });
      }, 1000);
    };

    startTimer();

    return () => {
      clearInterval(interval);
    };
  }, [resendEnabled]);

  useEffect(() => {
    if (resendEnabled) {
      setTimer(59);
    }
  }, [resendEnabled]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const error = useSelector((state) => state.error);
  const otp = useSelector((state) => {
    return state?.datingAppReducer?.otp;
  });

  const onPressResend = () => {
    setResendEnabled(false);
    handleGenerateOTP();
    setOtp("");
  }

  return (
    <ScreenContainer onPressBack={() => goBack()}>
      <View style={{justifyContent: 'space-between', flex: 1}}>
        <View style={styles.view1}>
          <Text style={styles.text1}>Enter the OTP</Text>
          <View style={styles.view2}>
            <Text style={styles.text2}>{phoneNumber}</Text>
            <TouchableOpacity onPress={backHandler}>
              <Image
                source={require('../assets/pngwing.png')}
                style={{width: 14, height: 13, tintColor: '#111111'}}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.otpContainer}>
            {[0, 1, 2, 3].map(index => (
              <View key={index} style={styles.otpBox}>
                <Text style={styles.otpDigit}>{otps[index]}</Text>
              </View>
            ))}
          </View>
          <DButton
            label="Continue"
            onPress={onPressContinue}
            yellowButton={true}
            additionalStyle={{width: '100%'}}
          />
          <Text style={styles.timer}>
            {!resendEnabled && formatTime(timer)}
          </Text>
          {resendEnabled && (
            <Text
              style={[
                styles.timer,
                {color: resendEnabled ? '#1B71E8' : 'gray'},
              ]}
              onPress={onPressResend}>
              {invalid
                ? 'Invalid Otp click to resend'
                : 'Otp expired click to resend'}
            </Text>
          )}
        </View>
        <View style={styles.numberPad}>
          <View style={styles.row}>
            <NumberButton number="1" onPress={handleNumberPress} />
            <NumberButton number="2" onPress={handleNumberPress} />
            <NumberButton number="3" onPress={handleNumberPress} />
          </View>
          <View style={styles.row}>
            <NumberButton number="4" onPress={handleNumberPress} />
            <NumberButton number="5" onPress={handleNumberPress} />
            <NumberButton number="6" onPress={handleNumberPress} />
          </View>
          <View style={styles.row}>
            <NumberButton number="7" onPress={handleNumberPress} />
            <NumberButton number="8" onPress={handleNumberPress} />
            <NumberButton number="9" onPress={handleNumberPress} />
          </View>
          <View style={styles.row}>
            <View style={styles.emptyButton}></View>
            <NumberButton number="0" onPress={handleNumberPress} />
            <DeleteButton onPress={handleDeletePress} />
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  editicon: {
    lightblack: "#999999",
  },
  otpDigit: {
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 24,
    color: "#212121",
    margin: 10,
    marginLeft: 16,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: '100%',
    marginVertical: 40
  },
  otpBox: {
    boxSizing: "border-box",
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: "#676767",
    borderRadius: 10,
  },
  emptyButton: {
    flex: 1,
    marginHorizontal: 6,
  },
  crossicon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    flex: 1,
    marginHorizontal: 6,
    left: 5,
    bottom: 16,
  },
  rectangle: {
    width: 280,
    height: 45,
    borderWidth: 1,
    borderColor: "#676767",
    borderRadius: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
  },
  numberPad: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    gap: 8,
    backgroundColor: "#D1D2D8",
    paddingBottom: 50
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    //marginBottom: 10,
  },
  numberText: {
    fontSize: 18,
  },
  numberButton: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    width: 112,
    height: 59,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 1 },
    borderRadius: 4,
    flex: 1,
    // bottom: 20,
    marginHorizontal: 3,
    // marginVertical: -4,
  },
  numberButtonText: {
    fontSize: 24,
    fontWeight: "400",
    color: '#111111',
  },
  timer: {
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 24,
    color: "#ED2552",
    marginTop: 10,
  },
  view1: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 50
  },
  view2: {
    flexDirection: "row",
    alignItems: "center",
  },
  text1: {
    color: "#000000",
    fontWeight: "700",
    fontSize: 28,
  },
  text2: {
    color: "#676767",
    marginRight: 10,
    fontWeight: "500",
    fontSize: 16,
  },
  continueBtn: {
    backgroundColor: COLORS.YELLOW_FF,
    width: '100%',
    height: 50,
  }
});


export default OtpScreen;