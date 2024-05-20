import React, { useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import moment from 'moment';
import STYLES from '../common/CommonStyles';
import {SCREEN_WIDTH} from '../common/Constants';
import {COLORS} from '../common/Colors';

LocaleConfig.locales['en'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  dayNames: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  today: "Aujourd'hui",
};

LocaleConfig.defaultLocale = 'en';

const DCalendar = (props) => {
  const { 
    onSelectDate = () => {},
    selectedDate = "",
} = props;

  const selectedCalDate = selectedDate ? moment(selectedDate).format('YYYY-MM-DD') : '';
  const currentDate = moment().format('YYYY-MM-DD');

const onChooseDate = (date) => {
  onSelectDate(new Date(date.timestamp).toISOString());
}
  
  return (
    <Calendar
      initialDate={selectedCalDate}
      current={currentDate}
      minDate={currentDate}
      maxDate={'2050-09-30'}
      //monthFormat={monthFormat}
      onDayPress={onChooseDate}
      //onDayLongPress={onChooseDate}
      theme={{
        calendarBackground: '#ffffff',
        arrowColor: '#000000',
        calendarBackground: '#ffffff',
        selectedDayBackgroundColor: COLORS.APP_THEME,
        dayTextColor: COLORS.BLACK,
        todayTextColor: COLORS.DODGE_BLUE,
        weekTextColor: COLORS.BLACK,
        'stylesheet.calendar.header': {
          dayTextAtIndex0: {
            color: COLORS.BLACK,
          },
          dayTextAtIndex0: {
            color: COLORS.BLACK,
          },
          dayTextAtIndex1: {
            color: COLORS.BLACK,
          },
          dayTextAtIndex2: {
            color: COLORS.BLACK,
          },
          dayTextAtIndex3: {
            color: COLORS.BLACK,
          },
          dayTextAtIndex4: {
            color: COLORS.BLACK,
          },
          dayTextAtIndex5: {
            color: COLORS.BLACK,
          },
          dayTextAtIndex6: {
            color: COLORS.BLACK,
          },
          week: {
            margin: 0,
            paddingVertical: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#F5F7FA', 
            color: COLORS.BLACK,
          },
        },
        textDayFontSize: 16,
        textMonthFontSize: 16,
        textDayHeaderFontSize: 16,
      }}
      style={{
        borderWidth: 1,
        height: 'auto',
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderColor: '#E5E7F0',
        borderWidth: 1,
        ...STYLES.shadow,
      }}
      markedDates={{
        [currentDate]: {marked: true},
        [selectedCalDate]: {selected: true, disableTouchEvent: true},
      }}
    />
  );
};

export default React.memo(DCalendar);
