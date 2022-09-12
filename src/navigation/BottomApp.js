import {Image, Text, TouchableOpacity, View} from 'react-native';
import {colors, icons, styles} from '../contants/index';

import Movie from '../screen/Home/Home';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import SearchID from '../screen/Home/SearchID';
import Setting from '../screen/Setting';
import Ticket from '../screen/Ticket/Ticket';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useRef } from 'react';

const screenOptions = ({route}) => ({
  headerShown: false,
  tabBarHideOnKeyboard: true,
  tabBarShowLabel: false,
  tabBarStyle: [
    {
      height: 50,
      position: 'absolute',
      bottom: 8,
      right: 8,
      left: 8,
      borderRadius: 25,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: '#fff',
    },
    null,
  ],
  tabBarActiveTintColor: '#fff',
  tabBarInActiveTintColor: '#eeeeee',
  tabBarActiveBackgroundColor: colors.bottom_bar,
  tabBarInactiveBackgroundColor: colors.bottom_bar,
  tabBarLabelStyle: [{marginBottom: 3}],
  tabBarIcon: ({focused, colors, size}) => {
    const ic =
      route.name == 'Movie'
        ? 'https://i.postimg.cc/hvTjWg5v/Movie.png'
        : route.name == 'SearchID'
        ? 'https://i.postimg.cc/sg34BWTK/Search.png'
        : route.name == 'Setting'
        ? 'https://i.postimg.cc/SNkP290s/Menu.png'
        : 'https://i.postimg.cc/zvgLzTVJ/ticket.png';



    return (
      <Image
        source={{uri: ic}}
        style={{
          width: 30,
          height: 30,
          tintColor: '#000',
          opacity: focused == true ? 1 : 0.4,
          marginTop:3,
        }}
        resizeMode="contain"
      />
    );
  },
});

const Tab = createBottomTabNavigator();
export default function BottomApp(props) {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name={'Movie'}
        component={Movie}
        options={{tabBarLabel: 'Movie'}}
      />
      {/* <Tab.Screen name={'SearchID'} component={SearchID} options={{tabBarLabel: 'Search'}}/> */}
      <Tab.Screen name={'Ticket'} component={Ticket} options={{tabBarLabel: 'Ticket'}}/>
      <Tab.Screen name={'Setting'} component={Setting} options={{tabBarLabel: 'Setting'}}/>
    </Tab.Navigator>
  );
}
