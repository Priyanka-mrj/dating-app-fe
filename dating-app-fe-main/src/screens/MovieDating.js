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
import { DATING_TYPE, RESGISTER_TOTAL__COUNT } from "../common/Constants";
import { REGISTER_STATE_KEY_NAMES, setRegisterFormData } from "../redux/slices/registerSlices";
import { goBack, navigate } from "../navigation/NavigationService";

const MovieDating = (props) => {
  const dispatch = useDispatch();

  const [selectedTime, setSelectedTime] = useState({id: 1, value: '30 min'});
  const [coin, setCoin] = useState('')

  const onPressNextButton = () => {
   if(selectedTime && coin.length) {
    dispatch(
      setRegisterFormData({
        keyName: REGISTER_STATE_KEY_NAMES.movieDate,
        value: {
          date_type: DATING_TYPE.MOVIE_DATE,
          time: selectedTime.value,
          coins: coin,
        },
      }),
    );
    navigate(SCREENS_NAME.RESTAURANT_DATING);
   }
   else{
    alert('Please fill time and coins amount')
   }
  };

  const onChangeTime = (item) => {
    setSelectedTime(item);
  };

  const onChangeCoin = (text) => {
    setCoin(text);
  }

  return (
    <LayoutWrapper>
      <ScreenContainer
        onPressBack={goBack}
        isShowStepperCount={true}
        totalCount={RESGISTER_TOTAL__COUNT}
        selectedCount={10}
        onPressNext={onPressNextButton}
        >
        <View style={styles.container}>
          <Dating 
           headingLabel={"Movie Date"}
           subHeading={'The best love stories unfold on movie nights'}
           image={require('../assets/movieDating.png')}
           onChangeTime={onChangeTime}
           onChangeCoin={onChangeCoin}
           selectedTime={selectedTime}
           coin={coin}
          />
        </View>
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

export default MovieDating;