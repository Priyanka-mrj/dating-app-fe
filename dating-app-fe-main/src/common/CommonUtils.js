import PlaneSvg from '../assets/plane.svg';
import MusicSvg from '../assets/music.svg';
import ReadingSvg from '../assets/open-book.svg';
import VieoSvg from '../assets/video.svg';
import CoffeSvg from '../assets/coffee-cup.svg';
import CookingSvg from '../assets/cooking.svg';
import {Toast} from "react-native-toast-notifications";
import { COLORS } from './Colors';
import { DATING_TYPE } from './Constants';
import moment from 'moment';

const INTREST_ICON_MAP = {
  TRAVELING: 'Travelling',
  MUSIC: 'Music',
  COOCKING: 'Cooking',
  BOLLYWOOD: 'Bollywood',
  READING: 'Reading',
  COFFE: 'Coffee',
};

const getIntrestIcon = intrestName => {
  let icon = null;
  if (!intrestName) return null;

  switch (intrestName) {
    case INTREST_ICON_MAP.TRAVELING:
      icon = <PlaneSvg />;
      break;

    case INTREST_ICON_MAP.MUSIC:
      icon = <MusicSvg />;
      break;
    case INTREST_ICON_MAP.COOCKING:
      icon = <CookingSvg />;
      break;

    case INTREST_ICON_MAP.COFFE:
      icon = <CoffeSvg />;
      break;

    case INTREST_ICON_MAP.BOLLYWOOD:
      icon = <VieoSvg />;
      break;

    case INTREST_ICON_MAP.READING:
      icon = <ReadingSvg />;
      break;
  }
  return icon;
};

const showToast = (erorCode, msg, options = {}) => {
    let message = typeof msg === "string" ? msg : msg ? JSON.stringify(msg) : 'Something went wrong!';
    if(erorCode) {
      message = `${erorCode}: ${message}`;
    }
    Toast.show(message, options);
}

const removeElementFromArray = (array, element) => {
  if(!array || !element ) return [];

  const index = array.indexOf(element);
  if (index > -1) {
    array.splice(index, 1);
  }
  return array;
}

const getDatingLabel = (datingtype) => {
  if(!datingtype) return null;
  if(datingtype === DATING_TYPE.COFFEE_DATE) {
    return {
      datingLabel: 'Coffee Date',
    }
  }
  else if(datingtype === DATING_TYPE.MOVIE_DATE) {
    return {
      datingLabel: 'Movie Date',
    }
  }
  else if(datingtype === DATING_TYPE.RESTAURANT) {
    return {
      datingLabel: 'Restaurant',
    }
  }
  else {
    return {
      datingLabel: 'Lunch Date',
    }
  }
}

const getDatingLabelAndImage = (datingtype) => {
  if(!datingtype) return null;

  if(datingtype === DATING_TYPE.COFFEE_DATE) {
    return {
      ...getDatingLabel(datingtype),
      datingImage: require('../assets/coffeeDate.png')
    }
  }
  else if(datingtype === DATING_TYPE.MOVIE_DATE) {
    return {
      ...getDatingLabel(datingtype),
      datingImage: require('../assets/movieDate.png')
    }
  }
  else if(datingtype === DATING_TYPE.RESTAURANT) {
    return {
      ...getDatingLabel(datingtype),
      datingImage: require('../assets/restaurantDate.png')
    }
  }
  else {
    return {
      ...getDatingLabel(datingtype),
      datingImage: require('../assets/lunchDate.png')
    }
  }
};

const convertTimeObjToString = (timeObj) => {
  if(!timeObj || !Object.keys(timeObj).length) return "";

  const hour = timeObj.hour.toString().length === 2 ? timeObj.hour.toString() : `0${timeObj.hour}`;
  const min =  timeObj.min.toString().length === 2 ? timeObj.min.toString() : `0${timeObj.min}`;
  const amPm = timeObj.isAm ? "am" : "pm";
  let timeStr = `${hour}:${min} ${amPm}`;
  console.log('timeStr ====> ', timeStr);
  return timeStr;
}

const randomString = () => (Math.random() + 1).toString(36).substring(3);

const formatToFeetAndInches = (numericValue) => {
  if (numericValue.length === 1) {
    return numericValue;
  } else if (numericValue.length === 2) {
    return `${numericValue[0]}'${numericValue[1]}"`;
  } else if (numericValue.length > 2) {
    const feet = numericValue.slice(0, -2);
    const inches = numericValue.slice(-2);
    return `${feet}'${inches}"`;
  } else {
    return "";
  }
};

const calculateProfileCompletePercentage = (profileDetails) => {
  if(!profileDetails) return 0;
  
  const completeCriteriaKeys = [
    'work',
    'education',
    'gender',
    'location',
    'hometown',
    'height',
    'education_level',
    'drinking',
    'smoking',
    'looking_for',
    'zodiac',
    'about',
    'belief',
    'date_choice',
    'interest',
    'language',
    'profile_pic_1',
    'profile_pic_2',
    'profile_pic_3',
  ];
  const eachPercent = 100 / (completeCriteriaKeys.length);
  let percentageCount = 0;
  Object.keys(profileDetails).map(key =>{
    if(completeCriteriaKeys.includes(key) && profileDetails[key] && profileDetails[key].length){
      percentageCount = percentageCount + eachPercent;
    }
  })
  return parseInt(percentageCount);
}

const parseJsonString = (string) => {
  try {
    return JSON.parse(string);
  }
  catch(er) {
    return null;
  }
}

const clockify = (secondsLeft) => {
  if(!secondsLeft) return null;

  const hours = Math.floor(secondsLeft / 60 / 60)
  const mins = Math.floor((secondsLeft / 60) % 60)
  const seconds = Math.floor(secondsLeft % 60)
  return {
    displayHours: hours < 10 ? `0${hours}` : hours,
    displayMins: mins < 10 ? `0${mins}` : mins,
    displaySecs: seconds < 10 ? `0${seconds}` : seconds,
  }
}

const getTotalSecondsUntilFutureDate = (futureDate) => {
  const currentDate = new Date();
  const futureDateTime = futureDate ? new Date(futureDate).getTime() : new Date().getTime();
  const currentDateTime = currentDate.getTime();
  const timeDifference = futureDateTime - currentDateTime;
  const totalSeconds = (Math.floor(timeDifference / 1000)) + 3600;
  return totalSeconds;
};

const updateArrayOfObjectById = (array, updatedItem, keyName) => {
  if (!array || !updatedItem || !keyName) return [];

  return array.map(obj => {
      if (obj[keyName] === updatedItem[keyName]) {
          return { ...obj, ...updatedItem };
      } else {
          return obj;
      }
  });
}

const getDateLabel = date => {
  if (!date) return '';

  const today = moment().startOf('day');
  const yesterday = moment().subtract(1, 'day').startOf('day');
  const targetDate = moment(date).startOf('day');

  if (targetDate.isSame(today, 'd')) {
    return targetDate.format('hh:mm a');
  } 
  else if (targetDate.isSame(yesterday, 'd')) {
    return 'Yesterday';
  } 
  else {
    return targetDate.format('DD/MM/YYYY');
  }
};

export {
    getDatingLabel,
    getIntrestIcon,
    showToast,
    removeElementFromArray,
    getDatingLabelAndImage,
    convertTimeObjToString,
    randomString,
    formatToFeetAndInches,
    calculateProfileCompletePercentage,
    parseJsonString,
    clockify,
    getTotalSecondsUntilFutureDate,
    updateArrayOfObjectById,
    getDateLabel
}
