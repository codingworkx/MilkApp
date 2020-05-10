import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

//custom imports below
import Colors from '../utils/colors';

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
    justifyContent: 'center',
    backgroundColor: Colors.THEME
  }
})