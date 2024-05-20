import React, {useState} from 'react';
import {Image, StyleSheet, View, Text, PermissionsAndroid} from 'react-native';
import {SCREENS_NAME} from '../navigation/ScreensName';
import Geolocation from 'react-native-geolocation-service';
import ScreenContainer from '../components/ScreenContainer';
import DButton from '../components/DButton';
import { COLORS } from '../common/Colors';
import { goBack, navigate } from '../navigation/NavigationService';

const LocationScreen = () => {
  const [locationCapturePreference, setLocationCapturePreference] =
    useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  console.log('###currentLocation', currentLocation, locationCapturePreference);

  const handleWhileUsingApp = async () => {
    setLocationCapturePreference('whileUsingApp');

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'App needs access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            setCurrentLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            navigate(SCREENS_NAME.USERNAME);
          },
          error => {
            console.log('Error getting current location:', error);
            setCurrentLocation(null);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      } else {
        console.log('Location permission denied');
        setCurrentLocation(null);
      }
    } catch (error) {
      console.log('Error requesting location permission:', error);
      setCurrentLocation(null);
    }
  };

  return (
    <ScreenContainer onPressBack={goBack}>
      <View style={styles.view1}>
        <Image
          source={require('../assets/Locationpageimage.jpg')}
          style={{width: 300, height: 200}}
        />
        <View style={styles.rectangleBox}>
          <Text style={styles.textinput}>{`Set you location services`}</Text>
          <Text style={styles.text}>{'We use your location to show you potential matches in your area.'}</Text>
          <DButton
            label="Set location services"
            onPress={handleWhileUsingApp}
            yellowButton={true}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: COLORS.WHITE,
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 30
  },
  textinput: {
    color: 'white',
    fontWeight: '700',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 30
  },
  rectangleBox: {
    width: '100%',
    height: '55%',
    backgroundColor: '#ED2552',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    justifyContent: 'center',
    paddingHorizontal: 40
  },
  view1: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,

  },
  image: {
    width: 120,
    height: 120,
  },
  text2: {
    color: '#000000',
    fontWeight: '400',
    fontSize: 14,
  },
  image2: {
    width: 120,
    height: 120,
  },
  text3: {
    color: '#000000',
    fontWeight: '400',
    fontSize: 14,
  },
  image3: {
    width: 32,
    height: 37,
  },
  text4: {
    color: '#000000',
    fontWeight: '500',
    fontSize: 18,
    marginBottom: 180,
  },
  text5: {
    color: '#1B71E8',
    fontWeight: '400',
    fontSize: 14,
  },
});

export default LocationScreen;
