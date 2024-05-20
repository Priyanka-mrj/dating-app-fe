import { COLORS } from "../../../common/Colors";

const styles = {
    container: {
        flex: 1,
        backgroundColor: COLORS.PROFILE_BG,
        alignItems: "center",
       // justifyContent: "center",
    },
    text2: {
        color: COLORS.BLACK,
        fontWeight: "700",
        fontSize: 28,
        marginRight: 10,
    },
    searchContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        borderColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 8,
        width: 300,
        height: 40,
        top: 10,
        backgroundColor: '#FFFFFF',
        marginBottom: 20
    },
    container1: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
    },
    texts1: {
        position: "relative",
        marginLeft: 90,
        top: -50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
    },
    texts2: {
        color: "#000000",
        top: 80,
        right: 30,
        fontWeight: "700",
        fontSize: 28,
        width: 282,
        height: 42,
        backgroundColor: "#FFFFFF",
    },
    searchContainer1: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#FFD401',
        borderWidth: 1,
        borderRadius: 5,
        width: 310,
        height: 40,
        top: 60,
        zIndex: 10,
        backgroundColor: '#FFFFFF'
    },
    input: {
        left: 20,
        marginBottom: 0
    },
    icon: {
        width: 15,
        height: 15,
        tintColor: '#676767',
        left: 10
    },
    historyview: {
        width: 183,
        borderColor: '#0000009C',
        borderWidth: 1,
        borderRadius: 4,
        height: 40,
        top: 35,
        backgroundColor: '#FFFFFF',
        left: 175
    },
    historytext: {
        fontSize: 14,
        fontWeight: 400,
        color: '#000000',
        left: 40,
        top: -8
    }
};

export default styles;
