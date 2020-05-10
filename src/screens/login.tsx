import React, { useState } from 'react';
//@ts-ignore
import CheckBox from '@react-native-community/checkbox';
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';

//custom imports below
import Fonts from '../utils/fonts';
import Colors from '../utils/colors';
import { PushTo } from '../utils/navMethods';
import ScreenNames from '../utils/screenNames';

interface Props {
  componentId: string;
}

class State {
  email: string = "";
  password: string = "";
  showPass: boolean = false;
}

export default function Login({ componentId }: Props) {
  const [values, setValues] = useState(new State());

  const { email, password, showPass } = values;

  const updateFields = (key: string, value: any) => {
    setValues({
      ...values,
      ...{ [key]: value }
    })
  }

  const toSignup = () => {
    PushTo(componentId, ScreenNames.SIGNUP);
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
          placeholder="Enter Password"
          secureTextEntry={!showPass}
          onChangeText={(val) => updateFields('password', val)}
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
        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginTxt}>{"Login"}</Text>
        </TouchableOpacity>
        <Text onPress={toSignup} style={styles.signIn}>{"Don't have account? Sign Up"}</Text>
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

Login.options = {
  topBar: {
    animate: true,
    backButton: { visible: false },
    title: {
      fontSize: 20,
      color: Colors.WHITE,
      alignment: 'center',
      fontFamily: Fonts.BOLD,
      text: ScreenNames.LOGIN,
    },
    background: { color: Colors.THEME }
  }
}