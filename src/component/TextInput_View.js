import {
  TextInput,
  View,
  Image,
  Text,
} from 'react-native';
import React from 'react';
import {colors, styles, icons} from '../contants/index';

export default function TextInput_View(props) {
  const {
    title,
    placeholder,
    keyboardType,
    inlineImageLeft,
    secureTextEntry,
    onChangeText,
    value,
    source_image,
    onSubmitEditing,
    error,
  } = props;
  return (
    <View
      style={{
        marginHorizontal: 6,
        justifyContent: 'center',
        marginTop: 12,
      }}>
      <Text style={{color: '#fff', fontWeight: 'normal'}}>{title}</Text>
      <View
        style={{
          height: 44,
          width: '100%',
          borderWidth: 0.6,
          borderRadius: 12,
          borderColor: '#aaaaaa',
          backgroundColor: 'white',
          opacity: 0.5,
          alignItems: 'center',
          // opacity: 0.3,
          padding: 12,
          flexDirection: 'row',
        }}>
        <Image source={{uri: source_image}} style={styles.ic_input} />
        <TextInput
          style={{
            height: 44,
            marginRight: 12,
            color: '#000',
          }}
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          inlineImageLeft={inlineImageLeft}
          onSubmitEditing={onSubmitEditing}
        />

        <Text style={{color: '#fff', fontWeight: 'normal', fontSize: 18, marginTop: 6 }}>
          {error}
        </Text>
      </View>
    </View>
  );
}
