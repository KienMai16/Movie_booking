import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';
import { styles, colors } from '../contants';
export default function Header(props) {
    const {title} = props
    return (
      <View
        style={[styles.headerContainer, {backgroundColor: '#010911'}]}>
        <Text
          style={{color: '#fff', fontSize: 20, fontWeight: '700'}}>
          {title}
        </Text>
      </View>
    );
};
