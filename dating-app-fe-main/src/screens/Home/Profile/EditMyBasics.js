import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, ScrollView, SafeAreaView } from 'react-native'
import React, { useRef, useState } from 'react';
import { LayoutWrapper } from '../../../components/layoutWrapper/LayoutWrapper';
import { COLORS } from '../../../common/Colors';
import { Input } from 'react-native-elements';
import WorkSvg from '../../../assets/work1.5x.svg';
import EducationSvg from '../../../assets/education1.5x.svg';
import GenderSvg from '../../../assets/gender1.5x.svg';
import LocationSvg from '../../../assets/location1.5x.svg';
import HomeTownSvg from '../../../assets/homeTown1.5x.svg';
import DButton from '../../../components/DButton';
import { INTRESTED_IN_MAP, WORK_DROPDOWN_DATA } from '../../../common/Constants';
import { goBack, setParams } from '../../../navigation/NavigationService';
import DDropDown from '../../../components/DDropDown';

const INPUT_FIELDS_NAME = {
    work: { label: 'Work', keyName: 'work' },
    education: { keyName: 'education', label: 'Education'},
    gender: { keyName: 'gender', label: 'Gender'},
    location: { keyName: 'location', label: 'Location'},
    hometown: {keyName: 'hometown', label: 'Hometown'}
}


const EditMyBasics = (props) => {
  const { myBasics, previousRoute } = props.route?.params || { myBasics: {}, previousRoute: {} };

  const [basicsDetail, setBasicsDetail] = useState({...myBasics});
  const [focusedField, setFocusedField] = useState(null);

  const onChangeFields = (fieldName, value) => {
    const clonedBasicsForm = {...basicsDetail};
    clonedBasicsForm[fieldName] = value;
    setBasicsDetail(clonedBasicsForm);
  };

  const onFocusFileds = (fieldName, event) => {
    setFocusedField(fieldName);
  }

  const onPressSave = () => {
    setParams(previousRoute?.key, {savedMyBasics: basicsDetail});
    goBack();
  };

  const _renderContent = () => {
    return (
      <>
        {/* <Input
          label={INPUT_FIELDS_NAME.work.label}
          labelStyle={styles.inputHeadingText}
          placeholder="Enter your work"
          leftIcon={<WorkSvg />}
          onChangeText={text => onChangeFields(INPUT_FIELDS_NAME.work.keyName, text)}
          value={basicsDetail?.work}
          onFocus={(event) => onFocusFileds(INPUT_FIELDS_NAME.work.keyName, event)}
          inputContainerStyle={focusedField === INPUT_FIELDS_NAME.work.keyName ? styles.inputLine : null}
        /> */}
        <View style={styles.dropDownContainer}>
          <Text style={[styles.inputHeadingText, {paddingBottom: 8}]}>
                {INPUT_FIELDS_NAME.work.label}
          </Text>
          <DDropDown
            onChange={(item) => onChangeFields(INPUT_FIELDS_NAME.work.keyName, item.id)}
            labelField={'name'}
            valueField={'id'}
            placeholder={'Select Work'}
            value={basicsDetail?.work}
            data={WORK_DROPDOWN_DATA}
            dropdownPosition={'bottom'}
            listContainerStyle={{borderRadius: 5}}
            itemContainerStyle={{borderRadius: 5}}
            placeholderStyle={styles.placeholderText}
          />
        </View>

        <Input
          label={INPUT_FIELDS_NAME.education.label}
          labelStyle={styles.inputHeadingText}
          placeholder="Enter your education"
          leftIcon={<EducationSvg />}
          onChangeText={text => onChangeFields(INPUT_FIELDS_NAME.education.keyName, text)}
          value={basicsDetail?.education}
          onFocus={(event) => onFocusFileds(INPUT_FIELDS_NAME.education.keyName, event)}
          inputContainerStyle={focusedField === INPUT_FIELDS_NAME.education.keyName ? styles.inputLine : null}
        />

        <Text style={[styles.inputHeadingText, {paddingLeft: 10}]}>{INPUT_FIELDS_NAME.gender.label}</Text>
        <View style={styles.buttonsContainer}>
          <GenderSvg />
          <DButton
            isTransparent={!(INTRESTED_IN_MAP.MEN.type === basicsDetail?.gender)}
            label={'Male'}
            onPress={() => onChangeFields(INPUT_FIELDS_NAME.gender.keyName, INTRESTED_IN_MAP.MEN.type)}
            additionalStyle={{paddingVertical: 8, marginLeft: 10}}
          />
          <View style={{paddingRight: 40}} />
          <DButton 
            isTransparent={!(INTRESTED_IN_MAP.WOMEN.type === basicsDetail?.gender)}
            label={'Female'}
            onPress={() => onChangeFields(INPUT_FIELDS_NAME.gender.keyName, INTRESTED_IN_MAP.WOMEN.type)}
            additionalStyle={{paddingVertical: 8}}
          />
        </View>

        <Input
          label={INPUT_FIELDS_NAME.location.label}
          labelStyle={styles.inputHeadingText}
          placeholder="Enter your location"
          leftIcon={<LocationSvg />}
          onChangeText={text => onChangeFields(INPUT_FIELDS_NAME.location.keyName, text)}
          value={basicsDetail?.location}
          onFocus={(event) => onFocusFileds(INPUT_FIELDS_NAME.location.keyName, event)}
          inputContainerStyle={focusedField === INPUT_FIELDS_NAME.location.keyName ? styles.inputLine  : null}
        />
        <Input
          label={INPUT_FIELDS_NAME.hometown.label}
          labelStyle={styles.inputHeadingText}
          placeholder="Enter your hometown"
          leftIcon={<HomeTownSvg />}
          onChangeText={text => onChangeFields(INPUT_FIELDS_NAME.hometown.keyName, text)}
          value={basicsDetail?.hometown}
          onFocus={(event) => onFocusFileds(INPUT_FIELDS_NAME.hometown.keyName, event)}
          inputContainerStyle={focusedField === INPUT_FIELDS_NAME.hometown.keyName ? styles.inputLine  : null}
        />
        </>
    );
  }

  return (
    <LayoutWrapper
      isHeader
      headerScreenName={'Edit my basics'}>
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
    fontWeight: 'bold',
    // paddingBottom: 8
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

export default EditMyBasics;