import {StyleSheet, Dimensions} from 'react-native';
import colors from '../colors';

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
    backgroundColor: colors.dark,
  },
  topContainer: {
    height: Dimensions.get('screen').height * 0.25,
    width: Dimensions.get('screen').width,
  },
  centerContainer: {
    height: Dimensions.get('screen').height * 0.45,
    width: Dimensions.get('screen').width,
  },
  bottomContainer: {
    height: Dimensions.get('screen').height * 0.3,
    width: Dimensions.get('screen').width,
  },
  mainContainer: {
    height: Dimensions.get('screen').height * 0.92,
    width: Dimensions.get('screen').width,
    backgroundColor: colors.dark,
  },
  headerContainer: {
    height: 55,
    width: Dimensions.get('screen').width,
    elevation: 5,
    top: 0, 
    left: 0,
    right: 0,
    // position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1000,
    zIndex: 1000,
  },
  image_background: {
    height: Dimensions.get('screen').height,
    width: Dimensions.get('screen').width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon_app: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
  },
  ic_input: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
  },

  searchBox: {
    fontSize: 14,
    fontWeight: '500',
    width: '100%',
    paddingStart: 12,
    backgroundColor: '#fff',
    opacity: 0.75,
    marginBottom: 20,
    borderRadius: 8,
    borderWidth: 0.8,
  },
  viewMov: {
    padding: 6,
    flex: 1,
    width: '100%',
    borderRadius: 12,
    marginTop: 6,
  },
  viewItem: {
    flex: 1,
    width: '100%',
    backgroundColor: '#000',
    marginBottom: 12,
    borderRadius: 7,
  },
  heading: {
    alignItems: 'flex-start',
    padding: 12,
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    backgroundColor: '#445565',
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
  },
  imageItem: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },
  text_overView: {
    color: '#fff',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 5,
  },
});

export default styles;
