import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Modal,
} from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { SCREENS_NAME } from "../navigation/ScreensName";
import DocumentPicker from "react-native-document-picker";
import { LayoutWrapper } from "../components/layoutWrapper/LayoutWrapper";
import ScreenContainer from "../components/ScreenContainer";
import { COLORS } from "../common/Colors";
import DButton from "../components/DButton";
import { RESGISTER_TOTAL__COUNT } from "../common/Constants";
import { REGISTER_STATE_KEY_NAMES, setRegisterFormData } from "../redux/slices/registerSlices";
import { goBack, navigate } from "../navigation/NavigationService";
import UploadProfilePictures from "../components/UploadProfilePictures";


const SelectImagesScreen = (props) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImages, setSelectedImages] = React.useState([]);
  const dispatch = useDispatch();

  const handleModalClose = () => {
    setModalVisible(false);
  };

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

  const handleContinueButton = () => {
    if (selectedImages.length !== 3) {
      setModalVisible(true);
    } else {
      dispatch(setRegisterFormData({keyName: REGISTER_STATE_KEY_NAMES.profilePics, value: selectedImages}));
      navigate(SCREENS_NAME.COFFEE_DATING);
    }
  };

  const handleTryButton = () => {
    setModalVisible(false);
  };

  return (
    <LayoutWrapper>
      <ScreenContainer
        onPressBack={goBack}
        isShowStepperCount={true}
        totalCount={RESGISTER_TOTAL__COUNT}
        selectedCount={8}
        onPressNext={handleContinueButton}>
        <View style={styles.container}>
          <Text style={styles.text2}>{'It’s all about presentation'}</Text>
          <Modal
            animationType="fade"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={handleModalClose}>
            <View style={styles.modalOverlay}>
              <View style={styles.rectangle}>
                <Text style={[styles.text3, {color: COLORS.WHITE, marginBottom: 40}]}>Upload at least 3 photos.</Text>
                <DButton
                  yellowButton={true}
                  label="Try again"
                  onPress={handleTryButton}
                  additionalTextStyle={{
                    color: COLORS.BLACK,
                    fontWeight: '600',
                    fontSize: 16,
                  }}
                />
              </View>
            </View>
          </Modal>
          <View style={{height: '60%', marginVertical: 40}}>
            <UploadProfilePictures
              selectedImages={selectedImages}
              handleUploadImage={handleUploadImage}
            />
          </View>
          <Text style={styles.text3}>{'Upload 3 photos to proceed'}</Text>
        </View>
      </ScreenContainer>
    </LayoutWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 20,
  },
  text2: {
    color: COLORS.BLACK,
    fontWeight: '700',
    fontSize: 28,
    textAlign: 'center'
  },
  rectangle: {
    backgroundColor: COLORS.APP_THEME,
    justifyContent: "center",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 25,
    width: '85%',
  },
  modalOverlay: {
    backgroundColor: "rgba(247, 247, 247, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  text3: {
    color: COLORS.BLACK,
    fontWeight: "500",
    fontSize: 16,
    textAlign: 'center'
  },
});

export default SelectImagesScreen;
