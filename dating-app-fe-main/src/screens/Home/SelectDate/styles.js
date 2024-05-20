import { COLORS } from "../../../common/Colors";
import STYLES from '../../../common/CommonStyles';
import { SCREEN_WIDTH } from "../../../common/Constants";

const styles = {
  calenderContainer: {
    borderWidth: 1,
    height: 'auto',
    width: SCREEN_WIDTH - 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderColor: '#E5E7F0',
    borderWidth: 1,
    ...STYLES.shadow,
  },
  datecontainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headingText: {
    color: COLORS.BLACK,
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 10,
  },
  selectcontainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text1: {
    position: 'relative',
    marginLeft: 90,
    top: -50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text2: {
    color: '#000000',
    fontWeight: '700',
    fontSize: 28,
  },
  text3: {
    color: '#000000',
    fontWeight: '400',
    fontSize: 12,
    width: 256,
    height: 36,
    marginTop: 10,
    marginLeft: 70,
  },
  rectangleBox: {
    width: 320,
    height: 320,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderColor: '#E5E7F0',
    borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  selectedDateBox: {
    width: 40,
    height: 48,
    top: 132,
    left: 125,
    borderRadius: 8,
    backgroundColor: '#ED2552', // Background color as needed
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDateText: {
    color: '#ffffff', // Text color as needed
  },
  arrowContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: 30,
  },
  timeText: {
    fontSize: 24,
    marginHorizontal: 5,
    color: '#454545',
    fontWeight: 400,
  },
  colon: {
    fontSize: 24,
    marginHorizontal: 5,
    left: 65,
  },
  ampmText: {
    fontSize: 16,
    marginHorizontal: 5,
    left: 140,
    color: '#454545',
    fontWeight: 400,
  },
  outerRectangle: {
    borderRadius: 10,
    borderColor: '#ED2552',
    backgroundColor: '#ED2552',
    alignItems: 'center',
    marginBottom: 20,
    alignItems: 'flex-end',
  },
  innerRectangle: {
    ...STYLES.shadow,
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7F0',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: '95%',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  rectangleBox1: {
    width: 320,
    height: 320,
    left: 35,
    top: 80,
    backgroundColor: 'transparent',
    borderColor: 'rgba(255, 255, 255, 0)',
    borderWidth: 0,
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  text: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 500,
  },
  btnContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
    justifyContent: 'space-between',
    paddingHorizontal: 30
  },
};

export default styles;