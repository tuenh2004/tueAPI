import React, {Component} from 'react';

import {Text, View} from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
export default class Slide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [
                require('../../assets/anhBia1.png'),
                require('../../assets/anhBia2.png'),
                require('../../assets/anhBia3.png'),
                require('../../assets/anhBia4.png'),
            ]
        };
    }

    render() {
        return (
            <View>
                <SliderBox
                    images={this.state.images}
                    autoplay={true}
                    circleLoop={true}
                    sliderBoxHeight={200}
                />
            </View>
        );
    }
}
