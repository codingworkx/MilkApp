import React from 'react';
import { Navigation } from 'react-native-navigation';
//@ts-ignore
import EventEmitter from "react-native-eventemitter";
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';

//csutom imports below
import Fonts from '../utils/fonts';
import Colors from '../utils/colors';

const { width, height } = Dimensions.get('window');

interface Props {
  componentId: string
}

export default function Settings({ componentId }: Props) {

  const closeModal = () => {
    Navigation.dismissOverlay(componentId);
  }

  const logout = () => {
    setTimeout(() => {
      EventEmitter.emit('logout');
    }, 100);
    Navigation.dismissOverlay(componentId);
  }

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.settingsText}>{"Settings"}</Text>
        <Text onPress={closeModal} style={styles.cancelText}>{"Cancel"}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {renderHeader()}
        <TouchableOpacity style={styles.logoutBtn}>
          <Text style={styles.text}>{"FAQ"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.faqBtn} onPress={logout}>
          <Text style={styles.text}>{"Logout"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.aboutBtn}>
          <Text style={styles.text}>{"About"}</Text>
          <Text style={styles.text}>{"CodingWorkX"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00000050',
    flexDirection: 'column-reverse',
  },
  innerContainer: {
    width,
    height: height / 3,
    backgroundColor: Colors.WHITE
  },
  header: {
    flex: 0.1,
    padding: 8,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: Colors.THEME
  },
  settingsText: {
    fontSize: 14,
    color: Colors.BLACK,
    fontFamily: Fonts.MEDIUM
  },
  cancelText: {
    fontSize: 18,
    color: Colors.THEME,
    fontFamily: Fonts.SEMI_BOLD
  },
  logoutBtn: {
    top: 80,
    left: 50,
    height: 50,
    width: 150,
    borderRadius: 25,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.THEME
  },
  faqBtn: {
    top: 80,
    right: 50,
    height: 50,
    width: 150,
    borderRadius: 25,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.THEME
  },
  aboutBtn: {
    top: 150,
    left: 105,
    height: 60,
    width: 200,
    borderRadius: 30,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.THEME
  },
  text: {
    fontSize: 20,
    color: Colors.WHITE,
    fontFamily: Fonts.BOLD
  }
})