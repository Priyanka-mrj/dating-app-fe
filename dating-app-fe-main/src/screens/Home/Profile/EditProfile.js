import {StyleSheet, Text, View, ScrollView, Image, TextInput, Pressable } from 'react-native';
import React, {useEffect, useState} from 'react';
import {LayoutWrapper} from '../../../components/layoutWrapper/LayoutWrapper';
import {COLORS} from '../../../common/Colors';
import ArrowRightSvg from '../../../assets/arrowRightSmall.svg';
import VerifiedSvg from '../../../assets/verified.svg';
import DocumentPicker from "react-native-document-picker";
import UploadProfilePictures from '../../../components/UploadProfilePictures';
import { useDispatch, useSelector } from 'react-redux';
import DPressable from '../../../components/DPressable';
import EditSvg from '../../../assets/editIcon.svg';
import { navigate } from '../../../navigation/NavigationService';
import { SCREENS_NAME } from '../../../navigation/ScreensName';
import WorkSvg from '../../../assets/work.svg';
import EducationSvg from '../../../assets/education.svg';
import GenderSvg from '../../../assets/gender.svg';
import LocationSvg from '../../../assets/location.svg';
import HomeTownSvg from '../../../assets/homeTown.svg';
import HeightSvg from '../../../assets/height.svg';
import ExerciseSvg from '../../../assets/exercise.svg';
import DrinkingSvg from '../../../assets/drinking.svg';
import LookingForSvg from '../../../assets/lookingFor.svg';
import ZodiacSvg from '../../../assets/zodiac.svg'
import DIconPressable from '../../../components/DIconPressable';
import DButton from '../../../components/DButton';
import { updateUserProfile } from '../../../services/profileServices';
import { calculateProfileCompletePercentage } from '../../../common/CommonUtils';
import { setLoggedInProfileDetailSaga } from '../../../redux/saga/SagaActions';


const EditProfile = (props) => {
  const dispatch = useDispatch();

  const { savedInterests, savedLanguage, savedMyBasics, savedMoreAboutMe } = props.route?.params || { savedInterests : null, savedLanguage: null, savedMoreAboutMe: null};
  const {loggedInUserProfile, userData, isLoggedInUserProfileLoading} = useSelector(state => state.loginReducer);

  const basicsDefaultValues = {
    work: loggedInUserProfile?.work,
    education: loggedInUserProfile?.education,
    gender: loggedInUserProfile?.gender,
    location: loggedInUserProfile?.location,
    hometown: loggedInUserProfile?.hometown,
  };

  const moreAboutmeDefaultValues = {
    height: loggedInUserProfile?.height,
    education_level: loggedInUserProfile?.education_level,
    exercise: loggedInUserProfile?.exercise,
    drinking: loggedInUserProfile?.drinking,
    smoking: loggedInUserProfile?.smoking,
    looking_for: loggedInUserProfile?.looking_for,
    zodiac: loggedInUserProfile?.zodiac,
    belief: loggedInUserProfile?.belief,
  }

  const [isLoading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [aboutMySelf, setAboutMySelf] = useState(loggedInUserProfile?.about);
  const [myInterests, setMyInterests] = useState(loggedInUserProfile?.interest);
  const [myLanguage, setMyLanguage] = useState(loggedInUserProfile?.language);
  const [myBasics, setMyBasic] = useState({...basicsDefaultValues});
  const [moreAboutMe, setMoreAboutMe] = useState({...moreAboutmeDefaultValues});


  useEffect(() => {
    console.log('savedMoreAboutMe ====>', savedMoreAboutMe);
    if(savedMoreAboutMe !== null && savedMoreAboutMe !== undefined) {
        setMoreAboutMe({...savedMoreAboutMe});
    }
  }, [savedMoreAboutMe]);

  useEffect(() => {
    if(savedMyBasics !== null && savedMyBasics !== undefined) {
        setMyBasic({...savedMyBasics});
    }
  }, [savedMyBasics]);

  useEffect(() => {
    if(savedInterests !== null && savedInterests !== undefined) {
        setMyInterests(savedInterests);
    }
  }, [savedInterests]);

  useEffect(() => {
    if(savedLanguage !== null && savedLanguage !== undefined) {
        setMyLanguage(savedLanguage);
    }
  }, [savedLanguage]);

  useEffect(() => {
    const profilePictures = [
        {uri: loggedInUserProfile?.profile_pic_1},
        {uri: loggedInUserProfile?.profile_pic_2},
        {uri: loggedInUserProfile?.profile_pic_3},
    ];
    setSelectedImages(profilePictures);
  }, []);

  const handleUploadImage = async (index) => {
    try {
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setSelectedImages((prevImages) => {
        const updatedImages = [...prevImages];
        updatedImages[index] = doc[0];
        return updatedImages;
      });
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('Image selection canceled');
      } else {
        console.log('Error selecting image', error);
      }
    }
  };

  const onEditIntrest = () => {
    const interestObj = {};
    myInterests?.forEach(item => {
        if(interestObj[item?.interest?.id]){
            interestObj[item?.interest?.id]?.push(item?.id);
        }
        else {
            interestObj[item?.interest?.id] = [item?.id];
        }
    });
    navigate(SCREENS_NAME.EDIT_INTEREST, { isEdit: true, preferedInterest: interestObj, previousRoute: props.route});
  };

  const onEditLanguage = () => {
    const preferedLanguage = myLanguage.map(item => item.id);
    navigate(SCREENS_NAME.EDIT_LANGUAGE, { isEdit: true, preferedLanguage, previousRoute: props.route});
  };

  const onEditMyBasics = () => {
    navigate(SCREENS_NAME.EDIT_MY_BASICS, { isEdit: true, myBasics, previousRoute: props.route});
  };

  const onEditMoreAboutMe = () => {
    navigate(SCREENS_NAME.EDIT_MORE_ABOUT_ME, { isEdit: true, moreAboutMeDetails: moreAboutMe, previousRoute: props.route});
  };

  const prepareFormData = () => {
    let formdata = new FormData();
    const languageIds = myLanguage.map(item => item.id);
    const beleifId = moreAboutMe?.belief[0]?.id ? [moreAboutMe?.belief[0]?.id] : [];
    let interestIds = [];
    myInterests.forEach(item => {
      const index = interestIds.findIndex(interest =>
        Object.keys(interest)?.includes(`${item.interest.id}`),
      );
      if (index !== -1) {
        interestIds[index][item.interest.id].push(item.id);
      } 
      else {
        interestIds.push({[item.interest.id]: [item.id]});
      }
    });
    const data = {
        ...loggedInUserProfile,
        interest: interestIds,
        language: languageIds,
        about: aboutMySelf,
        ...myBasics,
        ...moreAboutMe,
        belief: beleifId
    };
    delete data.profile_pic_1;
    delete data.profile_pic_2;
    delete data.profile_pic_3;

    if(selectedImages[0]?.name || selectedImages[1]?.name || selectedImages[2]?.name) {
        selectedImages[0]?.name  ? formdata.append('profile_pic_1', selectedImages?.[0], selectedImages?.[0]?.name) : null
        selectedImages[1]?.name  ? formdata.append('profile_pic_2', selectedImages?.[1], selectedImages?.[1]?.name) : null;
        selectedImages[2]?.name  ? formdata.append('profile_pic_3', selectedImages?.[2], selectedImages?.[2]?.name) : null;
    }

    Object.keys(data).forEach(key => {
        const payload = Array.isArray(data[key]) ? JSON.stringify(data[key]) : data[key];
        if(key != 'profile_pic_1' || key != 'profile_pic_2' || key != 'profile_pic_3'){
            formdata.append(key, payload);
        }
    })
    return formdata;
  }

  const onSubmit = async () => {
    setLoading(true);
    const formData = prepareFormData();
    const res = await updateUserProfile(formData, userData?.access_token);
    if(res) {
        setLoading(false);
        dispatch(setLoggedInProfileDetailSaga(userData?.access_token));
    }
    else {
        setLoading(false);
    }
  }


  const _renderContent = () => {
    return (
      <>
        <ProfileProgress loggedInUserProfile={loggedInUserProfile}/>
        <VerifyProfile />
        <ProfilePictures
          handleUploadImage={handleUploadImage}
          selectedImages={selectedImages}
        />
        <MyInterests myInterests={myInterests} onEditIntrest={onEditIntrest} />
        <MyBio setAboutMySelf={setAboutMySelf} aboutMySelf={aboutMySelf} />
        <MyBasics onEditMyBasics={onEditMyBasics} myBasics={myBasics} />
        <MoreAboutMe onEditMoreAboutMe={onEditMoreAboutMe} moreAboutMe={moreAboutMe} />
        <PreferedLandguage language={myLanguage} onEditLanguage={onEditLanguage} />
      </>
    );
  };

  return (
    <LayoutWrapper
      isHeader
      loading={isLoading || isLoggedInUserProfileLoading}
      headerScreenName={'Profile strength'}>
      <ScrollView style={styles.container}>{_renderContent()}</ScrollView>
      <View style={styles.bottomBtn}>
        <DButton
          label={'Submit'}
          onPress={onSubmit}
        />
      </View>
    </LayoutWrapper>
  );
};

const ProfileProgress = ({loggedInUserProfile}) => {
  const completedPercentage = loggedInUserProfile?.total_weightage;
  return (
    <View style={styles.progressContainer}>
      <Text style={styles.grayText14_500}>{completedPercentage}% complete</Text>
      <ArrowRightSvg />
    </View>
  );
};

const VerifyProfile = ({isVerified = false}) => {
  return (
    <View style={styles.verifyProfileContainer}>
      <View style={styles.rowCenterSpaceBetween}>
        <VerifiedSvg />
        <Text style={[styles.blackText16_500, {paddingLeft: 10}]}>{'Verify my profile'}</Text>
      </View>
      <Text style={[styles.blackText16_500, {color: COLORS.DOGER_BLUE}, isVerified ? null : {textDecorationLine:'underline'}]}>{isVerified ? 'Verified' : 'Verify now'}</Text>
    </View>
  );
};

const ProfilePictures = (props) => {
    const { selectedImages, handleUploadImage} = props;
    return (
      <View style={styles.profilePicContainer}>
        <Text style={styles.headingText}>{'Photos and videos'}</Text>
        <Text style={styles.grayTextnormal}>{'Pick some that show the true you'}</Text>
        <View style={{height: 300, marginTop: 20}}>
          <UploadProfilePictures
            selectedImages={selectedImages}
            handleUploadImage={handleUploadImage}
            isEditMode={true}
          />
        </View>
      </View>
    );
}

const MyInterests = props => {
  const {myInterests = [], onEditIntrest} = props;
  return (
    <>
      <View style={styles.myInterestContainer}>
        <Text style={styles.headingText}>{'My interests'}</Text>
        <DPressable style={styles.editIntrestBtn} onPress={onEditIntrest}>
            <EditSvg />
            <Text style={[styles.blackText14_500, { marginLeft: 10}]}>{"Edit"}</Text>
        </DPressable>
      </View>
      <Text style={styles.grayTextnormal}>{'Get specific about the things you love'}</Text>
      <View style={styles.container1}>
        {myInterests.map(item => (
          <View style={styles.nonSelectInterestBoxView} key={item?.id}>
            <Text style={styles.text}>{item?.name}</Text>
          </View>
        ))}
      </View>
    </>
  );
};

const MyBio = (props) => {
  const { aboutMySelf, setAboutMySelf}= props;
  const _onChangeText = (text) => {
    setAboutMySelf(text);
  }
  return (
    <View style={styles.myBioContainer}>
      <Text style={styles.headingText}>{'My Bio'}</Text>
      <Text style={styles.grayTextnormal}>{"Write a fun and punchy intro"}</Text>
      <TextInput
         style={styles.aboutInputText}
         onChangeText={_onChangeText}
         value={aboutMySelf}
         placeholder="Enter about your self"
         multiline = {true}
         numberOfLines = {8}
         textAlignVertical= "top"
         placeholderTextColor={COLORS.PLACEHOLDER_TEXT}
      />
    </View>
  );
};

const MyBasics = (props) => {
    const {myBasics, onEditMyBasics} = props;
    return (
        <>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.headingText}>{'My basics'}</Text>
          <DPressable style={styles.editIntrestBtn} onPress={onEditMyBasics}>
            <EditSvg />
            <Text
              style={[
                styles.blackText14_500,
                {color: COLORS.BLACK, marginLeft: 10},
              ]}>
              {'Edit'}
            </Text>
          </DPressable>
        </View>
        <ProfileInfoRow
            icon={<WorkSvg/>}
            label={"Work"}
            value={myBasics?.work}
        />
         <ProfileInfoRow
            icon={<EducationSvg/>}
            label={"Education"}
            value={myBasics?.education}
        />
         <ProfileInfoRow
            icon={<GenderSvg/>}
            label={"Gender"}
            value={myBasics?.gender === "M" ? "Male" : 'Female'}
        />
         <ProfileInfoRow
            icon={<LocationSvg/>}
            label={"Location"}
            value={myBasics?.location}
        />
         <ProfileInfoRow
            icon={<HomeTownSvg/>}
            label={"Hometown"}
            value={myBasics?.hometown}
        />
        </>
    )
};

const MoreAboutMe = (props) => {
    const { onEditMoreAboutMe, moreAboutMe } = props;
    return (
      <View style={{marginVertical: 30}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.headingText}>{'More about me'}</Text>
          <DPressable style={styles.editIntrestBtn} onPress={onEditMoreAboutMe}>
            <EditSvg />
            <Text
              style={[
                styles.blackText14_500,
                {color: COLORS.BLACK, marginLeft: 10},
              ]}>
              {'Edit'}
            </Text>
          </DPressable>
        </View>
        <Text style={styles.grayTextnormal}>
          {'Cover the things most people are curious about'}
        </Text>
        <ProfileInfoRow
          icon={<HeightSvg />}
          label={'Height'}
          value={moreAboutMe?.height}
        />
        <ProfileInfoRow
          icon={<ExerciseSvg />}
          label={'Exercise'}
          value={moreAboutMe?.exercise ? "Active" : "Inactive"}
        />
        <ProfileInfoRow
          icon={<EducationSvg />}
          label={'Education level'}
          value={moreAboutMe?.education_level}
        />
        <ProfileInfoRow
          icon={<DrinkingSvg />}
          label={'Drinking'}
          value={moreAboutMe?.drinking}
        />
        <ProfileInfoRow
          icon={<HomeTownSvg />}
          label={'Smoking'}
          value={moreAboutMe?.smoking}
        />
        <ProfileInfoRow
          icon={<LookingForSvg />}
          label={'Looking for'}
          value={moreAboutMe?.looking_for}
        />
        <ProfileInfoRow
          icon={<ZodiacSvg />}
          label={'Zodiac'}
          value={moreAboutMe?.zodiac}
        />
        <ProfileInfoRow
          icon={<HomeTownSvg />}
          label={'Religion'}
          value={moreAboutMe?.belief?.[0]?.name}
        />
      </View>
    );
}

const PreferedLandguage = (props) => {
    const { language, onEditLanguage } = props;
    return (
      <View style={{marginBottom: 30}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.headingText}>{'Languages I know'}</Text>
          <DPressable style={styles.editIntrestBtn} onPress={onEditLanguage}>
            <EditSvg />
            <Text
              style={[
                styles.blackText14_500,
                {color: COLORS.BLACK, marginLeft: 10},
              ]}>
              {'Edit'}
            </Text>
          </DPressable>
        </View>
        <View style={styles.container1}>
          {language?.map(item => (
            <View style={styles.nonSelectInterestBoxView} key={item?.id}>
              <Text style={styles.text}>{item?.name}</Text>
            </View>
          ))}
        </View>
      </View>
    );
};

const ProfileInfoRow = props => {
  const {icon, label, value} = props;
  return (
    <View style={[styles.rowCenterSpaceBetween, {marginTop: 10}]}>
      <View style={styles.rowCenter}>
        {icon}
        <Text style={[styles.blackText14_500, {paddingLeft: 10}]}>{label}</Text>
      </View>
      <Text style={styles.grayTextnormal}>{value ? value : '---'}</Text>
    </View>
  );
};

const alignCenter = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: COLORS.WHITE,
  },
  progressContainer: {
    borderWidth: 1,
    borderColor: COLORS.YELLOW_FF,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4,
    marginVertical: 20,
    ...alignCenter,
  },
  blackText14_500:{
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.BLACK,
  },
  grayText14_500: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.GRAY_67,
  },
  grayTextnormal: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.GRAY_67,
  },
  verifyProfileContainer: {
    ...alignCenter,
  },
  rowCenterSpaceBetween:{
    ...alignCenter
  },
  blackText16_500: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.BLACK,
  },
  headingText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.BLACK,
  },
  profilePicContainer: {
    marginVertical: 30,
    //height: 400,
    //backgroundColor: COLORS.RED
  },
  nonSelectInterestBoxView: {
    minWidth: '30%',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#676767',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderColor: COLORS.GRAY_67,
    backgroundColor: COLORS.WHITE
  },
  container1: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 10
  },
  interestHeading: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
    color: COLORS.BLACK
  }, 
  text: {
    color: COLORS.BLACK,
    fontSize: 12,
    fontWeight: '500',
    paddingLeft: 3,
    paddingRight: 3,
  },
  myInterestContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },
  editIntrestBtn: {
    backgroundColor: COLORS.GRAY_C7,
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  myBioContainer: {
    marginVertical: 30
  },
  aboutInputText: {
    //borderWidth: 1,
    padding: 10,
    backgroundColor: COLORS.WHITE_F1_F0,
    borderRadius: 8,
    alignItems: 'flex-start',
    fontSize: 14,
    color: COLORS.BLACK,
    lineHeight: 20,
    marginTop: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  addEditBtn: {
    paddingVertical: 5,
    paddingLeft: 15
  },
  addEditText: {
    textDecorationLine: 'underline',
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.BLACK,
    fontStyle: 'italic'
  },
  bottomBtn: {
    padding: 20,
    backgroundColor: COLORS.WHITE
  }

});

export default EditProfile;
