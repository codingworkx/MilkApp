import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default function Login() {
  return (
    <View style={styles.container}>
      <Text>Login</Text>
    </View>
  );
}

Login.options = {
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