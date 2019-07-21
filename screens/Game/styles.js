import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a0a0a',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomContainer: {
        width: Dimensions.get("window").width * 0.875,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    counterCount: {
        fontFamily: 'dogbyte',
        textAlign: 'center',
        color: '#eee',
        fontSize: 50,
        marginTop: 15,
        
    },
    counterLabel: {
        fontFamily: 'dogbyte',
        textAlign: 'center',
        color: '#bbb',
        fontSize: 20,
        marginTop: 15
    },
    bestContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    bestIcon: {
        width: 25,
        height: 25,
        marginRight: 5
    },
    bestLabel: {
        fontFamily: 'dogbyte',
        color: '#bbb',
        fontSize: 25,
        marginTop: 2.5
    },
    longTimeIcon: {
        width: 25,
        height: 25,
        marginRight: 5
    },
    bestTimeLabel: {
        fontFamily: 'dogbyte',
        color: '#bbb',
        fontSize: 25,
        marginTop: 2.5
    },
    pausedContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    pausedText: {
        fontFamily: 'dogbyte',
        textAlign: 'center',
        color: '#eee',
        marginTop: 20,
        fontSize: 60
    },
    pausedIcon: {
        width: 80,
        height: 80
    }
});