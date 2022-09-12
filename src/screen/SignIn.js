import {
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
    ImageBackground,
  } from 'react-native';
  import React from 'react';
  import {icons, colors, styles, images} from '../contants/index';
  import {TextInput_View} from '../component/index';
  
  export default function SignIn(props) {

    
  const {navigation, router} = props;
  const {navigate, goBack} = navigation;




    return (
      <View style={styles.container}>
        <ImageBackground
          source={images.image_background}
          style={{
            height: Dimensions.get('screen').height,
            width: Dimensions.get('screen').width,
          }}>
          <View
            style={{
              height: Dimensions.get('screen').height * 0.25,
              width: Dimensions.get('screen').width,
              flexDirection: 'row',
              borderBottomRightRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 26,
                fontWeight: 'bold',
                width: 150,
                color: 'white',
              }}>
              Welcome back
            </Text>
            <View style={{flex: 0.8}} />
            <TouchableOpacity style={styles.icon_app} >
            <Image source={icons.icon_app} style={styles.icon_app} />
            </TouchableOpacity>
          </View>
  
          <View
            style={{
              paddingHorizontal: 8,
              height: Dimensions.get('screen').height * 0.45,
              width: Dimensions.get('screen').width,
            }}>
            <TextInput_View
              title={'Email:'}
              placeholder={'example123@gmail.com'}
              keyboardType={'email-address'}
              secureTextEntry={false}
              source_image={'http://cdn.onlinewebfonts.com/svg/img_501721.png'}
            />
            <TextInput_View
              title={'Password:'}
              placeholder={'******'}
              keyboardType={'visible-password'}
              secureTextEntry={true}
              source_image={'https://pic.onlinewebfonts.com/svg/img_318424.png'}
            />
            <TouchableOpacity
              style={{
                marginTop: 48,
                height: 44,
                width: 220,
                borderRadius: 22,
                backgroundColor: '#799EC9',
                justifyContent: 'center',
                alignSelf: 'center',
                borderWidth: 1,
                borderColor: colors.dark,
              }}
              onPress={()=>{
                navigate('BottomApp');
              }}
              >
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  opacity: 0.5,
                  color: 'white',
                  alignSelf: 'center',
                }}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
  
          <View
            style={{
              height: Dimensions.get('screen').height * 0.3,
              width: Dimensions.get('screen').width,
              alignItems: 'center',
            }}>
            <Text style={{color: '#fff', marginBottom: 24}}>
              __________ Or connect with __________
            </Text>
  
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}} />
              <TouchableOpacity
                style={{
                  height: 60,
                  width: 60,
                  borderWidth: 1,
                  borderRadius: 30,
                  backgroundColor: '#fff',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={icons.facebook}
                  style={{width: 50, height: 50, borderRadius: 25, borderWidth: 0.03, borderColor: '#000'}}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
              <View style={{flex: 1}} />
              <TouchableOpacity
                style={{
                  height: 60,
                  width: 60,
                  borderWidth: 1,
                  borderRadius: 30,
                  backgroundColor: '#fff',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={icons.google}
                  style={{width: 50, height: 50,}}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
              <View style={{flex: 1}} />
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
  