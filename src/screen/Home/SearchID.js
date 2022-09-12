import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import {TextInput_View} from '../../component/index';
import {styles, icons, colors} from '../../contants';

export default function SearchID(props) {
  const {navigation, route} = props;
  const TMDB_API = '5da30a9ed67d123332358320d11fa2a4';
  const apiurl = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API}`;
  const [state, setState] = useState({
    s: '',
    results: [],
    selected: {},
  });

  const search = () => {
    axios(apiurl + '&query=' + state.s).then(({data}) => {
      let results = data.results;
      setState(prevState => {
        return {...prevState, results: results};
      });
    });
  };

  return (
    <View
      style={[
        styles.container,
        {paddingHorizontal: 0, justifyContent: 'center'},
      ]}>
        <View style={{marginTop: -24}} >
      <TextInput_View
        source_image={'https://i.postimg.cc/sg34BWTK/Search.png'}
        onSubmitEditing={search}
        value={state.s}
        placeholder={'Search'}
        keyboardType={'default'}
        onChangeText={text =>
          setState(prevState => {
            return {...prevState, s: text};
          })
        }
      />
      </View>

      {state.results.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{marginHorizontal: 10,marginTop: 6, marginBottom: 24}}
          data={state.results}
          renderItem={element => {
            return (
              <TouchableOpacity
                key={element.item.id}
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
                <View style={styles.viewItem}>
                  <Image
                    style={styles.imageItem}
                    source={{
                      uri:
                        'https://image.tmdb.org/t/p/w500/' +
                        element.item.poster_path,
                    }}
                    resizeMode="center"
                  />
                  <Text style={styles.heading}>
                    {element.item.original_title}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item.id}
        />
      ) : (
        <View style={[styles.mainContainer, {justifyContent: 'center', alignItems: 'center'}]}>
          <Image
            style={{
              height: 100,
              width: 100,
              tintColor: 'rgba(255, 255, 255, 0.3)',
            }}
            resizeMode="contain"
            source={require('../../assets/icons/png/not_found.png')}
          />
          <Text
            style={{
              color: 'rgba(255, 255, 255, 0.3)',
              fontWeight: '800',
              alignSelf: 'center',
              marginTop: 18,
              fontSize: 20,
            }}>
            Not found
          </Text>
        </View>
      )}
    </View>
  );
}
