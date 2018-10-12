import React, {Component}from 'react';
import {Image} from 'react-native';

import { connect } from 'react-redux';

import axios from '../axios';

import * as url from '../constants/urls';

class CategoryImageContainer extends Component {
    constructor (props){
        super(props)
        this.state = {
            image: ''
        }
    }
    componentWillMount(){
        this.getCategoryImage();
    }
    
    getCategoryImage = () => {
        const post_data = {category_id: this.props.category_id};
        axios.post(this.props.main_url + url.RETRIEVE_CATEGORY_IMAGE,post_data)
          .then(response => {
            const image = response.data;
            this.setState({image: image});
          })
      }
    render() {
        const {image} = this.state;
        const style = this.props.style;
        return (
            <Image
                source = {{uri: "data:image/png;base64," + image}}
                style={style}/>      
        )
    }
}
mapStateToProps = state => {
    return {
      main_url: state.main_url
    };
};

export default connect(mapStateToProps) (CategoryImageContainer);
