import { StyleSheet, SafeAreaView, View, Text, Dimensions, Image, Pressable, FlatList, Button } from "react-native";
import { useSpotifyAuth } from "./utils";
import { Themes } from "./assets/Themes";
import React, { useState } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import PreviewScreen from "./PreviewScreen";
import DetailScreen from "./DetailScreen";

import Song from './Song';
import SpotifyHeader from './SpotifyHeader'


const Stack = createStackNavigator();

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const AuthButton = ({ authFunction}) => {
  return (
    <View style={styles.pressableContainer}>

      <Pressable 
        onPress={authFunction}
        style={styles.myAuthButton}>
          <Image style={styles.logo} source={require('./assets/spotify-logo.png')} />
          <Text style={styles.name}>
            CONNECT WITH SPOTIFY
          </Text>
      </Pressable>

    </View>
  );
}


const SongsScreen = ({ navigation }) => {
  const { token, tracks, getSpotifyAuth } = useSpotifyAuth();
  const renderSpotifyTrack = ({ item, index }) => {

  return (
    <Pressable 
      onPress={() => {navigation.navigate('DetailScreen', {detailUrl : item.external_urls.spotify})}}
    >
    <Song 
      name={item.name}
      artists={item.artists[0].name}
      album={item.album.name}
      imageUrl={item.album.images[0].url}
      duration={item.duration_ms}
      songPreviewUrl={item.preview_url}
    />
    </Pressable>
  );
}

  let contentDisplayed;
  let header;

  if (token) {
    contentDisplayed = 
    <FlatList
      data={tracks}
      renderItem={renderSpotifyTrack}
      keyExtractor={(item, index) => index}
    />
    header = <SpotifyHeader />
   
  } else{
    contentDisplayed = <AuthButton authFunction={getSpotifyAuth} />
  }
    

  return (
    <SafeAreaView style={styles.container}>
      
      {header}
      {contentDisplayed}

    </SafeAreaView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen options={{headerShown: false}} name="SongsScreen" component={SongsScreen} />
        <Stack.Screen name="PreviewScreen" component={PreviewScreen} />
        <Stack.Screen name="DetailScreen" component={DetailScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: Themes.colors.background,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  pressableContainer: {
    borderRadius: 15,
    backgroundColor: '#28a62e',
    justifyContent: 'center',
    width: windowWidth * 0.475,
    height: windowHeight * 0.035,
  },
  myAuthButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  logo: {
    height: 20,
    width: 20,
    margin: 5,
  }
});