import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet, View, FlatList, Text, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {SCREENS_NAME} from '../../../navigation/ScreensName';
import {LayoutWrapper} from '../../../components/layoutWrapper/LayoutWrapper';
import {COLORS} from '../../../common/Colors';
import {goBack, navigate} from '../../../navigation/NavigationService';
import STYLES from '../../../common/CommonStyles';
import {Avatar, Badge, SearchBar} from 'react-native-elements';
import DButton from '../../../components/DButton';
import DSearchBar from '../../../components/DSearchBar';
import ProfileConfirmation from './ProfileConfirmation';
import chatService from '../../../services/ChatService';
import { getDateLabel } from '../../../common/CommonUtils';
import { useFocusEffect } from '@react-navigation/native';


const Chatspage = props => {
  const dispatch = useDispatch();

  const {userData, loggedInUserProfile} = useSelector(state => state.loginReducer);
  const {suggestionList} = useSelector(state => state.homeReducer);
  const {access_token} = userData || {access_token: null};

  const [isLoading, setLoading] = useState(false);
  const [chatUserList, setChatUserList] = useState();
  const [filteredUserList, setFilteredUserList] = useState([]);
  const [searchedText, setSearchedText] = useState('');

  const fetchChatList = async () => {
    setLoading(true);
    const response = await chatService.getChatList(access_token);
    setChatUserList(response);
    setLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      fetchChatList();
    }, []),
  );

  const onPressRowItem = userDetail => {
    navigate(SCREENS_NAME.PERSONALCHAT, {userDetail});
  };

  const onChangeSearchText = text => {
    setSearchedText(text);
    const data = chatUserList.filter(item => {
      const user = item?.user?.id == loggedInUserProfile?.id ? item?.receiver : item?.user;
      return user?.name?.toUpperCase()?.includes(text.toUpperCase());
    });
    
    setFilteredUserList(data);
  };

  const _renderItem = ({item}) => {
    const user = item?.user?.id == loggedInUserProfile?.id ? item?.receiver : item?.user;
    return (
      <RowCard 
        userDetail={user} 
        onPressRowItem={onPressRowItem} 
        message={item?.message}
      />
    );
  };

  const _keyExtractor = item => Math.random().toString();

  const _renderContent = () => {
    const data =
      searchedText && searchedText.length ? filteredUserList : chatUserList;
    return (
      <>
        <DSearchBar value={searchedText} onChangeText={onChangeSearchText} />
        <ProfileConfirmation access_token={access_token} fetchChatList={fetchChatList}/>
        <Text style={styles.msgLabel}>{"Messages"}</Text>
        <FlatList
          data={data}
          renderItem={_renderItem}
          keyExtractor={_keyExtractor}
        />
      </>
    );
  };
  return (
    <LayoutWrapper
      isHeader
      loading={isLoading}
      headerScreenName={'Chats'}>
      <View style={styles.container}>{_renderContent()}</View>
    </LayoutWrapper>
  );
};

const RowCard = ({userDetail, onPressRowItem, message}) => {
    const _onPressRowItem = () => {
        onPressRowItem(userDetail);
    }

    const latestMsg = message?.length ? message[message.length - 1] : undefined;

    return (
      <Pressable
        style={({pressed}) => [
          styles.cardContainer,
          {
            backgroundColor: pressed ? COLORS.GRAY_E8 : COLORS.WHITE,
          },
        ]}
        onPress={_onPressRowItem}>
        <View style={styles.profileInfo}>
          <Avatar
            rounded
            source={{uri: userDetail?.profile_pic_1}}
            //onPress={onPressProfile}
            activeOpacity={0.8}
            size="medium"
          />
          <View style={{marginLeft: 15}}>
            <Text style={styles.name}>{userDetail?.name}</Text>
            <Text style={styles.subText} numberOfLines={1} ellipsizeMode='tail'>{latestMsg ? latestMsg?.message : 'Lets meet!'}</Text>
          </View>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'flex-end', flex: 0.25}}>
          <Text style={[styles.subText, {color: COLORS.APP_THEME}]}>
            {latestMsg ? getDateLabel(latestMsg.date_time) : ""}
          </Text>
          {/* <Badge
            value="3"
            status="primary"
            badgeStyle={{backgroundColor: COLORS.APP_THEME}}
          /> */}
        </View>
      </Pressable>
    );
  };


  export default Chatspage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  cardContainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.7
  },
  name: {
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 'bold',
    letterSpacing: 0.3,
    color: COLORS.BLACK,
  },
  msgLabel: {
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: COLORS.BLACK,
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  subText: {
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    letterSpacing: 0.3,
    color: COLORS.GRAY_67,
  },
});
