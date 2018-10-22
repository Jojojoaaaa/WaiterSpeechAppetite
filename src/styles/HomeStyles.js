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

    textModal:{
        fontFamily: 'Roboto',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 50,
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
        height: 720, //no height
        width:355, //250 for error
        marginRight: 50,
        marginLeft: 50
    },

    imagewarning:{
        marginBottom:80,
    },

    buttonModal:{
        marginTop: 10,
        height: 35,
        width: 175,

    },




});