import {StyleSheet} from 'react-native';

export default style = StyleSheet.create({
    modalContent:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'rgba(0,0,0,0.5)'
    },
    
    innerContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F9F9F9',
        borderRadius: 5,
        paddingBottom: 50,
        marginRight: 50,
        marginLeft: 50
    },

    imagewarning:{
        marginBottom:30,
    },

    textStyle:{
        alignContent: 'center',
        fontSize: 16
    },

    buttonModal:{
        marginTop: 50,
        height: 35,
        width: 175,

    },
})