import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {SCREENS_NAME} from '../../../navigation/ScreensName';
import {logout} from '../../../services/LoginService';
import {
  setLoggedInUserProfile,
  setLogout,
} from '../../../redux/slices/loginSlices';
import {Avatar} from 'react-native-elements';
import VerifiedSvg from '../../../assets/verified.svg';
import {PROFILE_PAGE_ROWS} from '../../../common/Constants';
import GetPremiumSvg from '../../../assets/premium.svg';
import SaveProfileSvg from '../../../assets/saveProfile.svg';
import ReferAndEarnSvg from '../../../assets/refer&earn.svg';
import HelpAndSupportSvg from '../../../assets/help&support.svg';
import EditingDatePlanSvg from '../../../assets/editingDatePlan.svg';
import LogoutSvg from '../../../assets/logout.svg';
import CallHistorySvg from '../../../assets/callHistory.svg';
import {COLORS} from '../../../common/Colors';
import ArrowRightSvg from '../../../assets/arrowRight.svg';
import {LayoutWrapper} from '../../../components/layoutWrapper/LayoutWrapper';
import { setLoggedInProfileDetailSaga } from '../../../redux/saga/SagaActions';
import { navigate } from '../../../navigation/NavigationService';
import DButton from '../../../components/DButton';
import * as Progress from 'react-native-progress';
import { calculateProfileCompletePercentage } from '../../../common/CommonUtils';

const profileNavigationList = [
  {title: PROFILE_PAGE_ROWS.GET_PREMIUM, icon: <GetPremiumSvg />},
  {title: PROFILE_PAGE_ROWS.SAVED_PROFILE, icon: <SaveProfileSvg />},
  {title: PROFILE_PAGE_ROWS.CALL_HISTORY, icon: <CallHistorySvg />},
  {title: PROFILE_PAGE_ROWS.EDITING_DATING_PLAN, icon: <EditingDatePlanSvg />},
  {title: PROFILE_PAGE_ROWS.REFER_AND_EARN, icon: <ReferAndEarnSvg />},
  {title: PROFILE_PAGE_ROWS.HELP_AND_SUPPORT, icon: <HelpAndSupportSvg />},
  {title: PROFILE_PAGE_ROWS.LOGOUT, icon: <LogoutSvg />, hideRighChevron: true},
];

const ProfilePage = () => {
  const dispatch = useDispatch();
  const {userData, loggedInUserProfile} = useSelector(
    state => state.loginReducer,
  );
  const {access_token} = userData || {access_token: null};

  const profileCompeteCount = loggedInUserProfile?.total_weightage

  const onPressCompleteProfile = () => {
    navigate(SCREENS_NAME.EDIT_PROFILE)
  };

  const onClick = title => {
    if (title === PROFILE_PAGE_ROWS.GET_PREMIUM) {
      navigate(SCREENS_NAME.PREMIUM);
    } else if (title === PROFILE_PAGE_ROWS.SAVED_PROFILE) {
      navigate(SCREENS_NAME.SAVED_PROFILE);
    } else if (title === PROFILE_PAGE_ROWS.CALL_HISTORY) {
      navigate(SCREENS_NAME.CALLHISTORY);
    } else if (title === PROFILE_PAGE_ROWS.EDITING_DATING_PLAN) {
      navigate(SCREENS_NAME.EDITING_DATE_PLAN);
    } else if (title === PROFILE_PAGE_ROWS.REFER_AND_EARN) {
      navigate(SCREENS_NAME.REFERNEARN);
    } else if (title === PROFILE_PAGE_ROWS.HELP_AND_SUPPORT) {
      navigate(SCREENS_NAME.SUPPORT);
    } else {
      handleLogout();
    }
  };

  const handleLogout = async () => {
    const isSuccess = await logout(access_token);
    if (isSuccess) {
      dispatch(setLogout({access_token: null}));
      dispatch(setLoggedInUserProfile(null));
      navigate(SCREENS_NAME.LOGIN);
    }
  };

  const getLoggedInProfile = () => {
    if(loggedInUserProfile === null) {
      dispatch(setLoggedInProfileDetailSaga(access_token));
    }
  }

  useEffect(() => {
    getLoggedInProfile();
  }, [access_token]);

  const _renderItem = ({item}) => {
    return (
      <ProfileRowItem
        icon={item.icon}
        label={item.title}
        hideRighChevron={item?.hideRighChevron}
        onPress={onClick}
      />
    );
  };

  const _keyExtractor = item => Math.random().toString();

  return (
    <LayoutWrapper>
      <View style={styles.container}>
        <View style={{alignItems: 'center', marginVertical: 20}}>
          <View style={styles.profileBar}>
            <Progress.Circle
              size={200}
              progress={profileCompeteCount/100}
              color={COLORS.APP_THEME}
              thickness={4}
              direction={'counter-clockwise'}
              borderWidth={0}
            />
            <View style={{ zIndex: 99, position: 'absolute', alignItems: 'center'}}>
            <Avatar
                size={180}
                rounded
                source={{uri: loggedInUserProfile?.profile_pic_1}}
                activeOpacity={0.8}
              />
              <Text style={styles.progressText}>{profileCompeteCount} %</Text>
            </View>
            
          </View>
          <View style={styles.rowCenter}>
            <Text style={styles.profileText}>{loggedInUserProfile?.name}</Text>
            { loggedInUserProfile?.is_premium_user && <VerifiedSvg />}
          </View>
          <DButton
            label={'Complete my profile'}
            additionalTextStyle={styles.completeText}
            additionalStyle={styles.completeBtn}
            onPress={onPressCompleteProfile}
          />
        </View>
        <FlatList
          data={profileNavigationList}
          renderItem={_renderItem}
          keyExtractor={_keyExtractor}
        />
      </View>
    </LayoutWrapper>
  );
};

const ProfileRowItem = props => {
  const {onPress = () => {}, icon, label, hideRighChevron = false} = props;
  const _onPress = () => {
    onPress(label);
  };
  return (
    <TouchableOpacity
      onPress={_onPress}
      style={styles.rowContainer}
      activeOpacity={0.7}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {icon}
        <Text style={styles.rowText}>{label}</Text>
      </View>
      {hideRighChevron ? null : <ArrowRightSvg />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.PROFILE_BG,
    paddingHorizontal: '10%',
  },
  profileText: {
    color: COLORS.BLACK,
    fontWeight: '700',
    fontSize: 28,
    marginRight: 10,
  },
  rowText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    paddingLeft: 10,
  },
  rowContainer: {
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 10,
    marginBottom: 20,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completeBtn: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 15,
    marginTop: 10,
  },
  completeText: {
    fontSize: 12,
    fontWeight: '400',
  },
  profileBar: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    zIndex: 99,
    position: 'absolute',
    alignItems: 'center',
    bottom: -15,
    paddingHorizontal: 10,
    textAlign: 'center',
    backgroundColor: COLORS.APP_THEME,
    borderRadius: 10,
    color: COLORS.WHITE,
    fontSize: 12,
    fontWeight: '600',
  },
});

export default ProfilePage;
