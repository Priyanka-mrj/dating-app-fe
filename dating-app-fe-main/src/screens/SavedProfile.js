import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text
} from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { SCREENS_NAME } from "../navigation/ScreensName";
import { LayoutWrapper } from "../components/layoutWrapper/LayoutWrapper";
import { COLORS } from "../common/Colors";
import { goBack, navigate } from "../navigation/NavigationService";
import { getSavedUserProfile } from "../services/profileServices";
import STYLES from '../common/CommonStyles';
import { Avatar, SearchBar } from 'react-native-elements'
import DButton from "../components/DButton";
import DSearchBar from "../components/DSearchBar";

const SavedProfile = (props) => {
  const dispatch = useDispatch();

  const {userData} = useSelector(state => state.loginReducer);
  const {access_token} = userData || {access_token: null};

  const [isLoading, setLoading] = useState(false);
  const [savedUserList, setSavedUserList] = useState([]);
  const [filteredUserList, setFilteredUserList] = useState([]);
  const [searchedText, setSearchedText] = useState('');

  const fetchSavedUserList = async () => {
    setLoading(true);
    const data = await getSavedUserProfile(access_token);
    setSavedUserList(data);
    setLoading(false)
  }

  useEffect(() => {
    fetchSavedUserList();
  },[])


  const onPressViewProfile = (userDetail) => {
    navigate(SCREENS_NAME.PROFILE_DETAIL, {profileId: userDetail?.user_id, isEnableAction: true})
  }

  const onChangeSearchText = (text) => {
    setSearchedText(text);
    const data = savedUserList.filter(item => item?.name?.includes(text));
    setFilteredUserList(data);
  }

  const _renderItem = ({item}) => {
    return (
       <RowCard userDetail={item} onPressViewProfile={onPressViewProfile}/>
    )
  };

  const _keyExtractor = item => Math.random().toString();

  const _renderContent = () => {
    const data = searchedText && searchedText.length ? filteredUserList : savedUserList;
    return (
      <>
        <DSearchBar value={searchedText} onChangeText={onChangeSearchText} />
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
      headerScreenName={'Save Profile'}>
      <View style={styles.container}>
        {_renderContent()}
      </View>
    </LayoutWrapper>
  );
}

const RowCard = ({userDetail, onPressViewProfile}) => {
  const _onPressViewProfile = () => {
    onPressViewProfile(userDetail);
  }
  return (
    <View style={styles.cardContainer}>
      <View style={styles.profileInfo}>
        <Avatar
          rounded
          source={{uri: userDetail?.profile_pic}}
          //onPress={onPressProfile}
          activeOpacity={0.8}
          size="medium"
        />
        <View style={{marginLeft: 15}}>
          <Text style={styles.name}>{userDetail?.name}</Text>
          <Text style={styles.subText}>{'4 Kilometers away'}</Text>
        </View>
      </View>
      <DButton
        label={'View'}
        onPress={_onPressViewProfile}
        additionalStyle={{minWidth: 80, paddingVertical: 0, height: 40}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  text2: {
    color: COLORS.BLACK,
    fontWeight: '700',
    fontSize: 28,
    textAlign: 'center'
  },
  cardContainer: {
    ...STYLES.shadow,
    flex: 1,
    backgroundColor: COLORS.WHITE,
    marginBottom: 20,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: 'bold',
    letterSpacing: 0.3,
    color: COLORS.BLACK,
  },
  subText: {
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    letterSpacing: 0.3,
    color: COLORS.GRAY_67,
  },
});

export default SavedProfile;