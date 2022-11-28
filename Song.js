import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
  } from 'react-native';
  
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import PreviewScreen from "./PreviewScreen";

import millisToMinutesAndSeconds from './utils/millisToMinutesAndSeconds'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function Song({ name, artists, album, imageUrl, duration, songPreviewUrl, navigation}) {  //add in the other features to be displayed
    navigation = useNavigation();

    return (
      <View style={styles.songView}>

        <View style={styles.playContainer}>
          <Pressable
              onPress={() => {navigation.navigate('PreviewScreen', {previewUrl : songPreviewUrl})}}>
              <Ionicons name="play-circle" size={22} color="green" />
          </Pressable>
        </View>

        <Image style={styles.image} source={{ uri: imageUrl}}/>
        
        <View style={styles.songContainer}>
          <Text style={styles.track} numberOfLines={1}>{name}</Text>
          <Text style={styles.artist} numberOfLines={1}>{artists}</Text>
        </View>

        <Text style={styles.album} numberOfLines={1}>{album}</Text>
        
        <Text style={styles.duration} numberOfLines={1}>{millisToMinutesAndSeconds(duration)}</Text>
      </View>
    );
  }
 
  const styles = StyleSheet.create({
    track: {
      fontSize: 15,
      color: 'white',
      margin: 3,
    },
    songContainer: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: windowWidth * 0.40,
    },
    artist: {
      fontSize: 13,
      color: 'white',
      margin: 3,
    },
    songView : {
      flexDirection: 'row',
      margin: 3,
      alignItems: 'center',
      width: windowWidth * 0.965,
      height: windowHeight * 0.08,
      justifyContent:'space-between'
    },
    duration: {
      fontSize: 14,
      color: 'white',
      margin: 3,
      width: windowWidth * 0.10,
    },
    playContainer: {
      justifyContent: 'center',
      alignContent: 'center',
      flex: 1,
      resizeMode: 'contain',
      width: windowWidth * 0.038,
    },
    album: {
      fontSize: 14,
      color: 'white',
      margin: 3,
      width: windowWidth * 0.225,
    },
    image: {
      width: 60,
      height: 60,
      resizeMode: 'contain',
    },
  });