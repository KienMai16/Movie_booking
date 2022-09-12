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
import YouTube from 'react-native-youtube';

export default function Trailer(route) {
  // const {teaser} = route.params;
  const [isReady, setIsReady] = useState(false);
  const [status, setStatus] = useState(null);
  const [quality, setQuality] = useState(null);
  const [error, setError] = useState(null);

  return (
    <View style={styles.container}>
      <YouTube
        apiKey="AIzaSyCriM7J-ETLIDnZShtKm0KQ25AqhouM9JI"
        videoId={`4MWYXQ1mzvQ`}
        play={true}
        fullscreen={true}
        loop={true}
        onReady={e => setIsReady(true)}
        onChangeState={e => setStatus(e.state)}
        onChangeQuality={e => setQuality(e.quality)}
        onError={e => setError(e.error)}
        style={{alignSelf: 'stretch', height: 300}}
      />
    </View>
  );
}
