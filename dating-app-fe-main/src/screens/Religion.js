import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  FlatList
} from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { SCREENS_NAME } from "../navigation/ScreensName";
import BoxOption from "../components/RectangleTextBox";
import ScreenContainer from "../components/ScreenContainer";
import { LayoutWrapper } from "../components/layoutWrapper/LayoutWrapper";
import { COLORS } from "../common/Colors";
import { getBeliefs } from "../services/RegisterService";
import { RESGISTER_TOTAL__COUNT } from "../common/Constants";
import { REGISTER_STATE_KEY_NAMES, setRegisterFormData } from "../redux/slices/registerSlices";
import { goBack, navigate } from "../navigation/NavigationService";

const SelectReligionScreen = (props) => {
  const dispatch = useDispatch();
  const [selectedReligion, setSelectedReligion] = useState(null);
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

  const onPressNextButton = () => {
    if (selectedReligion) {
      dispatch(setRegisterFormData({keyName: REGISTER_STATE_KEY_NAMES.belief, value: [selectedReligion.id]}));
      navigate(SCREENS_NAME.INTERESTSPAGE);
    }
    else {
      alert("Please select at least one belief");
    }
  };

  const handleReligionClick = (religion) => {
    setSelectedReligion(religion);
  };

  const _renderItem = ({item, index}) => {
    return (
      <BoxOption
        key={index}
        onPress={() => handleReligionClick(item)}
        label={item.name}
        isClicked={selectedReligion?.id === item?.id}
        style={{marginTop: 10}}
      />
    );
  };

  const _keyExtractor = item => Math.random().toString();

  return (
    <LayoutWrapper loading={isLoading}>
      <ScreenContainer
        onPressBack={goBack}
        isShowStepperCount={true}
        totalCount={RESGISTER_TOTAL__COUNT}
        selectedCount={6}
        onPressNext={onPressNextButton}
        >
        <View style={styles.container}>
          <Text style={styles.text2}>{'What’s your religious beliefs?'}</Text>
          <FlatList
            data={religionData}
            renderItem={_renderItem}
            keyExtractor={_keyExtractor}
            style={{marginTop: 20}}
          />
        </View>
      </ScreenContainer>
    </LayoutWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 50,
  },
  text2: {
    color: COLORS.BLACK,
    fontWeight: '700',
    fontSize: 28,
    textAlign: 'center'
  }
});

export default SelectReligionScreen;