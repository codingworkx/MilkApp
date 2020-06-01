import React, { useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Keyboard } from 'react-native';

//custom imports below
import Fonts from '../utils/fonts';
import Colors from '../utils/colors';
import { ShowMessage } from '../utils/commonMethods';
import { Navigation } from 'react-native-navigation';
import { useSelector } from 'react-redux';

class State {
  name: string = '';
  number: string = '';
  address: string = '';
}

export default function AddVendor({ componentId }: any) {
  const [values, setValues] = useState(new State());
  const { name, number, address } = values;

  const { uid } = useSelector((state: any) => state.userDataReducer);

  const updateFields = (key: string, value: any) => {
    setValues({
      ...values,
      ...{ [key]: value }
    })
  }

  const addVendor = () => {
    if (uid && uid.length > 0) {
      firestore()
        .collection(`${uid}-Vendors`)
        .add({
          name,
          number,
          address
        })
        .then(() => {
          ShowMessage("Vendor Added Successfully", false)
          setTimeout(() => {
            Navigation.pop(componentId);
          }, 1000);
        })
        .catch(() => {
          ShowMessage("Some Problem Please Check After Some Time!", false)
        });
    } else {
      ShowMessage("Please try again later!", false);
    }
  }

  const submitAddVendor = () => {
    Keyboard.dismiss();
    if (name.trim().length === 0) {
      ShowMessage('Please Enter Vendor Name', false);
      return;
    }
    if (number.trim().length === 0) {
      ShowMessage('Please Enter Mobile Number', false);
      return;
    }
    if (number.trim().length < 10 || parseInt(number) === 0) {
      ShowMessage('Please Enter Valid Mobile Number', false);
      return;
    }
    if (isNaN(+number)) {
      ShowMessage('Please Enter Valid Mobile Number', false);
      return;
    }
    addVendor();
  }

  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <TextInput
          value={name}
          maxLength={100}
          style={styles.inputStyle}
          placeholder="Enter Vendor Name"
          onChangeText={(val) => updateFields('name', val)}
        />
        <TextInput
          value={number}
          maxLength={10}
          keyboardType="phone-pad"
          style={styles.inputStyle}
          placeholder="Enter Vendor Mobile Number"
          onChangeText={(val) => updateFields('number', val)}
        />
        <TextInput
          value={address}
          maxLength={200}
          style={styles.inputStyle}
          placeholder="Enter Vendor Address"
          onChangeText={(val) => updateFields('address', val)}
        />
      </View>
      <View style={styles.lowerContainer}>
        <TouchableOpacity style={styles.loginBtn} onPress={submitAddVendor}>
          <Text style={styles.loginTxt}>{"Add Vendor"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

AddVendor.options = {
  topBar: {
    animate: true,
    backButton: { color: Colors.WHITE },
    title: {
      fontSize: 20,
      text: "Add Vendor",
      color: Colors.WHITE,
      alignment: 'center',
      fontFamily: Fonts.BOLD,
    },
    background: { color: Colors.THEME }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.THEME
  },
  upperContainer: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  lowerContainer: {
    flex: 0.2,
    alignItems: 'center',
  },
  inputStyle: {
    padding: 0,
    height: 50,
    width: 300,
    fontSize: 16,
    marginTop: 30,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 25,
    fontFamily: Fonts.SEMI_BOLD,
    backgroundColor: Colors.WHITE
  },
  loginBtn: {
    width: 250,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.WHITE
  },
  loginTxt: {
    fontSize: 22,
    color: Colors.THEME,
    fontFamily: Fonts.SEMI_BOLD
  },
});
