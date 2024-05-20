/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Image } from 'react-native';
import { InputToolbar, Actions, Composer, Send } from 'react-native-gifted-chat';
import { Icon } from 'react-native-elements';
import { COLORS } from '../../common/Colors';

export const renderInputToolbar = (props) => (
  <InputToolbar
    {...props}
    containerStyle={{
      backgroundColor: COLORS.WHITE,
      paddingVertical: 5,
      borderTopWidth: 0,
    }}
    primaryStyle={{ alignItems: 'center', justifyContent:'center', }}
  />
);

export const renderActions = (props) => (
  <Actions
    {...props}
    containerStyle={{
      width: 44,
      height: 44,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 4,
      marginRight: 4,
      marginBottom: 0,
    }}
    icon={() => (
      <Image
        style={{ width: 32, height: 32 }}
        source={{
          uri: 'https://placeimg.com/32/32/any',
        }}
      />
    )}
    options={{
      'Choose From Library': () => {
        console.log('Choose From Library');
      },
      Cancel: () => {
        console.log('Cancel');
      },
    }}
    optionTintColor="#222B45"
  />
);

export const renderComposer = (props) => (
  <Composer
    {...props}
    textInputStyle={{
      color: COLORS.BLACK,
      backgroundColor: COLORS.GRAY_EEE,
      borderRadius: 8,
      paddingHorizontal: 10
    }}
  />
);

export const renderSend = props => (
  <Send
    {...props}
    disabled={!props.text}
    containerStyle={{
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 10,
      backgroundColor: COLORS.APP_THEME,
      borderRadius: 40
    }}>
    <Icon name="send" type="material" color={COLORS.WHITE} />
  </Send>
);