import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import InterestsIcon from './InterestIcon';
import LikeSvg from '../assets/Like.svg';
import CancelSvg from '../assets/Reject.svg';
import VerifiedSvg from '../assets/verified.svg';
import CallIconSvg from '../assets/callicon1.svg';
import BookmarkSvg from '../assets/bookmark.svg';
import ChevronDownSvg from '../assets/ChevronDown.svg'
import { COLORS } from '../common/Colors';
import { SCREEN_WIDTH } from '../common/Constants';
import { SCREENS_NAME } from '../navigation/ScreensName';
import { Icon } from 'react-native-elements'

const  interests = [
    {text: 'Travelling', },
    {text: 'Music', },
    {text: 'Cooking', },
    {text: 'Bollywood', },
    {text: 'Reading', },
    {text: 'Coffee', },
  ];

const ProfileCard = ({userDetail, onPressReject, navigation, isHideAction = false, onPressBookmark = () => {}}) => {

  const [isReadMoreOpen, setToggleReadMore] = useState(false);

  //const Interests = interests
  const onPressLike = () => {
    navigation.navigate(SCREENS_NAME.SELECTDATES, {date_choice: userDetail.date_choice, selectedProfile: userDetail});
  }

  const _onPressBookmark = () => {
    onPressBookmark(userDetail);
  }
  return (
    <View style={styles.container}>
      <ProfilePicture
        userDetail={userDetail}
        onPressReject={onPressReject}
        onPressLike={onPressLike}
        pictureUri={userDetail?.profile_pic_1}
        isHideAction={isHideAction}
      />
      <ProfileInfo
        userDetail={userDetail}
        isReadMoreOpen={isReadMoreOpen}
        setToggleReadMore={setToggleReadMore}
        onPressBookmark={_onPressBookmark}
      />
    </View>
  );
};

const AboutInfo = ({userDetail}) => {
  return (
    <View>
      <Text style={styles.textAbout}>{'About'}</Text>
    </View>
  );
};

const ProfileInfo = ({userDetail, isReadMoreOpen, setToggleReadMore, onPressBookmark}) => {
  const isProfileVerfied = userDetail?.is_premium_user;
  return (
    <>
    <View style={styles.infoContainer}>
      <View style={styles.userNamecontainer}>
        <View style={styles.userNamecontainerLeft}>
          <Text style={styles.textName}>{userDetail?.name}</Text>
          <View style={isProfileVerfied ? {paddingHorizontal: 10} : {paddingHorizontal: 5}}>
            {isProfileVerfied && <VerifiedSvg />}
          </View>
          <TouchableOpacity>
            <CallIconSvg />
          </TouchableOpacity>
        </View>
        { userDetail?.user_save ? 
          <Icon name="bookmark" type="material" color={COLORS.YELLOW_FF} onPress={onPressBookmark} size={30}/>:
          <Icon name="bookmark-border" type="material" color={COLORS.GRAY_21} onPress={onPressBookmark} size={30}/>
        }
        {/* <BookmarkSvg /> */}
      </View>
      <Text style={styles.text}>{'4 kilometers Away'}</Text>
      <Text style={styles.textAbout} >{'About'}</Text>
      { isReadMoreOpen ? 
        <Text style={styles.text}>{userDetail?.about}</Text> :
        <Text style={styles.text} numberOfLines={2}>{userDetail?.about}</Text>
      }
      <TouchableOpacity style={{flexDirection: 'row', alignItems:'center'}} onPress={() => setToggleReadMore(!isReadMoreOpen)}>
        <Text style={[styles.text, {color: COLORS.APP_THEME, paddingRight: 5}]}>{isReadMoreOpen ? 'read less' : 'read more'}</Text>
         <View style={{paddingTop: 5}}>
            <ChevronDownSvg/>
         </View>
      </TouchableOpacity>
      <Text style={styles.textAbout} >{'Interest'}</Text>
      <InterestsIcon interests={userDetail?.interest}/>
    </View>
    <ProfilePicture userDetail={userDetail} isHideAction={true} pictureUri={userDetail?.profile_pic_2}/>
    <View style={{marginVertical: 15}}>
      <ProfilePicture userDetail={userDetail} isHideAction={true} pictureUri={userDetail?.profile_pic_3}/>
    </View>
    </>
  );
};

const ProfilePicture = props => {
  const {
     isHideAction = false,
     onPressReject = ()=> {},
     onPressLike = () => {},
     pictureUri
    } = props;
  if(!pictureUri) return null;
  return (
    <View style={styles.imgContainer}>
      <Image
        source={{uri: pictureUri}}
        resizeMode='cover'
        style={styles.img}
      />
      {isHideAction ? null : (
        <View style={styles.likeUnlikeContainer}>
          <TouchableOpacity onPress={onPressReject}>
            <CancelSvg />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressLike}>
            <LikeSvg />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textName: {
    color: '#000000',
    fontWeight: '700',
    fontSize: 18,
  },
  textAbout: {
    color: '#000000',
    fontWeight: '600',
    fontSize: 14,
    paddingTop: 20,
    paddingBottom: 5
  },
  textInterest: {
    color: '#000000',
    fontWeight: '600',
    fontSize: 12,
    marginLeft: 50,
    margin: 10,
  },
  textAbout2: {
    color: '#000000',
    fontWeight: '400',
    fontSize: 10,
    marginLeft: 50,
    marginTop: 3,
  },
  text: {
    color: '#000000',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20
  },
  text3: {
    color: '#ED2552',
    fontWeight: '400',
    fontSize: 10,
  },
  imgContainer: {
    position: 'relative',
    //    paddingHorizontal: 20
  },
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  img: {
    height: 450,
    width: SCREEN_WIDTH - 40,
    borderRadius: 20,
  },
  likeUnlikeContainer: {
    flexDirection: 'row',
    position: 'absolute',
    justifyContent: 'space-between',
    width: SCREEN_WIDTH - 100,
    alignItems: 'flex-end',
    height: 420,
    left: 30,
  },
  userNamecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userNamecontainerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContainer: {
   paddingHorizontal: 10,
   paddingVertical: 15
  }
});

export default ProfileCard;
