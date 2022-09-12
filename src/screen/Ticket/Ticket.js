import React from 'react';
import {View, Image, Text, SafeAreaView} from 'react-native';
import {styles} from '../../contants';

export default function Ticket(props) {
  return (
    <View
      style={[
        styles.container,
        {justifyContent: 'center', alignItems: 'center'},
      ]}>
      <View
        style={{
          backgroundColor: '#fff',
          margin: 6,
          padding: 6,
          height: 200,
          width: 200,
          shadowOpacity: 0.5,
          shadowColor: "#fff", 
          shadowRadius: 15,
          shadowOffset: { width: 1, height: 1}
        }}></View>
    </View>
  );
}
