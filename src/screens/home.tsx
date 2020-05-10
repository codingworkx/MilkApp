import React, { useEffect } from 'react';
import auth from '@react-native-firebase/auth';
//@ts-ignore
import EventEmitter from "react-native-eventemitter";
import { FloatingAction } from "react-native-floating-action";
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Image, Alert } from 'react-native';

//custom imports below
import Colors from '../utils/colors';
import ScreenNames from '../utils/screenNames';
import LocalImages from '../utils/localImages';
import { SetRoot, ShowOverlay } from '../utils/navMethods';

const { width, height } = Dimensions.get('window');
const actions = [
  {
    position: 1,
    text: "Add User",
    name: "add_user",
    icon: LocalImages.ADD_USER,
  }
];

export default function Home() {

  useEffect(() => {
    EventEmitter.on("logout", showLogoutAlert);
  }, []);

  const showLogoutAlert = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => console.log("Cancel Pressed"),
        },
        { text: "YES", onPress: () => logout() }
      ],
      { cancelable: false }
    );
  }

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
          <TouchableOpacity style={styles.settingBtn} onPress={() => ShowOverlay(ScreenNames.SETTINGS)}>
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
      <FloatingAction
        actions={actions}
        onPressItem={name => {
          console.warn(`selected button: ${name}`);
        }}
      />
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