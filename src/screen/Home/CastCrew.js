import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import {colors, icons, styles} from '../../contants';
import Header from '../../component/Header';

const TMDB_API = '5da30a9ed67d123332358320d11fa2a4';

const MovieId = props => {
  const {navigation, route} = props;
  const {
    id,
    cast_id,
    name,
    original_name,
    popularity,
    profile_path,
    credit_id,
    known_for_department,
    character,
    gender,
  } = route.params;

  const sex = gender == '1' ? 'Women' : gender == '2' ? 'Man' : 'genderless';

  const [data, setData] = useState({
    movieDetails: [],
    similarMovies: [],
    castCrew: [],
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
    ]);
    setData({
      movieDetails: resp.data,
      similarMovies: similarResp.data.results,
      castCrew: castCrew.data.cast,
    });
  }, [id, apiKey]);

  useEffect(() => {
    apiReq();
  }, [apiReq]);

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
            uri: profile_path,
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
              uri: profile_path,
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
          {name}
          <Text style={{fontWeight: 'normal'}}> </Text>
        </Text>
      </View>
      <View style={{alignSelf: 'center', paddingTop: 5, paddingBottom: 10}}>
        <Text style={{color: '#fff'}}>{character}</Text>
      </View>
      <View
        style={{
          paddingTop: 10,
          marginHorizontal: 25,
          flexDirection: 'column',
        }}>
        <Text style={styles.text_overView}>
          Original name: {original_name}{'\n'}
          Gender: {sex}{'\n'}
          know for department: {known_for_department}{'\n'}
          popularity: {popularity}
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
      <View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          style={{marginTop: 10, marginLeft: 20}}
          data={data.castCrew}
          horizontal
          renderItem={element => {
            return (
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
          style={{marginTop: 10, marginLeft: 20,marginBottom: 24}}
          data={data.similarMovies}
          horizontal
          renderItem={element => {
            return (
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
            );
          }}
          keyExtractor={item => item.id}
        />
      </View>
    </ScrollView>
  );
};

export default MovieId;
