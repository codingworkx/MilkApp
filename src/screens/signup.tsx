import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
//@ts-ignore
import CheckBox from '@react-native-community/checkbox';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Keyboard } from 'react-native';

//custom imports below
import Fonts from '../utils/fonts';
import Colors from '../utils/colors';
import { SetRoot } from '../utils/navMethods';
import ScreenNames from '../utils/screenNames';
import { ValidateEmail, ShowMessage, ValidatePassword } from '../utils/commonMethods';

class State {
  email: string = "";
  password: string = "";
  showPass: boolean = false;
  confirmPassword: string = "";
}

export default function Signup() {
  const [values, setValues] = useState(new State());

  const { email, password, showPass, confirmPassword } = values;

  const updateFields = (key: string, value: any) => {
    setValues({
      ...values,
      ...{ [key]: value }
    })
  }

  const signIn = () => {
    SetRoot(ScreenNames.LOGIN);
  }

  const submitSignUp = () => {
    Keyboard.dismiss();
    if (!ValidateEmail(email)) {
      ShowMessage('Please Enter Valid E-Mail', false);
      return;
    }
    if (!ValidatePassword(password)) {
      ShowMessage('New Password Must be atleast 8 characters', false);
      return;
    }
    if (!ValidatePassword(confirmPassword)) {
      ShowMessage('Confirm Password Must be atleast 8 characters', false);
      return;
    }
    if (password.toLowerCase() !== confirmPassword.toLowerCase()) {
      ShowMessage("Passwords don't match please check!", false);
      return;
    }
    createUser();
  }

  const createUser = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        ShowMessage("Signup Success", false);
        auth().onAuthStateChanged((user: any) => {
          if (user) {
            const { _user } = user;
            console.log("_user from Login", _user);
            if (_user && _user.providerData) {
              SetRoot(ScreenNames.HOME);
            }
          }
        })
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          ShowMessage("This Email address is already in use!", false);
        }
        if (error.code === 'auth/invalid-email') {
          ShowMessage("Please Enter Valid E-Mail", false);
        }
        console.log("error in user signup", error);
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <TextInput
          value={email}
          maxLength={72}
          style={styles.inputStyle}
          placeholder="Enter E-Mail"
          keyboardType="email-address"
          onChangeText={(val) => updateFields('email', val)}
        />
        <TextInput
          maxLength={10}
          value={password}
          style={styles.inputStyle}
          secureTextEntry={!showPass}
          placeholder="Enter New Password"
          onChangeText={(val) => updateFields('password', val)}
        />
        <TextInput
          maxLength={10}
          value={confirmPassword}
          style={styles.inputStyle}
          secureTextEntry={!showPass}
          placeholder="Enter Confirm Password"
          onChangeText={(val) => updateFields('confirmPassword', val)}
        />
        <View style={styles.showPassContainer}>
          <CheckBox
            value={showPass}
            tintColors={{ true: Colors.WHITE, false: Colors.WHITE }}
            onChange={() => updateFields('showPass', !showPass)}
          />
          <Text style={styles.showPassText}>{"Show Password"}</Text>
        </View>
      </View>
      <View style={styles.lowerContainer}>
        <TouchableOpacity style={styles.loginBtn} onPress={submitSignUp}>
          <Text style={styles.loginTxt}>{"Sign Up"}</Text>
        </TouchableOpacity>
        <Text onPress={signIn} style={styles.signIn}>{"Already have account? Sign In"}</Text>
      </View>
    </View>
  );
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
  showPassContainer: {
    width: 300,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  showPassText: {
    fontSize: 16,
    marginLeft: 5,
    color: Colors.WHITE,
    fontFamily: Fonts.REGULAR
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
  signIn: {
    fontSize: 18,
    marginTop: 15,
    color: Colors.WHITE,
    textDecorationLine: "underline"
  }
});

Signup.options = {
  topBar: {
    animate: true,
    backButton: { visible: false },
    title: {
      fontSize: 20,
      color: Colors.WHITE,
      alignment: 'center',
      fontFamily: Fonts.BOLD,
      text: ScreenNames.SIGNUP,
    },
    background: { color: Colors.THEME }
  }
}