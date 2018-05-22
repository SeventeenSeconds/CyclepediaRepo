import React, { Component } from 'react';
import {Ionicons} from '@expo/vector-icons';

export default class TabBarIcon extends React.Component {
    render(){
        return (
            <Ionicons
                name={this.props.name}
                size={26}
                />
        );
    }
}