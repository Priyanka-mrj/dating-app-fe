import React, {useEffect, useState, useCallback, useRef} from 'react';
import {StyleSheet, View, FlatList, Text, Pressable, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {SCREENS_NAME} from '../../../navigation/ScreensName';
import {LayoutWrapper} from '../../../components/layoutWrapper/LayoutWrapper';
import {COLORS} from '../../../common/Colors';
import {goBack, navigate} from '../../../navigation/NavigationService';
import {getSavedUserProfile} from '../../../services/profileServices';
import STYLES from '../../../common/CommonStyles';
import {Avatar, Badge, SearchBar} from 'react-native-elements';
import { Header } from '../../../components/Header';
import CallSvg from '../../../assets/CallBlack.svg';
import MoreSvg from '../../../assets/More.svg';
import { GiftedChat } from 'react-native-gifted-chat';
import { SOCKET_URL } from '../../../common/Constants';
import { renderInputToolbar, renderComposer, renderSend } from '../../../components/chat/InputToolbar';
import {
  renderBubble,
} from '../../../components/chat/MessageContainer';
import { parseJsonString, randomString, showToast } from '../../../common/CommonUtils';
import wss from '../../../services/WebSocketService';


const PersonalChat = props => {
  const {userDetail} = props?.route?.params;

  const dispatch = useDispatch();

  const {userData, loggedInUserProfile} = useSelector(state => state.loginReducer);
  const {access_token} = userData || {access_token: null};

  const [isLoading, setLoading] = useState(true);
  const [chatList, setChatList] = useState([]);
  const [text, setText] = useState('');


  const onPressCall = () => {
    // navigate(SCREENS_NAME.CALL_SCREEN, {userDetail});
  };

  const onPressMore = () => {};

  const prepareChat = (message) => {
    setLoading(false);
    if (!message) return;

    const msg = parseJsonString(message);
    if (Array.isArray(msg?.default_messages)) {
      const data = msg?.default_messages?.map((msgObj, index) => {
        const user = msgObj?.sender_id == loggedInUserProfile?.id ? {} : {_id: userDetail?.id};
        return {
          text: msgObj.message,
          _id: randomString(),
          user,
          createdAt: msgObj?.date_time,
        };
      });
      const updateChatList = [...chatList, ...data].reverse();
      setChatList(updateChatList);
      setLoading(false);
    } 
    else if(msg?.sender_id != loggedInUserProfile?.id){
        const newMsg = {
          text: msg.message,
          _id: randomString(),
          user: {_id: userDetail?.id},
          createdAt: msg?.date_time,
        };
        setChatList(previousChat => GiftedChat.append(previousChat, newMsg));
      }
  }

  useEffect(() => {
    wss.connect(userDetail.id, access_token, prepareChat);

    return () => {
      wss.close();
    };
  }, []);

  const onSend = useCallback(newMessages => {
    if(wss.isConnected) {
      const msgObj = newMessages[0];
      const message = {id: msgObj?.user?._id, message: msgObj?.text};
      wss.send(message);
      const newMsg = [
        {
          text: msgObj?.text,
          _id: randomString(),
          user: {
            _id: msgObj?.user?._id,
          },
          createdAt: msgObj?.createdAt,
        },
      ];
      setChatList(previousChat => GiftedChat.append(previousChat, newMsg));
    }
    else {
      showToast(ERROR_CODE._140, "Web socket dissconnected !!");
    }

  }, []);

  const onChangeText = useCallback(text => {
    setText(text);
  }, []);

  return (
    <LayoutWrapper loading={isLoading}>
      <ChatHeader
        userDetail={userDetail}
        onPressCall={onPressCall}
        onPressMore={onPressMore}
      />
      <GiftedChat
        messages={chatList}
        text={text}
        onInputTextChanged={onChangeText}
        placeholder={"Message..."}
        onSend={onSend}
        alignTop
        alwaysShowSend
        scrollToBottom
        renderInputToolbar={renderInputToolbar}
        renderComposer={renderComposer}
        renderSend={renderSend}
        renderAvatar={null}
        renderBubble={renderBubble}
        messagesContainerStyle={{backgroundColor: COLORS.WHITE}}
        parsePatterns={linkStyle => [
          {
            pattern: /#(\w+)/,
            style: linkStyle,
            onPress: tag => console.log(`Pressed on hashtag: ${tag}`),
          },
        ]}
      />
    </LayoutWrapper>
  );
};

const ChatHeader = ({userDetail, onPressCall, onPressMore}) => {
  return (
    <Header onClickBack={goBack}>
      <View style={styles.headerContainer}>
        <View style={[styles.rowCenter, {marginLeft: 10}]}>
          <Avatar
            rounded
            source={{uri: userDetail?.profile_pic_1}}
            //onPress={onPressProfile}
            activeOpacity={0.8}
            size="small"
          />
          <Text style={styles.name}>{userDetail?.name}</Text>
        </View>
        <View style={styles.rowCenter}>
          <TouchableOpacity onPress={onPressCall} style={[styles.icon, {marginRight: 15}]}>
            <CallSvg />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressMore} style={styles.icon}>
            <MoreSvg />
          </TouchableOpacity>
        </View>
      </View>
    </Header>
  );
};

export default PersonalChat

const styles = StyleSheet.create({
    headerContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1
    },
    rowCenter: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    name: {
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: 'bold',
        letterSpacing: 0.3,
        color: COLORS.BLACK,
        marginLeft: 10
      },
    icon: {
        paddingHorizontal:5
    }
})