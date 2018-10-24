import {StyleSheet} from 'react-native';

export default style = StyleSheet.create({
    modalContent:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'rgba(0,0,0,0.75)'
    },
    innerContainer:{
        alignItems: 'center',
        backgroundColor: '#FFF8F3',
        borderRadius: 5,
        paddingBottom: 50,
        height: 250, //no height
        width:325, //250 for error
        marginRight: 50,
        marginLeft: 50
    },

    textModal:{
        fontFamily: 'Roboto',
        fontSize: 16,
        color: '#333333'
    },

    image:{
        marginBottom:20,
    },

    buttonModal:{
        marginTop: 30,
        width:160,
        height: 32
    },
});