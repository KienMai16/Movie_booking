import {
  Animated,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors, icons, images, styMovie, styles} from '../../contants/index';

import axios from 'axios';

const TMDB_API = '5da30a9ed67d123332358320d11fa2a4';

export default function Movie(props) {
  const {navigation, router} = props;
  const scrollY = new Animated.Value(0);
  const diff = Animated.diffClamp(scrollY, 0, 55);
  const translateY = diff.interpolate({
    inputRange: [0, 55],
    outputRange: [0, -55],
  });

  const [data, setData] = useState({
    nowPlaying: null,
    topRatedMovies: null,
    upcomingMovies: null,
  });
  const [loading, setLoading] = useState(true);
  const apiKey = TMDB_API;
  const apiReq = async () => {
    const respNowPlaying = await axios(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`,
    );
    const respTopRatedMovies = await axios(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`,
    );
    const respUpcomingMovies = await axios(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`,
    );
    setData({
      nowPlaying: respNowPlaying.data.results,
      topRatedMovies: respTopRatedMovies.data.results,
      upcomingMovies: respUpcomingMovies.data.results,
    });
    if (loading) {
      setLoading(false);
    }
  };

  useEffect(() => {
    apiReq();
  }, []);

  return (
    <View style={[styles.container,{
      position: 'absolute',}]}>
      <Animated.View
        style={[
          styles.topContainer,
          {
            flexDirection: 'row',
            paddingHorizontal: 12,
            transform: [
              {
                translateY: translateY,
              },
            ],
            elevation: 4,
            zIndex: 1000,
          },
        ]}>
        <Image
          style={{
            height: 40,
            width: 40,
            resizeMode: 'contain',
            marginTop: 15,
            tintColor: '#fff',
          }}
          source={icons.icon_menu}
        />
        <View style={{flex: 1}} />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Search');
          }}>
          <Image
            style={{
              height: 40,
              width: 40,
              resizeMode: 'contain',
              marginTop: 15,
              tintColor: 'white',
            }}
            source={{uri: 'https://i.postimg.cc/sg34BWTK/Search.png'}}
          />
        </TouchableOpacity>
      </Animated.View>

      <ScrollView
        onScroll={e => {
          scrollY.setValue(e.nativeEvent.contentOffset.y);
        }}
        style={styles.mainContainer}
        showsVerticalScrollIndicator={false}>
        <View>
          <Text
            style={{
              fontSize: 20,
              color: '#f4f4f5',
              marginTop: 30,
              marginLeft: 20,
              fontWeight: 'bold',
            }}>
            Now
            <Text style={{color: colors.title}}> Playing</Text>
          </Text>
          <View style={{marginHorizontal: 3}}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              style={{marginTop: 20}}
              data={data.nowPlaying}
              horizontal
              renderItem={element => {
                return (
                  <View style={styMovie.FLatItem}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('MovieId', {
                          id: element.item.id,
                          release_date: element.item.release_date,
                        });
                      }}>
                      <Image
                        style={{
                          width: 120,
                          height: 180,
                          resizeMode: 'cover',
                          borderRadius: 5,
                          marginRight: 8,
                        }}
                        source={{
                          uri: `https://image.tmdb.org/t/p/w500${element.item.poster_path}`,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                );
              }}
              keyExtractor={item => item.id}
            />
          </View>
          <View style={{marginTop: 15}}>
            <Text
              style={{
                fontSize: 20,
                color: '#f4f4f5',
                marginLeft: 20,
                fontWeight: 'bold',
              }}>
              Top
              <Text style={{color: colors.title}}> Movies</Text>
            </Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              style={{marginTop: 20}}
              data={data.topRatedMovies}
              horizontal
              renderItem={element => {
                return (
                  <View style={styMovie.FLatItem}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('MovieId', {
                          id: element.item.id,
                          title: element.item.title,
                          poster_path: `https://image.tmdb.org/t/p/w500${element.item.poster_path}`,
                          backdrop_path: `https://image.tmdb.org/t/p/w500${element.item.backdrop_path}`,
                          overview: element.item.overview,
                          release_date: element.item.release_date,
                          vote_average: element.item.vote_average,
                        });
                      }}>
                      <Image
                        style={{
                          width: 120,
                          height: 180,
                          resizeMode: 'cover',
                          borderRadius: 5,
                          marginRight: 8,
                        }}
                        source={{
                          uri: `https://image.tmdb.org/t/p/w500${element.item.poster_path}`,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                );
              }}
              keyExtractor={item => item.id}
            />
          </View>
          <View style={{marginTop: 15}}>
            <Text
              style={{
                fontSize: 20,
                color: '#f4f4f5',
                marginLeft: 20,
                fontWeight: 'bold',
              }}>
              Upcoming
              <Text style={{color: colors.title}}> Movies</Text>
            </Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              style={{marginVertical: 20, marginBottom: 100}}
              data={data.upcomingMovies}
              horizontal
              renderItem={element => {
                return (
                  <View style={styMovie.FLatItem}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('MovieId', {
                          id: element.item.id,
                          title: element.item.title,
                          poster_path: `https://image.tmdb.org/t/p/w500${element.item.poster_path}`,
                          backdrop_path: `https://image.tmdb.org/t/p/w500${element.item.backdrop_path}`,
                          overview: element.item.overview,
                          release_date: element.item.release_date,
                          vote_average: element.item.vote_average,
                        });
                      }}>
                      <Image
                        style={{
                          width: 120,
                          height: 180,
                          resizeMode: 'cover',
                          borderRadius: 5,
                          marginRight: 8,
                        }}
                        source={{
                          uri: `https://image.tmdb.org/t/p/w500${element.item.poster_path}`,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                );
              }}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
