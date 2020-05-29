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

  const addVendor = () => {
    setTimeout(() => {
      EventEmitter.emit('add_vendor');
    }, 100);
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
        <View style={styles.lowerContainer}>
          <View style={styles.btnsContainer}>
            <TouchableOpacity style={styles.logoutBtn} onPress={addVendor}>
              <Text style={styles.text}>{"Add Vendor"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.faqBtn} onPress={logout}>
              <Text style={styles.text}>{"Logout"}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.btnsContainer}>
            <TouchableOpacity style={styles.aboutBtn}>
              <Text style={styles.text}>{"About"}</Text>
              <Text style={styles.text}>{"CodingWorkX"}</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  lowerContainer: {
    flex: 1
  },
  btnsContainer: {
    height: 80,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around'
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
    height: 50,
    width: 150,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.THEME
  },
  faqBtn: {
    height: 50,
    width: 150,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.THEME
  },
  aboutBtn: {
    height: 60,
    width: 200,
    borderRadius: 30,
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