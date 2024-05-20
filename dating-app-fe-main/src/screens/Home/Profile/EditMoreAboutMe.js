import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react';
import { LayoutWrapper } from '../../../components/layoutWrapper/LayoutWrapper';
import { COLORS } from '../../../common/Colors';
import DTextInput from '../../../components/DTextInput';
import { Input, CheckBox } from 'react-native-elements';
import HeightSvg from '../../../assets/height1.5x.svg';
import ExerciseSvg from '../../../assets/exercise1.5x.svg';
import EducationSvg from '../../../assets/education1.5x.svg';
import DrinkigSvg from '../../../assets/drinking1.5x.svg';
import LookingForSvg from '../../../assets/lookingFor1.5x.svg';
import ZodiacSvg from '../../../assets/zodiac1.5x.svg';
import HomeTownSvg from '../../../assets/homeTown1.5x.svg';
import DButton from '../../../components/DButton';
import { goBack, setParams } from '../../../navigation/NavigationService';
import { formatToFeetAndInches } from '../../../common/CommonUtils';
import DDropDown from '../../../components/DDropDown';
import { getBeliefs } from '../../../services/RegisterService';
import {
  DRINKING_DROPDOWN_DATA,
  EDUCATION_DROPDOWN_DATA,
  HEIGHT_DROPDOWN_DATA,
  SMOKING_DROPDOWN_DATA,
  WORKOUT_DROPDOWN_DATA,
  ZODIAC_DROPDOWN_DATA,
  LOOKINGFOR_DROPDOWN_DATA,
} from '../../../common/Constants';

const INPUT_FIELDS_NAME = {
    height: { label: 'Height', keyName: 'height' },
    exercise: { keyName: 'exercise', label: 'Exercise'},
    education_level: { keyName: 'education_level', label: 'Education Level'},
    drinking: { keyName: 'drinking', label: 'Drinking'},
    smoking: {keyName: 'smoking', label: 'Smoking'},
    looking_for: { keyName: 'looking_for', label: 'Looking For'},
    zodiac: { keyName: 'zodiac', label: 'Zodiac'},
    belief: {keyName: 'belief', label: 'Religion'}
}

const EditMoreAboutMe = (props) => {
  const { moreAboutMeDetails, previousRoute } = props.route?.params || { moreAboutMeDetails: {}, previousRoute: {} }

  const [moreAboutMe, setBasicsDetail] = useState({...moreAboutMeDetails});
  const [focusedField, setFocusedField] = useState(null);
  const [religionData, setRelegionData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const getBeliefsData = async () => {
    setLoading(true);
    const res = await getBeliefs();
    setRelegionData(res);
    setLoading(false);
  }

  useEffect(() => {
    getBeliefsData();
  }, []);


  const onChangeFields = (fieldName, value) => {
    const clonedForm = {...moreAboutMe};
    // if(fieldName === INPUT_FIELDS_NAME.height.keyName) {
    //   const numericValue = value.replace(/[^0-9]/g, "");
    //   const formattedValue = formatToFeetAndInches(numericValue);
    //   clonedForm[fieldName] = formattedValue;
    // }
    // else 
    if(fieldName === INPUT_FIELDS_NAME.belief.keyName) {
      clonedForm[fieldName] = [value];
    }
    else {
      clonedForm[fieldName] = value;
    }
    
    setBasicsDetail(clonedForm);
  };

  const onFocusFileds = (fieldName, event) => {
    setFocusedField(fieldName);
  }

  const onPressSave = () => {
    setParams(previousRoute?.key, {savedMoreAboutMe: moreAboutMe});
    goBack();
  };

  const _renderContent = () => {
    return (
      <>
        <View style={styles.dropDownContainer}>
         <View style={styles.HeadingContainer}>
          <Text style={styles.inputHeadingText}>
              {INPUT_FIELDS_NAME.height.label}
            </Text>
            <HeightSvg/>
         </View>
          <DDropDown
            onChange={(item) => onChangeFields(INPUT_FIELDS_NAME.height.keyName, item.id)}
            labelField={'name'}
            valueField={'id'}
            placeholder={'Select Height'}
            value={moreAboutMe?.height}
            data={HEIGHT_DROPDOWN_DATA}
            dropdownPosition={'bottom'}
            listContainerStyle={{borderRadius: 5}}
            itemContainerStyle={{borderRadius: 5}}
            placeholderStyle={styles.placeholderText}
          />
        </View>

        <View style={styles.dropDownContainer}>
          <View style={styles.HeadingContainer}>
            <Text style={styles.inputHeadingText}>
              {INPUT_FIELDS_NAME.exercise.label}
            </Text>
            <ExerciseSvg />
          </View>
          <DDropDown
            onChange={(item) => onChangeFields(INPUT_FIELDS_NAME.exercise.keyName, item.id)}
            labelField={'name'}
            valueField={'id'}
            placeholder={'Select Exercise'}
            value={moreAboutMe?.exercise}
            data={WORKOUT_DROPDOWN_DATA}
            dropdownPosition={'bottom'}
            listContainerStyle={{borderRadius: 5}}
            itemContainerStyle={{borderRadius: 5}}
            placeholderStyle={styles.placeholderText}
          />
        </View>

        <View style={styles.dropDownContainer}>
          <View style={styles.HeadingContainer}>
            <Text style={styles.inputHeadingText}>
              {INPUT_FIELDS_NAME.education_level.label}
            </Text>
            <EducationSvg/>
          </View>
          <DDropDown
            onChange={(item) => onChangeFields(INPUT_FIELDS_NAME.education_level.keyName, item.id)}
            labelField={'name'}
            valueField={'id'}
            placeholder={'Select Education'}
            value={moreAboutMe?.education_level}
            data={EDUCATION_DROPDOWN_DATA}
            dropdownPosition={'bottom'}
            listContainerStyle={{borderRadius: 5}}
            itemContainerStyle={{borderRadius: 5}}
            placeholderStyle={styles.placeholderText}
          />
        </View>

        <View style={styles.dropDownContainer}>
          <View style={styles.HeadingContainer}>
            <Text style={styles.inputHeadingText}>
              {INPUT_FIELDS_NAME.drinking.label}
            </Text>
            <DrinkigSvg />
          </View>
          <DDropDown
            onChange={(item) => onChangeFields(INPUT_FIELDS_NAME.drinking.keyName, item.id)}
            labelField={'name'}
            valueField={'id'}
            placeholder={'Select Drinking'}
            value={moreAboutMe?.drinking}
            data={DRINKING_DROPDOWN_DATA}
            dropdownPosition={'bottom'}
            listContainerStyle={{borderRadius: 5}}
            itemContainerStyle={{borderRadius: 5}}
            placeholderStyle={styles.placeholderText}
          />
        </View>

        <View style={styles.dropDownContainer}>
          <View style={styles.HeadingContainer}>
            <Text style={styles.inputHeadingText}>
              {INPUT_FIELDS_NAME.smoking.label}
            </Text>
            <HomeTownSvg/>
          </View>
          <DDropDown
            onChange={(item) => onChangeFields(INPUT_FIELDS_NAME.smoking.keyName, item.id)}
            labelField={'name'}
            valueField={'id'}
            placeholder={'Select Smoking'}
            value={moreAboutMe?.smoking}
            data={SMOKING_DROPDOWN_DATA}
            dropdownPosition={'bottom'}
            listContainerStyle={{borderRadius: 5}}
            itemContainerStyle={{borderRadius: 5}}
            placeholderStyle={styles.placeholderText}
          />
        </View>

         <View style={styles.dropDownContainer}>
          <View style={styles.HeadingContainer}>
              <Text style={styles.inputHeadingText}>
                {INPUT_FIELDS_NAME.looking_for.label}
              </Text>
              <LookingForSvg/>
            </View>
          <DDropDown
            onChange={(item) => onChangeFields(INPUT_FIELDS_NAME.looking_for.keyName, item.id)}
            labelField={'name'}
            valueField={'id'}
            placeholder={'Select Looking for'}
            value={moreAboutMe?.looking_for}
            data={LOOKINGFOR_DROPDOWN_DATA}
            dropdownPosition={'bottom'}
            listContainerStyle={{borderRadius: 5}}
            itemContainerStyle={{borderRadius: 5}}
            placeholderStyle={styles.placeholderText}
          />
        </View>

        <View style={styles.dropDownContainer}>
          <View style={styles.HeadingContainer}>
            <Text style={styles.inputHeadingText}>
              {INPUT_FIELDS_NAME.zodiac.label}
            </Text>
            <ZodiacSvg/>
          </View>
          <DDropDown
            onChange={(item) => onChangeFields(INPUT_FIELDS_NAME.zodiac.keyName, item.id)}
            labelField={'name'}
            valueField={'id'}
            placeholder={'Select Zodiac'}
            value={moreAboutMe?.zodiac}
            data={ZODIAC_DROPDOWN_DATA}
            dropdownPosition={'top'}
            listContainerStyle={{borderRadius: 5, bottom: 5}}
            itemContainerStyle={{borderRadius: 5}}
            placeholderStyle={styles.placeholderText}
          />
        </View>

        <View style={styles.dropDownContainer}>
          <View style={styles.HeadingContainer}>
            <Text style={styles.inputHeadingText}>
              {INPUT_FIELDS_NAME.belief.label}
            </Text>
            <HomeTownSvg/>
          </View>
          <DDropDown
            onChange={(item) => onChangeFields(INPUT_FIELDS_NAME.belief.keyName, item)}
            labelField={'name'}
            valueField={'id'}
            placeholder={'Select Religion'}
            value={moreAboutMe?.belief?.[0]?.id}
            data={religionData}
            dropdownPosition={'top'}
            listContainerStyle={{borderRadius: 5, bottom: 5}}
            itemContainerStyle={{borderRadius: 5}}
            placeholderStyle={styles.placeholderText}
          />
        </View>
      </>
    );
  }

  return (
    <LayoutWrapper
      loading={isLoading}
      isHeader
      headerScreenName={'Edit more about me'}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        style={{flex: 1, backgroundColor: COLORS.WHITE}}>
        <ScrollView style={{flex: 1}} contentContainerStyle={styles.container}>
          {_renderContent()}
        </ScrollView>
        <DButton
          label={'Save'}
          onPress={onPressSave}
          additionalStyle={{marginHorizontal: 20, marginBottom: 20}}
        />
      </KeyboardAvoidingView>
    </LayoutWrapper>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 20,
  },
  inputHeadingText: {
    color: COLORS.BLACK,
    fontSize: 14,
    fontWeight: '500',
    paddingRight: 10
  },
  inputLine: {
    borderBottomColor: COLORS.APP_THEME,
    borderBottomWidth: 1.5
  },
  buttonsContainer: {
    flexDirection: 'row', 
    paddingVertical: 20, 
    paddingLeft: 10,
    alignItems: 'center'
  },
  dropDownContainer: {
    paddingLeft: 10, 
    paddingBottom: 20
  },
  placeholderText: {
    color: COLORS.PLACEHOLDER_TEXT,
    fontSize: 14
  },
  HeadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8
  }
});

export default EditMoreAboutMe;