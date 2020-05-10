import React from 'react';
import auth from '@react-native-firebase/auth';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Image } from 'react-native';

//custom imports below
import Colors from '../utils/colors';
import { SetRoot } from '../utils/navMethods';
import ScreenNames from '../utils/screenNames';
import LocalImages from '../utils/localImages';

const { width, height } = Dimensions.get('window');

export default function Home() {

  const logout = () => {
    auth()
      .signOut()
      .then(() => SetRoot(ScreenNames.LOGIN));
  }

  const renderUpper = () => {
    return (
      <View style={styles.upperContainer}>
        <View style={styles.innerContainer}>
          <Image source={LocalImages.HOME_BG} resizeMethod="resize" resizeMode="contain" style={styles.bgImage} />
          <TouchableOpacity style={styles.settingBtn} onPress={() => console.warn("pressed")}>
            <Image source={LocalImages.SETTINGS} resizeMode="contain"
              resizeMethod="resize" style={styles.setting} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderUpper()}
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
  },
  bgImage: {
    width,
    bottom: 0,
    left: width / 2,
    height: height / 2.5,
    position: 'absolute',
  },
  settingBtn: {
    width: 50,
    zIndex: 99,
    height: 50,
    left: width * 1.35,
    bottom: width / 2.3,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  setting: {
    width: 30,
    height: 30,
    tintColor: Colors.WHITE
  }
});

Home.options = {
  topBar: {
    visible: false
  }
}