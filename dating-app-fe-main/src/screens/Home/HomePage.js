import React, {useEffect, useState, useCallback, useRef, useMemo} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Animated,
  Text
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SCREENS_NAME} from '../../navigation/ScreensName';
import ProfileCard from '../../components/ProfileCard';
import OnOffIcon from '../../components/Onoffbutton';
import FilterSvg from '../../assets/Filter.svg';
import WalletSvg from '../../assets/Wallet.svg';
import DateMeSvg from '../../assets/DateMe.svg';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSuggestionList, setLoggedInProfileDetailSaga} from '../../redux/saga/SagaActions';
import {startFetchingSuggestion} from '../../redux/slices/homeSlices';
import {LayoutWrapper} from '../../components/layoutWrapper/LayoutWrapper';
import {COLORS} from '../../common/Colors';
import Filter from './Filters/Filter';
import NoDataFound from '../../components/NoDataFound';
import { showToast } from '../../common/CommonUtils';
import moment from 'moment';
import { FILTER_PROPERTIES } from '../../common/Constants';
import { saveUserProfile } from '../../services/DatingService';
import { navigate } from '../../navigation/NavigationService';

const HomePage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {userData, loggedInUserProfile} = useSelector(state => state.loginReducer);
  const {access_token} = userData || {access_token: null};
  const {suggestionList, isLoading} = useSelector(state => state.homeReducer);
  const [isShowFilterModal, setShowFilterModal] = useState(false);
  const [profileList, setProfileList] = useState(suggestionList);
  const [isRefreshing, setRefreshing] = useState(false);
  const [isPremium, setPremium] = useState(true);
  const [filteProperties, setFilterProperty] = useState({});

  useEffect(() => {
    setProfileList(suggestionList);
  }, [suggestionList]);

  const onPressWallet = () => {
    navigate(SCREENS_NAME.WALLET)
  };

  const fetchSuggestionData = (isPremium = true) => {
    dispatch(startFetchingSuggestion());
    dispatch(fetchSuggestionList(access_token, isPremium));
  }

  const togglePremiumProfiles = () => {
    setPremium(premium => {
      fetchSuggestionData(!premium);
      return !premium;
    });
  };

  const getLoggedInProfile = () => {
    if(loggedInUserProfile === null) {
      dispatch(setLoggedInProfileDetailSaga(access_token));
    }
  }

  useEffect(() => {
    fetchSuggestionData();
    getLoggedInProfile();
  }, [access_token]);

  const onChangeFilterProperties = (value, property) => {
    console.log('onChangeFilterProperties -------> ', value, property);
    setFilterProperty(previousProperty => {
      return {
        ...previousProperty,
        [property]: value
      }
    })
  };

  console.log('filteProperties -------> ', filteProperties);

  const onPressApplyFilter = () => {
    let filteredProfile = [...profileList];
    if(filteProperties?.age) {
      //moment().diff('1998-09-04', 'years');
      filteredProfile = filteredProfile.filter(profile => moment().diff(profile.dob, 'years') === filteProperties?.age);
    }
    if(filteProperties?.language) {
      let filterdProfileByLanguage = [];
      filteredProfile.forEach(profile => {
        profile.language?.forEach(lang => {
          if(lang?.name === filteProperties?.language) {
            filterdProfileByLanguage.push(profile);
          }
        })
      });
      filteredProfile = [...filterdProfileByLanguage];
    }
    if(filteProperties?.interestedIn){
      filteredProfile = filteredProfile.filter(profile => profile.gender === filteProperties?.interestedIn);
    }

    setProfileList(filteredProfile);
    hideFilterModal();
    console.log("filteredProfile ======> ........", filteredProfile);
  };

  const onPressReject = () => {
    const list = [...profileList];
    if(list.length === 1) {
      showToast('', "No more profiles..")
    }
    else {
      list.shift();
      setProfileList(list);
    }
  }

  const onPressBookmark = async (userDetail) => {
    const isSaved = await saveUserProfile(userDetail, access_token);
    if(isSaved) {
      setProfileList(previousList => {
        return previousList.map(item => {
          if (userDetail?.id === item?.id) {
            return {
              ...item,
              user_save: !item.user_save,
            };
          } else return item;
        });
      });
    }
  }

  const onPullToRefresh = () => {
    setRefreshing(true);
    setProfileList(suggestionList);
    setRefreshing(false);
  };

  const showFilterModal = useCallback(() => {
    setShowFilterModal(true);
  }, [isShowFilterModal]);

  const hideFilterModal = useCallback(() => {
    setShowFilterModal(false);
  }, [isShowFilterModal]);

  const onPressRetry = () => {
    setPremium(premium => {
      fetchSuggestionData(true);
      return true;
    });
  }

  const clearFilter = () => {
    setFilterProperty({});
  }

  const _renderAplliedFilter = () => {
    if(filteProperties && Object.keys(filteProperties).length) {
      return (
        <View style={{flexDirection: 'row'}}>
          { Object.keys(filteProperties).map(key => {
            return (
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  padding: 10,
                  backgroundColor: COLORS.WHITE,
                  borderColor: COLORS.APP_THEME
                }}
              >
                <Text>{`${FILTER_PROPERTIES[key]?.label}: ${filteProperties[key]}`}</Text>
              </View>
            )
          })
          }
        </View>
      );
    }
  }

  const Header = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerTop}>
          <View style={{flexDirection: 'row'}}>
            <DateMeSvg />
            <OnOffIcon
              isSwitchOn={isPremium}
              toggleSwitch={togglePremiumProfiles}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={showFilterModal}
              style={{marginRight: 25, opacity: profileList.length ? 1 : 0.5}}
              disabled={!profileList.length}>
              <FilterSvg />
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressWallet}>
              <WalletSvg />
            </TouchableOpacity>
          </View>
        </View>
        {/* {_renderAplliedFilter()} */}
      </View>
    );
  };

  const _renderItem = ({item}) => {
    return <ProfileCard userDetail={item} onPressReject={onPressReject} navigation={navigation} onPressBookmark={onPressBookmark}/>;
  };

  const _keyExtractor = item => Math.random().toString();

  const _renderProfileList = () => {
    return(
      <>
       <FlatList
          data={[profileList?.[0]]}
          renderItem={_renderItem}
          keyExtractor={_keyExtractor}
          onRefresh={onPullToRefresh}
          refreshing={isRefreshing}
        />
        <Animated.View>
          <Filter
            hideFilterModal={hideFilterModal}
            isVisible={isShowFilterModal}
            onChangeFilterProperties={onChangeFilterProperties}
            loggedInUserProfile={loggedInUserProfile}
            onPressApplyFilter={onPressApplyFilter}
            filteProperties={filteProperties}
          />
        </Animated.View>
      </>
    )
  }

  return (
    <LayoutWrapper loading={isLoading}>
      <View style={styles.container}>
        <Header />
        { isLoading ? null :
         profileList.length ? _renderProfileList() :
         <NoDataFound onPressRetry={onPressRetry}/>
        }
      </View>
    </LayoutWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    padding: 20,
  },

  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }

});

export default HomePage;
