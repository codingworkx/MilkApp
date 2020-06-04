import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import firestore from '@react-native-firebase/firestore';
import { useNavigationButtonPress } from 'react-native-navigation-hooks'
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Keyboard, Alert } from 'react-native';

//custom imports below
import Fonts from '../utils/fonts';
import Colors from '../utils/colors';
import LocalImages from '../utils/localImages';
import { ShowMessage } from '../utils/commonMethods';

class State {
  name: string = '';
  number: string = '';
  address: string = '';
}

export default function EditVendor({ componentId, address_p, name_p, number_p, vendor_key }: any) {
  const [values, setValues] = useState<State>({
    name: name_p,
    number: number_p,
    address: address_p
  });
  const { name, number, address } = values;

  const { uid } = useSelector((state: any) => state.userDataReducer);

  useNavigationButtonPress(e => {
    if (e.buttonId === 'delete_btn' && vendor_key && vendor_key.length > 0) {
      Alert.alert(
        "Delete",
        "Are you sure you want to delete this vendor?",
        [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => console.log("Cancel Pressed"),
          },
          {
            text: "YES", onPress: () => {
              firestore().collection(`${uid}-Vendors`).doc(vendor_key).delete()
                .then(function () {
                  ShowMessage("Vendor Deleted Successfully!");
                  Navigation.pop(componentId);
                }).catch(function () {
                  ShowMessage("Please try again!");
                });
            }
          }
        ],
        { cancelable: false }
      );
    } else {
      ShowMessage("Please try again!");
    }
  }, componentId)

  const updateFields = (key: string, value: any) => {
    setValues({
      ...values,
      ...{ [key]: value }
    })
  }

  const editVendor = () => {
    if (uid && uid.length > 0) {
      firestore()
        .collection(`${uid}-Vendors`)
        .doc(vendor_key)
        .update({
          name,
          number,
          address
        })
        .then(() => {
          ShowMessage("Vendor Updated Successfully", false)
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

  const submitEditVendor = () => {
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
    editVendor();
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
        <TouchableOpacity style={styles.loginBtn} onPress={submitEditVendor}>
          <Text style={styles.loginTxt}>{"Edit Vendor"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

EditVendor.options = {
  topBar: {
    animate: true,
    backButton: { color: Colors.WHITE },
    title: {
      fontSize: 20,
      text: "Edit Vendor",
      color: Colors.WHITE,
      alignment: 'center',
      fontFamily: Fonts.BOLD,
    },
    background: { color: Colors.THEME },
    rightButtons: [{
      id: 'delete_btn',
      icon: LocalImages.DELETE_ICON
    }]
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
