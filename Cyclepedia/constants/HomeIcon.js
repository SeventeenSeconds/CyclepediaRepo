import React from 'react';
import {View} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';

export default class HomeIcon extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <View>
                <FontAwesome name={'home'} size={25} color={'gray'}/>
            </View>
        );
    }
}