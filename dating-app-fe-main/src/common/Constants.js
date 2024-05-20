import {Dimensions} from 'react-native';

const MIN_HEIGHT = 48;
const MIN_HEIGHT_TEXTINPUT_MULTILINE = 165;
const MAX_LENGTH_TEXTINPUT = 100000;
const BORDER_RADIUS = 8;

const MSG_LABEL = {
  MAX_CHARACTER: 'Max 50 Characters',
};
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const MOBILE_NUMBER_REGULAR_EXP = /^[5-9]\d{9}$/;
const EMAIL_REGULAR_EXP =
  /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

const ASYNC_CONSTANTS = {
  LOGGED_USER: 'LOGGED_USER',
  LOCATION_UPDATE_COUNT: 'LOCATION_UPDATE_COUNT',
};

const TRACKING_TYPE = {
  TRIP: 'trip',
};

const TRACK_TASK_IDS = {
  START_STOP_TRIP_TASK_ID: 'startStopTaskId',
  LOGIN_LOGOUT_TASK_ID: 'loginLogoutTaskId',
};

const INTREST_ICON_MAP = {
  Travelling: '',
  Music: '',
  Cooking: '',
  Bollywood: '',
  Reading: '',
  Coffee: '',
};

const DATING_TYPE = {
  COFFEE_DATE: 'CoffeeDate',
  MOVIE_DATE: 'MovieDate',
  RESTAURANT: 'Restaurant',
  LUNCH_DATE: 'LunchDate'
}

const RESGISTER_TOTAL__COUNT = 12;

const PROFILE_PAGE_ROWS = {
  GET_PREMIUM: 'Get Premium',
  SAVED_PROFILE: 'Saved Profile',
  CALL_HISTORY: 'Call History',
  EDITING_DATING_PLAN: 'Edit dating plan',
  REFER_AND_EARN: 'Refer & Earn',
  HELP_AND_SUPPORT: 'Help & Support',
  LOGOUT: 'Logout'
}

const INTRESTED_IN_MAP = {
  MEN: {label: 'Men', type: 'M'},
  WOMEN: {label: 'Women', type: 'F'},
};

const FILTER_PROPERTIES = {
  interestedIn: { key: 'interestedIn', label: 'Gender' },
  location: { key: 'location', label: "Location" },
  age: { key: 'age', label: 'Age' },
  distance: { key: 'distance', label: 'Distance' },
  language: { key: 'language', label: 'Language' }
}

const TOAST_TYPE = {
  SUCESS: 'success',
  DANGER: 'danger',
  NORMAL: 'normal'
}

const DATING_TIME = [
  {id: 1, value: '30 min'},
  {id: 2, value: '45 min'},
  {id: 3, value: '60 min'},
  {id: 4, value: '90 min'},
  {id: 5, value: '150 min'},
]

const ACCESS_TOKEN_EXPIRED_STRING = 'Access token is expired';

const ZODIAC_DROPDOWN_DATA = [
  {id: "Aries" , name: "Aries"},
  {id: "Taurus" , name: "Taurus"},
  {id: "Gemini" , name: "Gemini"},
  {id: "Cancer" , name: "Cancer"},
  {id: "Leo" , name: "Leo"},
  {id: "Virgo" , name: "Virgo"},
  {id: "Libra" , name: "Libra"},
  {id: "Scorpio" , name: "Scorpio"},
  {id: "Sagittarius" , name: "Sagittarius"},
  {id: "Capricorn" , name: "Capricorn"},
  {id: "Aquarius" , name: "Aquarius"},
  {id: "Pisces" , name: "Pisces"},
]

const HEIGHT_DROPDOWN_DATA = [
  {id: '120 cm', name: '120 cm'},
  {id: '121 cm', name: '121 cm'},
  {id: '122 cm', name: '122 cm'},
  {id: '123 cm', name: '123 cm'},
  {id: '124 cm', name: '124 cm'},
  {id: '125 cm', name: '125 cm'},
  {id: '126 cm', name: '126 cm'},
  {id: '127 cm', name: '127 cm'},
  {id: '128 cm', name: '128 cm'},
  {id: '129 cm', name: '129 cm'},
  {id: '130 cm', name: '130 cm'},
  {id: '131 cm', name: '131 cm'},
  {id: '132 cm', name: '132 cm'},
  {id: '133 cm', name: '133 cm'},
  {id: '134 cm', name: '134 cm'},
  {id: '135 cm', name: '135 cm'},
  {id: '136 cm', name: '136 cm'},
  {id: '137 cm', name: '137 cm'},
  {id: '138 cm', name: '138 cm'},
  {id: '139 cm', name: '139 cm'},
  {id: '140 cm', name: '140 cm'},
  {id: '141 cm', name: '141 cm'},
  {id: '142 cm', name: '142 cm'},
  {id: '143 cm', name: '143 cm'},
  {id: '144 cm', name: '144 cm'},
  {id: '145 cm', name: '145 cm'},
  {id: '146 cm', name: '146 cm'},
  {id: '147 cm', name: '147 cm'},
  {id: '148 cm', name: '148 cm'},
  {id: '149 cm', name: '149 cm'},
  {id: '150 cm', name: '150 cm'},
  {id: '151 cm', name: '151 cm'},
  {id: '152 cm', name: '152 cm'},
  {id: '153 cm', name: '153 cm'},
  {id: '154 cm', name: '154 cm'},
  {id: '155 cm', name: '155 cm'},
  {id: '156 cm', name: '156 cm'},
  {id: '157 cm', name: '157 cm'},
  {id: '158 cm', name: '158 cm'},
  {id: '159 cm', name: '159 cm'},
  {id: '160 cm', name: '160 cm'},
  {id: '161 cm', name: '161 cm'},
  {id: '162 cm', name: '162 cm'},
  {id: '163 cm', name: '163 cm'},
  {id: '164 cm', name: '164 cm'},
  {id: '165 cm', name: '165 cm'},
  {id: '166 cm', name: '166 cm'},
  {id: '167 cm', name: '167 cm'},
  {id: '168 cm', name: '168 cm'},
  {id: '169 cm', name: '169 cm'},
  {id: '170 cm', name: '170 cm'},
  {id: '171 cm', name: '171 cm'},
  {id: '172 cm', name: '172 cm'},
  {id: '173 cm', name: '173 cm'},
  {id: '174 cm', name: '174 cm'},
  {id: '175 cm', name: '175 cm'},
  {id: '176 cm', name: '176 cm'},
  {id: '177 cm', name: '177 cm'},
  {id: '178 cm', name: '178 cm'},
  {id: '179 cm', name: '179 cm'},
  {id: '180 cm', name: '180 cm'},
];

const WORKOUT_TYPE_MAP = {
  '1': "Active",
  '2': "Sometimes",
  '3': 'Almost never'
}

const WORKOUT_DROPDOWN_DATA = [
  {id: '1', name: 'Active'},
  {id: '2', name: 'Sometimes'},
  {id: '3', name: 'Almost never'},
];

const DRINKING_DROPDOWN_DATA = [
  {id: 'Frequently', name: 'Frequently'},
  {id: 'Socially', name: 'Socially'},
  {id: 'Rarely', name: 'Rarely'},
  {id: 'Never', name: 'Never'},
  {id: 'Sober', name: 'Sober'},
];

const SMOKING_DROPDOWN_DATA = [
  {id: 'Socially', name: 'Socially'},
  {id: 'Never', name: 'Never'},
  {id: 'Regularly', name: 'Regularly'},
];

const EDUCATION_DROPDOWN_DATA = [
  {id: "Bachelor's degree", name: "Bachelor's degree"},
  {id: "Master's degree", name: "Master's degree"},
  {id: "Doctorate or higher", name: "Doctorate or higher"},
]

const LOOKINGFOR_DROPDOWN_DATA = [
  {id: "Relationship", name: "Relationship"},
  {id: "Something casual", name: "Something casual"},
  {id: "Don't know yet", name: "Don't know yet"},
  {id: "Marriage", name: "Marriage"},
]

const WORK_DROPDOWN_DATA =[
  {id: "IT Profession", name: "IT Profession"},
  {id: "Business", name: "Business"},
  {id: "Govt. Employee", name: "Govt. Employee"},
  // {id: "Farming", name: "Marriage"},
]


const TRANSACTION_TYPE = {
  DEBIT: 'debit',
  CREDIT: 'credit'
}

const ERROR_CODE = {
  _101: '101',
  _102: '102',
  _103: '103',
  _104: '104',
  _105: '105',
  _106: '106',
  _107: '107',
  _108: '108',
  _109: '109',
  _110: '110',
  _111: '111',
  _112: '112',
  _113: '113',
  _114: '114',
  _115: '115',
  _116: '116',
  _117: '117',
  _118: '118',
  _119: '119',
  _120: '120',
  _121: '121',
  _122: '122',
  _123: '123',
  _124: '124',
  _125: '125',
  _126: '126',
  _127: '127',
  _128: '128',
  _129: '129',
  _130: '130',
  _131: '131',
  _132: '132',
  _133: '133',
  _134: '134',
  _135: '135',
  _136: '136',
  _137: '137',
  _138: '138',
  _139: '139',
  _140: '140',
  _141: '141',
  _142: '142',
  _143: '143',
  _144: '144',
  _145: '145',
  _146: '146',
  _147: '147',
  _148: '148',
  _149: '149',
  _150: '150',
}

const SOCKET_URL = 'ws://3.17.184.23/ws/chat/';

export {
  MIN_HEIGHT,
  MIN_HEIGHT_TEXTINPUT_MULTILINE,
  MAX_LENGTH_TEXTINPUT,
  BORDER_RADIUS,
  MSG_LABEL,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  MOBILE_NUMBER_REGULAR_EXP,
  EMAIL_REGULAR_EXP,
  ASYNC_CONSTANTS,
  TRACKING_TYPE,
  TRACK_TASK_IDS,
  DATING_TYPE,
  RESGISTER_TOTAL__COUNT,
  ERROR_CODE,
  PROFILE_PAGE_ROWS,
  INTRESTED_IN_MAP,
  FILTER_PROPERTIES,
  TOAST_TYPE,
  DATING_TIME,
  SOCKET_URL,
  ACCESS_TOKEN_EXPIRED_STRING,
  ZODIAC_DROPDOWN_DATA,
  TRANSACTION_TYPE,
  HEIGHT_DROPDOWN_DATA,
  WORKOUT_DROPDOWN_DATA,
  DRINKING_DROPDOWN_DATA,
  SMOKING_DROPDOWN_DATA,
  EDUCATION_DROPDOWN_DATA,
  LOOKINGFOR_DROPDOWN_DATA,
  WORKOUT_TYPE_MAP,
  WORK_DROPDOWN_DATA
};
