import React, {useState} from 'react';
import {
  SectionList,
  View,
  Text,
  Image,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {colors, icons, styles, images} from '../contants/index';
import SettingData from '../data/SettingData';
import Header from '../component/Header';

const Item = ({item}) => {
  return (
    <View style={{marginHorizontal: 6}}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          padding: 6,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={{uri: item.icon}}
          style={{height: 20, width: 20, marginRight: 6, tintColor: '#fff'}}
          resizeMode={'contain'}
        />
        <Text
          style={{
            fontSize: 14,
            margin: 6,
            color: '#fff',
          }}>
          {item.name}
        </Text>
        <View style={{flex: 1}} />
        <Text style={{margin: 6, color: '#fff'}}>{item.more}</Text>
        <TouchableOpacity>
          <Image
            source={item.ui}
            style={{
              height: 20,
              width: 20,
              tintColor: '#fff',
            }}
            resizeMode={'stretch'}
          />
        </TouchableOpacity>
      </View>
      <View style={{height: 0.5, width: '100%', backgroundColor: '#686868'}} />
    </View>
  );
};

export default function Setting(props) {
  const [data, setData] = useState(SettingData);
  const scrollY = new Animated.Value(0);
  const diff = Animated.diffClamp(scrollY, 0, 55);
  const translateY = diff.interpolate({
    inputRange: [0, 55],
    outputRange: [0, -55],
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          {
            transform: [
              {
                translateY: translateY,
              },
            ],
            elevation: 4,
            zIndex: 1000,
          },
        ]}>
          <Header title={'Setting'} />
      </Animated.View>
      <SectionList
        bounces={false}
        scrollEventThrottle={5}
        style={{
          marginBottom: 75,
          flex: 1,
        }}
        onScroll={e => {
          scrollY.setValue(e.nativeEvent.contentOffset.y);
        }}
        showsVerticalScrollIndicator={false}
        sections={data}
        keyExtractor={(item, index) => item + index}
        renderItem={Item}
        renderSectionHeader={({section: {title}}) => (
          <View
            style={{
              fontSize: 16,
              backgroundColor: 'rgba(255,255,255,0.3)',
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                marginHorizontal: 10,
                marginVertical: 4,
                color: '#fff',
              }}>
              {title}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
