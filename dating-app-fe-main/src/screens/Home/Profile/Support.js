import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, Text, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {SCREENS_NAME} from '../../../navigation/ScreensName';
import {LayoutWrapper} from '../../../components/layoutWrapper/LayoutWrapper';
import {COLORS} from '../../../common/Colors';
import {goBack, navigate} from '../../../navigation/NavigationService';
import {getSavedUserProfile} from '../../../services/profileServices';
import STYLES from '../../../common/CommonStyles';
import {Avatar, Badge, SearchBar} from 'react-native-elements';
import DButton from '../../../components/DButton';
import DSearchBar from '../../../components/DSearchBar';
import { PROFILE_DATA } from '../../../common/DummyData';
import LineSeparator from '../../../components/LineSeparator';


const SUPPORT_LIST = [
    {
        id: '101', 
        name: 'DateMe Features',
        nextScreenName: ''
    },
    {
        id: '102', 
        name: 'Chats and Calls',
        nextScreenName: ''
    },
    {
        id: '103', 
        name: 'Payments',
        nextScreenName: ''
    },
    {
        id: '104', 
        name: 'Privacy and Security',
        nextScreenName: ''
    },
    {
        id: '105', 
        name: 'Account Settings',
        nextScreenName: ''
    },
    {
        id: '106', 
        name: 'Others',
        nextScreenName: ''
    }
]

const Support = props => {
  const dispatch = useDispatch();

  const {userData} = useSelector(state => state.loginReducer);
  const {access_token} = userData || {access_token: null};

  const [isLoading, setLoading] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [searchedText, setSearchedText] = useState('');

  const onPressRowItem = userDetail => {
    // navigate(SCREENS_NAME.PERSONALCHAT, {userDetail});
    // console.log('userDetail ============> ', userDetail);
  };

  const onChangeSearchText = text => {
    setSearchedText(text);
    const data = SUPPORT_LIST.filter(item => item?.name?.includes(text));
    setFilteredList(data);
  };

  const _renderItem = ({item}) => {
    return (
      <RowCard rowDetail={item} onPressRowItem={onPressRowItem} />
    );
  };

  const _keyExtractor = item => Math.random().toString();

  const _renderContent = () => {
    const data =
      searchedText && searchedText.length ? filteredList : SUPPORT_LIST;
    return (
      <>
        <Text style={styles.headingText}>{"Hi, how can we help you?"}</Text>
        <DSearchBar 
        value={searchedText} 
        onChangeText={onChangeSearchText} 
        additionalInputContainerStyle={{marginBottom: 10}}
        />
        <FlatList
          data={data}
          renderItem={_renderItem}
          keyExtractor={_keyExtractor}
        />
        <View style={{padding: 20}}>
            <DButton label={"Chat With Us"}/>
        </View>
      </>
    );
  };
  return (
    <LayoutWrapper
      isHeader
      loading={isLoading}
      headerScreenName={'Help & Support'}>
      <View style={styles.container}>{_renderContent()}</View>
    </LayoutWrapper>
  );
};

const RowCard = ({rowDetail, onPressRowItem}) => {
    const _onPressRowItem = () => {
        onPressRowItem();
    }

    return (
      <>
      <Pressable
        style={({pressed}) => [
          styles.cardContainer,
        //   {
        //     backgroundColor: pressed ? COLORS.GRAY_E8 : COLORS.WHITE,
        //   },
        ]}
        onPress={_onPressRowItem}>
        <Text style={styles.name}>{rowDetail?.name}</Text>
      </Pressable>
      <View style={{paddingHorizontal: 20}}>
        <LineSeparator/>
      </View>
      </>
    );
  };


  export default Support;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  cardContainer: {
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  name: {
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 'bold',
    letterSpacing: 0.3,
    color: COLORS.BLACK,
  },
  headingText: {
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: COLORS.APP_THEME,
    paddingHorizontal: 20,
    paddingVertical: 10
  }
});
