import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {colors, icons, styMovie, styles} from '../../contants';

import Header from '../../component/Header';
import axios from 'axios';

const TMDB_API = '5da30a9ed67d123332358320d11fa2a4';

const MovieId = props => {
  const {navigation, route} = props;
  const {id, release_date} = route.params;

  const [data, setData] = useState({
    movieDetails: [],
    similarMovies: [],
    castCrew: [],
    trailer: [],
  });
  const apiKey = TMDB_API;
  const apiReq = useCallback(async () => {
    const [resp, similarResp, castCrew, trail] = await Promise.all([
      axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`,
      ),
      axios.get(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${apiKey}&language=en-US`,
      ),
      axios.get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`,
      ),
      axios.get(
        `http://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`,
      ),
    ]);
    setData({
      movieDetails: resp.data,
      similarMovies: similarResp.data.results,
      castCrew: castCrew.data.cast,
      trailer: trail,
    });
  }, [id, apiKey]);

  useEffect(() => {
    apiReq();
  }, [apiReq]);

  let hours = Math.trunc(data.movieDetails.runtime / 60);
  let minutes = data.movieDetails.runtime % 60;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View>
        <ImageBackground
          style={{
            width: '100%',
            height: 240,
            resizeMode: 'cover',
            position: 'absolute',
          }}
          imageStyle={{opacity: 0.4}}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${data.movieDetails.backdrop_path}`,
          }}>
          <TouchableOpacity
            style={{
              height: 30,
              width: 30,
              resizeMode: 'contain',
              marginTop: 12,
              marginLeft: 12,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 15,
              borderWidth: 0.5,
              borderColor: '#969595',
              justifyContent: 'center',
            }}
            onPress={() => {
              navigation.goBack('Movie');
            }}>
            <Image
              style={[
                styles.ic_input,
                {tintColor: '#fff', alignSelf: 'center'},
              ]}
              source={icons.go_back}
            />
          </TouchableOpacity>

          {data.movieDetails.video == true ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Trailer');
            }}
            style={{
              height: 40,
              width: 40,
              marginTop: 24,
              marginLeft: Dimensions.get('screen').width * 0.45,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: 20,
              borderWidth: 0.5,
              borderColor: '#969595',
            }}>
            <Image
              style={[
                {
                  tintColor: '#fff',
                  height: 40,
                  width: 40,
                  alignSelf: 'center',
                },
              ]}
              source={icons.play_trailer}
            />
          </TouchableOpacity>
           ) : (
            <View></View>
          )} 
        </ImageBackground>
        <View style={{paddingTop: 140}}>
          <Image
            style={{
              width: 150,
              height: 200,
              resizeMode: 'cover',
              position: 'relative',
              alignSelf: 'center',
              borderRadius: 8,
            }}
            source={{
              uri: `https://image.tmdb.org/t/p/w500${data.movieDetails.poster_path}`,
            }}
          />
        </View>
      </View>
      <View style={{alignSelf: 'center', paddingTop: 20}}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#fff',
            marginHorizontal: 3,
          }}>
          {data.movieDetails.title}
          <Text style={{fontWeight: 'normal'}}>
            {' '}
            ({release_date.substr(0, 4)})
          </Text>
        </Text>
      </View>
      <View style={{alignSelf: 'center', paddingTop: 5, paddingBottom: 10}}>
        <Text style={{color: '#fff'}}>
          ★ {Number(data.movieDetails.vote_average).toFixed(1)} |{' '}
          {data.movieDetails.release_date} | {`${hours} hr ${minutes} min`}
        </Text>
      </View>
      <View style={{paddingTop: 10, marginLeft: 25, marginRight: 25}}>
        <Text
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            padding: 10,
            borderRadius: 5,
            color: '#fff',
          }}>
          {data.movieDetails.overview}
        </Text>
      </View>
      <View style={{marginTop: 20, marginBottom: 10}}>
        <Text
          style={{
            fontSize: 20,
            color: colors.title,
            marginLeft: 20,
            fontWeight: 'bold',
          }}>
          Cast
        </Text>
      </View>
      <View style={{ marginHorizontal: 3}}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          style={{}}
          data={data.castCrew}
          horizontal
          renderItem={element => {
            return (
              <View style={styMovie.FLatItem}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('CastCrew', {
                    id: element.item.id,
                    cast_id: element.item.cast_id,
                    name: element.item.name,
                    original_name: element.item.original_name,
                    popularity: element.item.popularity,
                    profile_path: `https://image.tmdb.org/t/p/w500${element.item.profile_path}`,
                    credit_id: element.item.credit_id,
                    known_for_department: element.item.known_for_department,
                    character: element.item.character,
                    gender: element.item.gender,
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
                    uri: `https://image.tmdb.org/t/p/w500${element.item.profile_path}`,
                  }}
                />
              </TouchableOpacity>
              </View>
            );
          }}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={{marginTop: 30, marginBottom: 10}}>
        <Text
          style={{
            fontSize: 20,
            color: '#f4f4f5',
            marginLeft: 20,
            fontWeight: 'bold',
          }}>
          Recommended
          <Text style={{color: colors.title}}> Movies</Text>
        </Text>
      </View>
      <View style={{paddingBottom: 20}}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          style={{paddingLeft: 0}}
          data={data.similarMovies}
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

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Ticket');
        }}
        style={[styles.headerContainer]}>
        <Header title={'Booking'} />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default MovieId;
