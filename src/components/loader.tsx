import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

//csutom imports below
import Colors from '../utils/colors';

const { height, width } = Dimensions.get('window');

export default function Loader() {
  return (
    <View style={styles.container}>
      <View style={styles.loaderContainer}>
        <ActivityIndicator size={'large'} color={Colors.THEME} />
        <Text style={styles.loading}>{'Loading...'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  loaderContainer: {
    width: 200,
    height: 100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  loading: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
    color: Colors.THEME,
  },
});
