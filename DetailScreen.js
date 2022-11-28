import { Text, View, StyleSheet, Button } from 'react-native';
import WebView from 'react-native-webview';


export default function DetailsScreen({ navigation, route }) {
  const { detailUrl } = route.params;
    
    return (
      <WebView style={styles.screenView} source={{ uri: detailUrl }} />
    );
}



const styles = StyleSheet.create({
  screenView: {
    backgroundColor: 'black',
  },
});
