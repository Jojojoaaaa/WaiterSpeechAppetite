import {StyleSheet} from 'react-native';

export default  style = StyleSheet.create({
    container: {
        height: '100%',
    },

    body: {
        flex:1,
        
    },

    boxOne: {
        flex:0.3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 15,
        paddingLeft: 15,
    },

    filler:{
        flex:3
    },

    boxTwo: {
        flex:2,
        alignItems: 'center',
        justifyContent: 'center',
    },


    textHeading:{
        fontFamily: 'Roboto',
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333333'
    },

    bg:{
        position: 'absolute',
        width: '100%',
        height: '100%',
    },

    image: {
        marginTop: 40,
    },
    bell: {
        height: 30, 
        width: 30
    },
});