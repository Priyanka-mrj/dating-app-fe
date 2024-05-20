import { StyleSheet } from 'react-native'
import { COLORS, FONT_FAMILY } from '../../common/Colors'
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../common/Constants'

const styles = StyleSheet.create({
    rootView: {
        flex: 1,
        backgroundColor: COLORS.GREY_F5,
        //zIndex: 1
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: COLORS.BG_MODAL
    },
    lottie: {
        width: 100,
        height: 100,
      },
});

export default styles
