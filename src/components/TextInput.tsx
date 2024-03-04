import React from 'react';
import {TextInputProps, ViewStyle} from 'react-native';
import {Item, Label, Input} from 'native-base';

interface InputProps extends TextInputProps {
  error?: boolean;
  Labelcolor?: string;
  label?: string;
  placeholderColor?: string;
  borderColor?: string;
  containerStyle?: ViewStyle;
}

const TextInput = (props: InputProps) => {
  return (
    <Item
      floatingLabel
      style={{
        width: '95%',
        marginTop: 10,
        marginBottom: 10,
        borderBottomColor: props.error ? 'red' : props.borderColor,
        ...props.containerStyle,
      }}
      error={props.error}>
      <Label
        style={{
          fontSize: 12,
          fontWeight: 'bold',
          color: props.Labelcolor,
        }}>
        {props.label}
      </Label>
      <Input
        value={props.value}
        onChangeText={props.onChangeText}
        selectionColor={'black'}
        style={{
          fontSize: 12,
          color: props.placeholderColor,
        }}
        autoCapitalize="none"
        returnKeyType="next"
        {...props}
      />
      {/* {props.error && (
        <Text style={{color: 'red', fontSize: 10}}>{props.error}</Text>
      )} */}
    </Item>
  );
};

export default TextInput;
