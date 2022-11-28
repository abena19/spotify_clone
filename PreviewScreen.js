import { Text, View, StyleSheet, Button, Component } from 'react-native';
import WebView from 'react-native-webview'


export default function PreviewScreen({ navigation, route }) {
    const { previewUrl } = route.params;
    
    return (
      <WebView source={{ uri: previewUrl }} />
    );
}



const styles = StyleSheet.create({
  screenOne: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  screenOneText: {
    fontSize: 32,
  },
});
