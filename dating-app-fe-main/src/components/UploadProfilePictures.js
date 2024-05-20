import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import AddSvg from '../assets/plus.svg';
import {COLORS} from '../common/Colors';
import DIconPressable from './DIconPressable';
import EditSvg from '../assets/editIcon.svg';

const UploadProfilePictures = props => {
  const {selectedImages, handleUploadImage, containerStyle, isEditMode = false} = props;
  return (
    <View style={[styles.pictureViewContainer, containerStyle]}>
      <View style={styles.leftPictureView}>
        <PictureView
          imageUri={selectedImages?.[0]?.uri}
          onPressAddPhoto={() => handleUploadImage(0)}
          isEditMode={isEditMode}
        />
      </View>
      <View style={styles.rightPictureContainer}>
        <View style={styles.rightPictureView}>
          <PictureView
            imageUri={selectedImages?.[1]?.uri}
            onPressAddPhoto={() => handleUploadImage(1)}
            isEditMode={isEditMode}
          />
        </View>
        <View style={styles.rightPictureView}>
          <PictureView
            imageUri={selectedImages?.[2]?.uri}
            onPressAddPhoto={() => handleUploadImage(2)}
            isEditMode={isEditMode}
          />
        </View>
      </View>
    </View>
  );
};

const PictureView = props => {
  const {onPressAddPhoto, imageUri = undefined, isEditMode} = props;
  console.log('imageUri ====> ', imageUri);
  return (
    <View style={styles.pictureContainer}>
      {imageUri ? (
        <>
          <Image source={{uri: imageUri}} style={styles.image} />
          {isEditMode ? (
            <View style={styles.editIcon}>
              <DIconPressable onPress={onPressAddPhoto}>
                <EditSvg />
              </DIconPressable>
            </View>
          ) : null}
        </>
      ) : (
        <AddPhoto onPress={onPressAddPhoto} />
      )}
    </View>
  );
};

const AddPhoto = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.addPhoto}>
      <AddSvg />
      <Text style={styles.addtext}>{'Add Photo'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pictureViewContainer: {
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'space-between',
    // marginVertical: 40,
  },
  leftPictureView: {
    width: '58%',
    height: '100%',
  },
  rightPictureContainer: {
    width: '38%',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between',
  },
  rightPictureView: {
    height: '48%',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  pictureContainer: {
    backgroundColor: '#ECECEC',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  addPhoto: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addtext: {
    color: COLORS.BLACK,
    fontWeight: '500',
    fontSize: 10,
    marginTop: 5,
  },
  editIcon: {
    alignSelf: 'flex-end',
    zIndex: 99,
    position: 'absolute',
    flex: 1,
    bottom:5,
    right: 5

  }
});

export default UploadProfilePictures;
