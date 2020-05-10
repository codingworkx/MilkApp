import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function Splash() {
  return (
    <View style={styles.container}>
      <Text>Splash</Text>
    </View>
  );
}

Splash.options = {
  topBar: {
    visible: false
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})