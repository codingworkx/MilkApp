import React from 'react';
import auth from '@react-native-firebase/auth';
import { View, StyleSheet, Dimensions, Text } from 'react-native';

//custom imports below
import Colors from '../utils/colors';
import { SetRoot } from '../utils/navMethods';
import ScreenNames from '../utils/screenNames';

const { width } = Dimensions.get('window');

export default function Home() {

  const logout = () => {
    auth()
      .signOut()
      .then(() => SetRoot(ScreenNames.LOGIN));
  }

  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <View style={styles.innerContainer}>

        </View>
      </View>
      <View style={styles.lowerContainer}>
        <Text onPress={logout}>{"LOGOUT"}</Text>
      </View>
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
    backgroundColor: Colors.WHITE
  },
  lowerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: width / 1.7,
    backgroundColor: Colors.THEME
  }
});

Home.options = {
  topBar: {
    visible: false
  }
}