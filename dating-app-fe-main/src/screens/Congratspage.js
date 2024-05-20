import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../common/Colors";
import NextButtonSvg from '../assets/nextButton.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from "../redux/slices/loginSlices";

export default function Congrates() {
  const disatch = useDispatch();
  const {registrationSucess} = useSelector((state) => state.registerReducer);

  const onPressNextButton = () => {
    disatch(setLogin({access_token: registrationSucess?.access_token}));
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/welcome.jpg')} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.congratulationText}>{'Congratulations'}</Text>
        <Text style={styles.subHeadingText}>{'Your profile is set!'}</Text>
        <Text
          style={
            styles.desc
          }>{`Start connecting and enjoy \n the experience!`}</Text>
      </View>
      <TouchableOpacity onPress={onPressNextButton} style={styles.nextBtn}>
        <NextButtonSvg />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: 'relative'
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    position: 'absolute',
    top: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  congratulationText: {
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 32,
    color: COLORS.YELLOW_FF,
    marginBottom: 5
  },
  subHeadingText: {
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 24,
    color: COLORS.WHITE,
  },
  desc: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 12,
    color: COLORS.WHITE,
    textAlign: 'center'
  },
  nextBtn: {
    position: 'absolute',
    bottom: 40,
    right: 40
  }
});
