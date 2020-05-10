import React from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';

const { width } = Dimensions.get('window');

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <View style={styles.innerContainer}>

        </View>
      </View>
      <ScrollView contentContainerStyle={{ width, height: 1200, backgroundColor: 'blue', marginTop: width / 2.2 }}>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgreen'
  },
  upperContainer: {
    width,
    top: 0,
    zIndex: 9,
    position: 'absolute',
    alignSelf: 'center',
    height: width / 1.7,
    backgroundColor: 'transparent'
  },
  innerContainer: {
    bottom: 0,
    width: width * 2,
    height: width * 2,
    overflow: 'hidden',
    borderRadius: width,
    position: 'absolute',
    marginLeft: -(width / 2),
    backgroundColor: 'lightblue'
  }
})