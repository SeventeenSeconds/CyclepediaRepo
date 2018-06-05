import React from 'react';
import {ScrollView} from 'react-native';

export default class ScrollPageComponent extends React.Component {

    render() {
        return (
            <ScrollView>
                {this.props.content}
            </ScrollView>
        );
    }
}