import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
} from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { SCREENS_NAME } from "../navigation/ScreensName";
import ScreenContainer from "../components/ScreenContainer";
import { LayoutWrapper } from "../components/layoutWrapper/LayoutWrapper";
import { COLORS } from "../common/Colors";
import Dating from "../components/Dating";
import { DATING_TYPE, ERROR_CODE, RESGISTER_TOTAL__COUNT } from "../common/Constants";
import { REGISTER_STATE_KEY_NAMES, setRegisterFormData } from "../redux/slices/registerSlices";
import DButton from "../components/DButton";
import { registrationRequestSaga } from "../redux/saga/SagaActions";
import { goBack } from "../navigation/NavigationService";

const LunchDating = (props) => {
  const dispatch = useDispatch();

  const {registerFormData, isLoading} = useSelector((state) => state.registerReducer);
  const phnumber = useSelector((state) => state?.datingAppReducer?.phnumber);

  const [selectedTime, setSelectedTime] = useState({id: 1, value: '30 min'});
  const [coin, setCoin] = useState('');

  const validateFormData = () => {
    let valid = [];
    Object.keys(registerFormData).forEach((keyName) => {
        if(registerFormData[keyName] === null) {
            valid.push(keyName);
        }
    });
    return valid;
  }

  const prepareFormData = () => {
    let dates = [];
    dates.push(registerFormData.coffeeDate);
    dates.push(registerFormData.movieDate);
    dates.push(registerFormData.restaurantDate);
    dates.push(registerFormData.lunchDate);
    let formdata = new FormData();
    formdata.append('mobile_no', phnumber);
    formdata.append('name', registerFormData?.name);
    formdata.append('dob', registerFormData?.dob);
    formdata.append('gender', registerFormData?.gender);
    formdata.append('height', registerFormData?.height);
    formdata.append('language', JSON.stringify(registerFormData.language));
    formdata.append('belief', JSON.stringify(registerFormData.belief));
    formdata.append('interest', JSON.stringify(registerFormData.interest));
    formdata.append('date_choice', JSON.stringify(dates));
    formdata.append('profile_pic_1', registerFormData?.profilePics?.[0], registerFormData?.profilePics?.[0]?.name);
    formdata.append('profile_pic_2', registerFormData?.profilePics?.[1], registerFormData?.profilePics?.[1]?.name);
    formdata.append('profile_pic_3', registerFormData?.profilePics?.[2], registerFormData?.profilePics?.[2]?.name);
    return formdata;
  };

  const onPressRegister = () => {
    if (!validateFormData().length) {
      try {
        const payload = prepareFormData();
                const response = dispatch(registrationRequestSaga(payload));
      } catch (error) {
        alert(`Error Code: ${ERROR_CODE._106} - ${error.message}`);
      }
    } else {
      alert('Please fill time and coins amount');
    }
  };

  useEffect(() => {
    dispatch(
        setRegisterFormData({
          keyName: REGISTER_STATE_KEY_NAMES.lunchDate,
          value: {
            date_type: DATING_TYPE.LUNCH_DATE,
            time: selectedTime.value,
            coins: coin,
          },
        }),
      );
    }, [dispatch, selectedTime,  coin]);

  const onChangeTime = (item) => {
    setSelectedTime(item);
  };

  onChangeCoin = (text) => {
    setCoin(text);
  }

  return (
    <LayoutWrapper loading={isLoading}>
      <ScreenContainer
        onPressBack={goBack}
        isShowStepperCount={false}
        totalCount={RESGISTER_TOTAL__COUNT}
        selectedCount={12}
        //onPressNext={onPressNextButton}
        >
        <View style={styles.container}>
          <Dating
            headingLabel={'Lunch Date'}
            subHeading={'Cheers to the perfect lunch date!'}
            image={require('../assets/lunchDating.png')}
            onChangeTime={onChangeTime}
            onChangeCoin={onChangeCoin}
            selectedTime={selectedTime}
            coin={coin}
          />
        </View>
        <DButton
          label="Register"
          onPress={onPressRegister}
          yellowButton={true}
          additionalStyle={{margin: 20}}
        />
      </ScreenContainer>
    </LayoutWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 20,
  },
  text2: {
    color: COLORS.BLACK,
    fontWeight: '700',
    fontSize: 28,
    textAlign: 'center'
  }
});

export default LunchDating;