import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {colors, icons, styles} from '../contants/index';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import Main from '../screen/Main';
import SignIn from '../screen/SignIn';
import SignUp from '../screen/SignUp';
import Movie from '../screen/Home/Home';
import MovieId from '../screen/Home/movieId';
import BottomApp from './BottomApp';
import Trailer from '../screen/Home/Trailer';
import CastCrew from '../screen/Home/CastCrew';
import SearchID from '../screen/Home/SearchID';

const Stack = createNativeStackNavigator();


export default function Click(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={'Main'} component={Main} />
        <Stack.Screen name={'SignIn'} component={SignIn} /> 
        <Stack.Screen name={'SignUp'} component={SignUp} />
        <Stack.Screen name={'Movie'} component={Movie} />
        <Stack.Screen name={'MovieId'} component={MovieId} />
        <Stack.Screen name={'Search'} component={SearchID} />
        <Stack.Screen name={'CastCrew'} component={CastCrew} />
        <Stack.Screen name={'Trailer'} component={Trailer} />
        <Stack.Screen name={'BottomApp'} component={BottomApp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
