import {StyleSheet} from 'react-native';

export default  style = StyleSheet.create({
    container: { 
        height: '100%'
    },

    body: {
        flex:1,
        //backgroundColor: 'green',
    },

    viewStyleOne: {
        //backgroundColor: 'red',
        flex: 0.5,
        justifyContent: 'flex-start',
        alignItems:'flex-end', 
    },

    viewStyleTwo: {
        //backgroundColor: 'red',
        flex: 3.5,
        justifyContent: 'center',
        alignItems:'center', 
    },


    viewStyleThree:{
        //backgroundColor: 'orange',
        flex: 2,
        justifyContent: 'center',
        alignItems:'center', 
        marginTop: 15
    },

    viewStyleFour:{
        //backgroundColor: 'yellow',
        flex: 1.5,
        alignItems:'center', 
    },

    imagewarning:{
        marginBottom:50
    },

    textStyle:{
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 15
    },

    text_input: {
        width: 250, 
        height: 68,
        marginBottom: 15
    },

    buttonModal:{
        marginTop: 50,
        height: 35,
        width: 175,

    },

    buttonSettings:{
        marginTop: 20,
        marginRight: 20,


    },

    modalContent:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'rgba(0,0,0,0.75)'
      },

    innerContainer:{
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F9F9F9',
        borderRadius: 5,
        paddingBottom: 50,
        height: 500, //no height
        width:350, //250 for error
        marginRight: 50,
        marginLeft: 50
    }

});
