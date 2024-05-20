import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SCREENS_NAME} from '../navigation/ScreensName';
import ProfileCard from '../components/ProfileCard';
import {useDispatch, useSelector} from 'react-redux';
import {LayoutWrapper} from '../components/layoutWrapper/LayoutWrapper';
import {COLORS} from '../common/Colors';
import { getProfileDetail } from '../services/profileServices';
import { goBack } from '../navigation/NavigationService';
import NoDataFound from '../components/NoDataFound';

const ProfileDetail = (props) => {
  const profileId = props?.route?.params?.profileId || null;
  const isEnableAction = props?.route?.params?.isEnableAction || false;
  
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.loginReducer.userData);
  const {access_token} = userData || {access_token: null};
  const [profileDetails, setProfileDetails] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const fetchProfileDetails = async() => {
    const profileDetail = await getProfileDetail(access_token, profileId);
    setProfileDetails(profileDetail);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchProfileDetails();
  }, []);


  return (
    <LayoutWrapper loading={isLoading} isHeader={true} onPressBack={goBack}>
      <ScrollView style={styles.container}>
        {isLoading ? null : profileDetails ? (
          <ProfileCard
            userDetail={profileDetails}
            isHideAction={isEnableAction ? false : true}
            navigation={navigation}
          />
        ) : (
          <NoDataFound onPressRetry={fetchProfileDetails}/>
        )}
      </ScrollView>
    </LayoutWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
});

export default ProfileDetail;
