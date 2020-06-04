import React from 'react';
import { Navigation } from 'react-native-navigation';
//@ts-ignore
import EventEmitter from "react-native-eventemitter";
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';

//custom imports below
import Fonts from '../utils/fonts';
import Colors from '../utils/colors';
const { width, height } = Dimensions.get("window");

export default function VendorActions({ componentId }: any) {

  const calculateSales = () => {
    setTimeout(() => {
      EventEmitter.emit('calculate_sales');
    }, 100);
    Navigation.dismissOverlay(componentId);
  }

  const addSample = () => {
    setTimeout(() => {
      EventEmitter.emit('add_sample');
    }, 100);
    Navigation.dismissOverlay(componentId);
  }

  const editVendor = () => {
    setTimeout(() => {
      EventEmitter.emit('edit_vendor');
    }, 100);
    Navigation.dismissOverlay(componentId);
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.btnsContainer}>
          <TouchableOpacity style={styles.btnStyle1} onPress={editVendor}>
            <Text style={styles.optionsStyle}>{"Edit Vendor"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnStyle1} onPress={addSample}>
            <Text style={styles.optionsStyle}>{"Add Sample"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnStyle2} onPress={calculateSales}>
            <Text style={styles.optionsStyle}>{"Calculate Sale"}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.cancelBtn} onPress={() =>
          Navigation.dismissOverlay(componentId)
        }>
          <Text style={styles.cancelTxt}>{"Cancel"}</Text>
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
    height: height / 2.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  btnsContainer: {
    width: '95%',
    height: 'auto',
    borderRadius: 15,
    backgroundColor: Colors.WHITE
  },
  btnStyle1: {
    height: 60,
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 2,
    justifyContent: 'center',
    borderBottomColor: 'rgb(241,241,242)'
  },
  btnStyle2: {
    height: 60,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  optionsStyle: {
    fontSize: 18,
    color: 'rgb(79,148,246)',
    fontFamily: Fonts.SEMI_BOLD
  },
  cancelBtn: {
    height: 50,
    width: '95%',
    marginTop: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.WHITE
  },
  cancelTxt: {
    fontSize: 20,
    fontFamily: Fonts.BOLD,
    color: 'rgb(235,82,70)',
  }
})