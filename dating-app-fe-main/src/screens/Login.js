import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {SCREENS_NAME} from '../navigation/ScreensName';
import Button from '../components/Button';
import {navigate} from '../navigation/NavigationService';
import {SCREEN_WIDTH} from '../common/Constants';
import DButton from '../components/DButton';
import {COLORS} from '../common/Colors';

const Login = () => {
  const handleLogin = () => {
    navigate(SCREENS_NAME.LOGINPAGE);
  };
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/splash.jpg')}
        style={{width: '100%', height: '100%'}}
      />
      <View style={styles.views}>
        <Text style={styles.text2}>Your next date is a touch away</Text>

        <DButton
          label="Login with phone number"
          onPress={handleLogin}
          yellowButton={true}
          additionalStyle={styles.btn}
        />
        <Text style={styles.text1}>
          By signing up, you agree to our Terms. See how we use your date in our
          Privacy Policy
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  text1: {
    color: COLORS.WHITE,
    fontWeight: '500',
    fontSize: 12,
    textAlign: 'center',
  },
  text2: {
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 28,
    color: COLORS.WHITE,
    textAlign: 'center',
  },
  views: {
    position: 'absolute',
    bottom: 50,
    width: SCREEN_WIDTH,
    alignItems: 'center',
    paddingHorizontal: 45,
  },
  btn: {
    width: '100%',
    marginVertical: 20,
  },
});

export default Login;
