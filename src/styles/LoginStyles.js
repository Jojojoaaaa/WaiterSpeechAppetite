import {StyleSheet} from 'react-native';

export default  style = StyleSheet.create({
    container: {
        paddingTop: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 200, 
        height: 200,
        marginTop: 50, 
        marginBottom: 75
    },
    text_input: {
        width: 250, 
        height: 70,
        marginBottom: 15
    },

    button:{
        marginTop: 50,
        width:150,
        backgroundColor: '#da8c75',
        borderColor: 'transparent'   
    },

    modalContent:{
        backgroundColor: 'white',
        marginTop:100,
        marginLeft:50,
        marginRight:50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0,0,0,0.5)',
      }

});