import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';
import {useDispatch} from 'react-redux';
import BackIcon from '../components/BackIcon';
import DCalendar from '../components/DCalendar';
import DTimePicker from '../components/DTimePicker';
import DButton from '../components/DButton';
import DCheckBox from '../components/DCheckBox';
import { convertTimeObjToString } from '../common/CommonUtils';
import { SCREEN_WIDTH } from '../common/Constants';
import STYLES from '../common/CommonStyles'
import { COLORS } from '../common/Colors';
import { goBack, navigate } from '../navigation/NavigationService';
import moment from 'moment';
import {useSelector} from 'react-redux'
import { getVenueList, sendDateRequest, updateDateRequest } from '../services/DatingService';
import { LayoutWrapper } from '../components/layoutWrapper/LayoutWrapper';
import { SCREENS_NAME } from '../navigation/ScreensName';

const DatingDetails = (props) => {

  const {datingDetails = {}, selectedDateChoice = null, isEditCall = false } = props.route?.params;

  const {userData, loggedInUserProfile} = useSelector(state => state.loginReducer);
  const {access_token} = userData || {access_token: null};

  const defaultHour = parseInt(datingDetails?.requested_time?.split(":")?.[0]) || 12;
  const defaultMin = parseInt(datingDetails?.requested_time?.split(":")?.[1]) || 0;
  const defautIsAM = !!datingDetails?.requested_time?.toUpperCase()?.includes("AM");

  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(datingDetails?.requested_date || ""); // string type
  const [selectedVenue, setSelectedVenue] = useState(datingDetails?.venue?.id || null); // array type
  const [selectedTime, setSelectedTime] = useState({hour: defaultHour, min: defaultMin, isAm: defautIsAM});
  const [allVenue, setAllVenue] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const timePickerRef = useRef();

  const fetchAllVenue = async () => {
    setLoading(true);
    const data = await getVenueList(access_token);
    setAllVenue(data);
    setLoading(false)
  }

  useEffect(() => {
    fetchAllVenue();
  },[])

  const onSelectDate = useCallback((date) => {
    setSelectedDate(date);
  },[])

  const onSelectVenue = (venueId) => {
    setSelectedVenue(venueId);
  }

  const onPressCancel = () => {

  };

  const sendNewRequest = async () => {
    setLoading(true);
    const timeStr = convertTimeObjToString(selectedTime);
    const dateChoice = datingDetails?.date_choice?.find(item => item.date_type === selectedDateChoice);
    const params = {
      requested_user: datingDetails?.id,
      requested_date: moment(selectedDate).format('YYYY-MM-DD'),
      requested_time: timeStr,
      date_choice: dateChoice?.id,
      venue: selectedVenue,
    };
    const isSuccess = await sendDateRequest(params, access_token);
    setLoading(false);
    if(isSuccess){
      navigate(SCREENS_NAME.HOMEPAGE)
    }
  }

  const updateExistingDateRequest = async () => {
    setLoading(true);
    const timeStr = convertTimeObjToString(selectedTime);
    const params = {
      id: datingDetails?.id,
      requested_date: moment(selectedDate).format('YYYY-MM-DD'),
      requested_time: timeStr,
      venue: selectedVenue,
    };
    const isSuccess = await updateDateRequest(params, access_token);
    setLoading(false);
    if(isSuccess){
      goBack();
    }
  }

  const onPressSubmit = () => {
    if(isEditCall) {
      updateExistingDateRequest();
    }
    else {
      sendNewRequest();
    }
  }

  const onChangeTime = useCallback((value, timeFieldName) => {
    setSelectedTime(previousTime => {
      return {
        ...previousTime,
        [timeFieldName]: value
      }
    });
  }, []);

  const checkEnabled = () => {
    return selectedVenue && selectedDate;
  };

  const _renderContent = () => {
    return (
      <View style={styles.datecontainer}>
        <ScrollView>
          <View style={{paddingHorizontal: 30}}>
            <Text style={styles.headingText}>Dates</Text>
            <DCalendar
              onSelectDate={onSelectDate}
              selectedDate={selectedDate}
            />
            <Text style={[styles.headingText, {marginTop: 25}]}>Time</Text>
            <DTimePicker
              selectedTime={selectedTime}
              onChangeTime={onChangeTime}
            />
            <Text style={[styles.headingText, {marginTop: 25}]}>Venue</Text>
            <>
              {allVenue.map((item, index) => (
                <View key={item.id}>
                  <View style={styles.outerRectangle}>
                    <View style={styles.innerRectangle}>
                      <Text style={styles.text}>{item.venue_name}</Text>
                      <DCheckBox
                        isChecked={selectedVenue === item.id}
                        onPressCheckBox={() => onSelectVenue(item.id)}
                      />
                    </View>
                  </View>
                </View>
              ))}
            </>
          </View>
        </ScrollView>
        <View style={styles.btnContainer}>
          <DButton
            isTransparent={true}
            label={'Cancel'}
            onPress={onPressCancel}
            additionalStyle={{width: '42%', paddingVertical: 12}}
          />
          <DButton
            isTransparent={false}
            label={isEditCall ? "Save" : 'Send Request'}
            isEnable={checkEnabled()}
            onPress={onPressSubmit}
            additionalStyle={{width: '42%', paddingVertical: 12}}
          />
        </View>
      </View>
    );
  };
  
  return (
    <LayoutWrapper loading={isLoading} isHeader={true} onPressBack={goBack}>
      {_renderContent()}
    </LayoutWrapper>
  );
};

const styles = {
    datecontainer: {
      flex: 1,
      backgroundColor: '#fff',
    },
    headingText: {
      color: COLORS.BLACK,
      fontWeight: '700',
      fontSize: 20,
      marginBottom: 10,
    },
    outerRectangle: {
      borderRadius: 10,
      borderColor: '#ED2552',
      backgroundColor: '#ED2552',
      alignItems: 'center',
      marginBottom: 20,
      alignItems: 'flex-end',
    },
    innerRectangle: {
      ...STYLES.shadow,
      backgroundColor: '#FFFFFF',
      borderColor: '#E5E7F0',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      paddingVertical: 20,
      paddingHorizontal: 10,
      width: '95%',
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
    },
    text: {
      color: '#000000',
      fontSize: 18,
      fontWeight: 500,
    },
    btnContainer: {
      flexDirection: 'row',
      paddingVertical: 15,
      justifyContent: 'space-between',
      paddingHorizontal: 30
    },
  };

export default DatingDetails;
