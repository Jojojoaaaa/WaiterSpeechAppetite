import {StyleSheet} from 'react-native';

export default style = StyleSheet.create({
    modalContent:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'rgba(0,0,0,0.75)',
      },

    innerContainer:{
        //justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF8F3',
        borderRadius: 5,
        paddingBottom: 50,
        height: '95%',
        width: '90%',
        marginRight: 50,
        marginLeft: 50
    },

    image:{
        marginBottom:50,
    },

    buttonModal:{
        marginTop: 10,
        height: 35,
        width: 175,

    },
    
    textModal:{
        fontFamily: 'Roboto',
        fontSize: 18,
        fontWeight: 'bold',
        height: '15%',
        color: '#333333',
        textAlign: 'center'
    },
});