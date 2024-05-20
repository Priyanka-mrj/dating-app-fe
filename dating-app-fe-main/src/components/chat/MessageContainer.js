import React from 'react';
import { View, Text } from 'react-native';
import { Avatar, Bubble, SystemMessage, Message, MessageText, Time} from 'react-native-gifted-chat';
import { COLORS } from '../../common/Colors';
import { Loader } from '../Loader';
import moment from 'moment';

const renderAvatar = (props) => (
  <Avatar
    {...props}
    containerStyle={{ left: { borderWidth: 3, borderColor: 'red' }, right: {} }}
    imageStyle={{ left: { borderWidth: 3, borderColor: 'blue' }, right: {} }}
  />
);

const renderLoading = (props) => {
    return (
        <Loader />
    )
}

const renderTime = (props) => {
    return (
      <Time
      {...props}
        timeTextStyle={{
          left: {
            color: COLORS.BLACK,
          },
          right: {
            color: COLORS.WHITE,
          },
        }}
      />
    );
  };

const renderBubble = props => {
  return (
    <Bubble
      {...props}
      renderTime={renderTime}
      containerStyle={{
        left: {},
        right: {},
      }}
      wrapperStyle={{
        left: {backgroundColor: COLORS.YELLOW_FF},
        right: {backgroundColor: COLORS.APP_THEME},
      }}
      bottomContainerStyle={{
        left: {},
        right: {},
      }}
      tickStyle={{}}
      containerToNextStyle={{
        left: {},
        right: {},
      }}
    />
  );
};


const renderMessage = props => {
  return (
    <Message
      {...props}
      renderDay={() => <Text style={{color: COLORS.BLACK}}>Date</Text>}
    />
  );
};

const renderMessageText = props => {
  return (
    <MessageText
      {...props}
      containerStyle={{
        left: {backgroundColor: COLORS.WHITE, borderRadius: 15},
        right: {backgroundColor: COLORS.APP_THEME, borderRadius: 15},
        backgroundColor: COLORS.APP_THEME
      }}
      textStyle={{
        left: {color: COLORS.BLACK},
        right: {color: COLORS.WHITE},
      }}
      linkStyle={{
        left: {color: 'orange'},
        right: {color: 'orange'},
      }}
      customTextStyle={{fontSize: 14}}
    />
  );
};

export {
    renderMessage,
    renderBubble,
    renderMessageText,
    renderAvatar,
    renderLoading
}