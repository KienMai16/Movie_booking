import React, {useRef, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  Animated,
  StatusBar,
} from 'react-native';
import {colors, icons, styles, images} from '../contants/index';

export default function Main(props) {
  const {navigation, router} = props;
  const {navigate, goBack} = navigation;
  const progess = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.spring(progess, {toValue: 0.5, useNativeDriver: true}),
          Animated.spring(progess, {toValue: 1, useNativeDriver: true}),
        ]),
        Animated.sequence([
          Animated.spring(scale, {toValue: 1.5, useNativeDriver: true}),
          Animated.spring(scale, {toValue: 1.3, useNativeDriver: true}),
        ]),
      ]),
      {iterations: 1},
    ).start();
  }, []);

  setTimeout(() => {
    navigate('SignIn');
  }, 3000);

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={colors.dark}
        hidden={false}
      />
      <ImageBackground
        source={images.image_background}
        resizeMode="cover"
        style={styles.image_background}>
        <Animated.Image
          source={icons.icon_app}
          style={{
            height: 100,
            width: 100,
            justifyContent: 'center',
            alignSelf: 'center',
            opacity: progess,
            transform: [{scale}],
          }}
          resizeMode="contain"
        />
        <Text
          style={{
            alignSelf: 'center',
            color: 'white',
            fontSize: 26,
            marginTop: 24,
            fontWeight: 'bold',
          }}>
          Booking
        </Text>
      </ImageBackground>
    </View>
  );
}
