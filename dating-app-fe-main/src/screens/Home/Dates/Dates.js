import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  } from 'react-native';
import {COLORS} from '../../../common/Colors';
import {useNavigation, useFocusEffect, useIsFocused} from '@react-navigation/native';
import {LayoutWrapper} from '../../../components/layoutWrapper/LayoutWrapper';
import DateRequestCard from './DateRequestCard';
import { getDateRequestList, updateDateRequest } from '../../../services/DatingService';
import {useSelector} from 'react-redux';

const Dates = props => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const {userData, loggedInUserProfile} = useSelector(state => state.loginReducer);
  const {access_token} = userData || {access_token: null};

  const [showPreviewId, setShowPreview] = useState(null);
  const [datesRequestList, setDatesRequestList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const onPressOutsidePreview = () => {
        setShowPreview(null);
  };

  const onPressPreview = (id) => {
    if(showPreviewId === id) {
        setShowPreview(null);
    }
    else {
        setShowPreview(id);
    }
  };

  const setDateRequestData = async () => {
    const data = await getDateRequestList(access_token);
    setDatesRequestList(data);
  };

  const fetchDateRequestList = async () => {
    if(isFocused) {
      setLoading(true);
      await setDateRequestData();
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchDateRequestList();
    }, [isFocused])
  );

  const deleteDateRequest = async (requestDetail) => {
    setLoading(true);
    const params = {
      id: requestDetail?.id,
      is_deleted: true
    };
    const isSuccess = await updateDateRequest(params, access_token);
    if(isSuccess) {
      await setDateRequestData();
    }
    setLoading(false);
  };

  const confirmDateRequest = async (requestDetail) => {
    setLoading(true);
    const params = {
      id: requestDetail?.id,
      is_confirm: true
    };
    const isSuccess = await updateDateRequest(params, access_token);
    if(isSuccess) {
      await setDateRequestData();
    }
    setLoading(false);
  };

  const _renderItem = ({item, index}) => {
    return (
      <DateRequestCard
        requestDetail={item}
        navigation={navigation}
        onPressPreview={onPressPreview}
        showPreviewId={showPreviewId}
        onPressOutsidePreview={onPressOutsidePreview}
        deleteDateRequest={deleteDateRequest}
        confirmDateRequest={confirmDateRequest}
        loggedInUserProfile={loggedInUserProfile}
      />
    );
  };

  const _keyExtractor = item => Math.random().toString();

  return (
    <LayoutWrapper
      loading={isLoading}
      isHeader
      headerScreenName={'Notification'}
      onPressBack={() => navigation.goBack()}>
      <View style={styles.container}>
        <FlatList
          data={datesRequestList}
          renderItem={_renderItem}
          keyExtractor={_keyExtractor}
        />
</View>
    </LayoutWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
});

export default Dates;
