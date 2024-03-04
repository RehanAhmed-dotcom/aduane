import React from 'react';
import {View, Text, Modal, TouchableOpacity} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Entypo from 'react-native-vector-icons/Entypo';
import TextInput from '@src/components/TextInput';
import {Form, shadow} from '@src/utilis';

export default function UpdateInputModal(props: any) {

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.isVisible}
      onRequestClose={props.onClose}>
      <Form style={{flex: 1}} behavior="padding">
        <View
          style={{flex: 1, justifyContent: 'center', paddingHorizontal: 15}}>
          <View
            style={{
              height: hp(40),
              backgroundColor: 'white',
              padding: 15,
              ...shadow,
            }}>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <TouchableOpacity onPress={props.onClose}>
                <Entypo name="circle-with-cross" size={20} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: 100,
                marginTop: 30,
                borderColor: '#ccc',
                borderWidth: 1,
                alignItems: 'center',
              }}>
              <TextInput
                value={props.value?props.value:'xxxxxxxxx'}
                onChangeText={props.onChangeText}
                Labelcolor={'black'}
                placeholderColor={'black'}
                borderColor={'black'}
                error={props.error}
                selectionColor={'black'}
                label={props.label }
                {...props.inputProps}
              />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={props.onUpdate}
                style={{
                  backgroundColor: 'red',
                  height: 50,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                }}>
                <Text style={{color: 'white'}}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Form>
    </Modal>
  );
}
