import React from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import DialogManager, { ScaleAnimation, DialogContent, DialogButton } from 'react-native-dialog-component';

export default class EmergencyIcon extends React.Component {

    sendMessage() {
        console.log("Send message");
    }

    emergencyPopUp() {
        DialogManager.show({
            title: 'Emergency Message',
            titleAlign: 'center',
            animationDuration: 200,
            ScaleAnimation: new ScaleAnimation(),
            children: (
                <DialogContent>
                    <View>
                        <Text>
                            Edit your emergency message:
                        </Text>
                        //TODO: pass in the information from the user's account with props
                        <TextInput value={"I'm dying, halp."} style={{height: 40, borderColor: 'gray', borderWidth: 1}}/>
                        <DialogButton text={"DISMISS"} align={"center"} onPress={this.dismiss}/>
                        <Button title={"Send Emergency Message"} onPress={this.sendMessage}>j</Button>
                    </View>
                </DialogContent>
            ),
        }, () => {
            console.log('callback - show');
        });
    }

    render() {
        return (
            <View>
                <FontAwesome name={'exclamation-circle'} size={25} color={'gray'} onPress={this.emergencyPopUp}/>;
            </View>
        );
    }
}