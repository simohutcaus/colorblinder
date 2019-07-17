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
    }
});