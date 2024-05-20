import { StyleSheet } from 'react-native';
import { COLORS } from '../common/Colors';
import { Dimensions, PixelRatio } from 'react-native'

const Styles = {
    shadow: {
        elevation: 2,
        shadowColor: COLORS.BLACK,
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: {
            width: 5,
            height: 5,
        },
        backgroundColor: COLORS.WHITE,
    },
    circle: {
        width: 25,
        height: 25,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    loginButton: {
       // position: "relative",
        backgroundColor: "#FFD401",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        width: 280,
        height: 45,
       // left: -50,
    },
    buttonText: {
        color: "black",
        fontWeight: "500",
        fontSize: 14
    },
    enterText: {
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: 8,
        color: "#4D4D4D",
    },
    rectangleBox: {
        width: 108,
        height: 217,
        left: 10,
        top: 400,
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        borderColor: "#676767",
        borderWidth: 1,
        alignItems: "center",
    },
    viewsButton: {
        // position: "absolute",
        width: '100%',
        height: 45,
        borderWidth: 1,
        borderRadius: 10,
    },
    textCenter: {
        flex: 1,
        color: "#000000",
        textAlign: "center",
        top: 10,
    },
    interests: {
        position: 'absolute',
        height: 25,
        borderWidth: 1,
        borderRadius: 10,
    },
    interestsIcon: {
        position: 'absolute',
        height: 25,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#EA133E",
        width: 80,
        height: 21,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    interestItem: {
        flex: 1,
        color: '#000000',
        textAlign: 'center',
        fontSize: 11,
        fontWeight: 400,
        top: 3,
    },
    interestItem1: {
        color: '#000000',
        fontSize: 10,
        fontWeight: 400,
        marginRight: 8,
    },
    interestText: {
        color: "#000000",
        fontWeight: "600",
        fontSize: 18,
        width: 311,
        height: 41,
    },
    textview: {
        position: "absolute",
        width: 42,
        height: 15,
        borderWidth: 1,
        borderColor: "#676767",
        borderRadius: 10,
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center",
        left: -20
    },
    textinputbox: {
        flex: 1,
        color: "#676767",
        textAlign: "center",
        paddingVertical: -2,
        fontSize: 8,
    },
    viewimage: {
        width: 40,
        height: 40,
        bottom: 200,
        right: 120,
        borderRadius: 100,
        overflow: 'hidden',
    },
    view2: {
        width: 11,
        height: 11,
        borderRadius: 100,
        backgroundColor: '#ED2552',
        bottom: 274,
        alignItems: 'center',
        justifyContent: 'center',
        left: 171
    },
    text6: {
        fontFamily: 'Poppins',
        fontWeight: '400',
        fontSize: 7,
        color: '#FFFFFF',
    },
    text4: {
        color: "#000000",
        right: 70,
        fontWeight: "400",
        fontSize: 12,
        bottom: 240,
    },
    text5: {
        color: "#ED2552",
        right: -140,
        fontWeight: "400",
        fontSize: 12,
        bottom: 278,
    },
    text3: {
        color: "#000000",
        right: 70,
        fontWeight: "600",
        fontSize: 16,
        bottom: 240,
    },
    rectangleBox1: {
        width: 335,
        height: 50,
        marginLeft: 30,
        backgroundColor: "#ECECEC",
        borderRadius: 20,
        borderColor: "#ECECEC",
        borderWidth: 1,
        alignItems: "center",
        color: '#ED2552',
        marginBottom: 10
    },
    circle: {
        width: 10,
        height: 10,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 95,
        backgroundColor: '#ED2552',
        marginTop: -26
    },
    circle2: {
        width: 10,
        height: 10,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 20,
        backgroundColor: '#ED2552',
        marginTop: -26
    },
    text7: {
        bottom: 274,
        left: 171,
        color: "#000000",
        fontWeight: "400",
        fontSize: 12,
    },
    logoutButton: {
        backgroundColor: '#ED2552',
        borderRadius: 4,
        alignSelf: 'center',
        bottom: 270,
        right: 70,
        height: 20,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText1: {
        color: 'white',
        fontSize: 10,
        fontWeight: '400',
    },
};

const widthPercentageToDP = (widthPercent) => {
    const screenWidth = Dimensions.get('window').width
    const elemWidth = parseFloat(widthPercent)
    return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100)
};

const heightPercentageToDP = (heightPercent) => {
    const screenHeight = Dimensions.get('window').height
    const elemHeight = parseFloat(heightPercent)
    return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100)
};

const proportionedPixel = (designPixels) => {
    const screenProportion = Dimensions.get('window').width / 180
    return PixelRatio.roundToNearestPixel(designPixels * screenProportion)
};

export {
    widthPercentageToDP,
    heightPercentageToDP,
    proportionedPixel
};

export default Styles;
