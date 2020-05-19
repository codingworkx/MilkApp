import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

//custom imports below
import Fonts from '../utils/fonts';
import Colors from '../utils/colors';
import InputComponent from '../components/inputComponent';

export default function CalculateSales({ componentId }: any) {
  const [values, setValues] = useState({
    dairy_rate: '',
    commission: ''
  });

  const { dairy_rate } = values;

  const updateFields = (key: string, value: any) => {
    if (/^[0-9]*\.?[0-9]*$/.test(value)) {
      setValues({
        ...values,
        ...{ [key]: value }
      });
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <InputComponent
          maxLength={3}
          value={dairy_rate}
          label={"Dairy Rate"}
          placeholder={"Enter Dairy Rate Per Litres"}
          onInputChange={(val: string) => updateFields('dairy_rate', val)}
        />
      </View>
      <View style={styles.lowerContainer}>

      </View>
    </View>
  );
}

CalculateSales.options = {
  topBar: {
    animate: true,
    backButton: { color: Colors.WHITE },
    title: {
      fontSize: 20,
      color: Colors.WHITE,
      alignment: 'center',
      fontFamily: Fonts.BOLD,
      text: "Calculate Sales",
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
})