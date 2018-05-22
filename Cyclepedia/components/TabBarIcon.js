import React from 'react';
import Colors from '../constants/Colors';

export default class TabBarIcon extends React.Component {
    render() {
        return (
            <Ionicons
                name={this.props.name}
                size={26}
                style={{ marginBottom: -3 }}
                color={Colors.green}
            />
        );
    }
}