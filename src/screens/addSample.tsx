import moment from 'moment';
import React, { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Keyboard } from 'react-native';

//custom imports below
import Fonts from '../utils/fonts';
import Colors from '../utils/colors';
import { ShowMessage } from '../utils/commonMethods';
import { Navigation } from 'react-native-navigation';
import InputComponent from '../components/inputComponent';
import { useSelector } from 'react-redux';

export default function AddSample({ componentId }: any) {
  const { vendor_key } = useSelector((state: any) => state.userDataReducer);
  const [values, setValues] = useState({
    sample: '',
    quantity: '',
    final_value: '0',
    date: new Date(),
    showPicker: false,
  });
  const { sample, quantity, final_value, showPicker, date } = values;

  useEffect(() => {
    if (sample.trim().length > 0 && quantity.trim().length > 0) {
      let calculated_val = (+sample - 60) * +quantity;
      if (calculated_val > 0) {
        setValues({
          ...values,
          ...{ final_value: `+${calculated_val.toString()}` }
        });
      } else {
        setValues({
          ...values,
          ...{ final_value: calculated_val.toString() }
        });
      }
    } else {
      setValues({
        ...values,
        ...{ final_value: '0' }
      });
    }
  }, [sample, quantity]);

  const updateFields = (key: string, value: any) => {
    if (/^[0-9]*\.?[0-9]*$/.test(value)) {
      setValues({
        ...values,
        ...{ [key]: value }
      });
    }
  }

  const submitSample = () => {
    Keyboard.dismiss();
    if (quantity.trim().length === 0) {
      ShowMessage('Please Enter Milk Quantity', false);
      return;
    }
    if (sample.trim().length === 0) {
      ShowMessage('Please Enter Milk Sample Value', false);
      return;
    }
    if (final_value.trim().length === 0) {
      ShowMessage('Please Check Your Values!', false);
      return;
    }
    console.log("vendor_key", vendor_key)
    if (vendor_key && vendor_key.length > 0) {
      firestore()
        .collection(`${vendor_key}-Samples`)
        .add({
          sample,
          quantity,
          final_value,
          time: firestore.Timestamp.fromDate(date)
        })
        .then(() => {
          ShowMessage("Sample Added Successfully", false)
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

  const updateDate = (date: any) => {
    if (date) {
      setValues({
        ...values,
        ...{ 'showPicker': false, date: date },
      });
    } else {
      setValues({
        ...values,
        ...{ 'showPicker': false },
      });
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <TouchableOpacity onPress={() => {
          setValues({
            ...values,
            ...{ 'showPicker': true },
          });
        }}>
          <InputComponent
            label={"Sample Date"}
            isPointerNone={true}
            placeholder={"Sample Date"}
            extraStyle={{ width: 170 }}
            value={moment(date).format("DD-MM-YYYY HH:mm A")}
            onInputChange={(val: string) => updateFields('date', val)}
          />
        </TouchableOpacity>
        <TextInput
          maxLength={4}
          value={quantity}
          keyboardType="numeric"
          style={styles.inputStyle}
          placeholder="Enter Milk Quantity"
          onChangeText={(val) => updateFields('quantity', val.trim())}
        />
        <TextInput
          maxLength={3}
          value={sample}
          keyboardType="numeric"
          style={styles.inputStyle}
          placeholder="Enter Sample Value"
          onChangeText={(val) => updateFields('sample', val.trim())}
        />
        <Text style={styles.totalTxt}>{`Calculated Sample Value : ${final_value}`}</Text>
      </View>
      <View style={styles.lowerContainer}>
        <TouchableOpacity style={styles.addBtn} onPress={submitSample}>
          <Text style={styles.addTxt}>{"Add Sample"}</Text>
        </TouchableOpacity>
      </View>
      {showPicker && (
        <DateTimePicker
          mode="date"
          value={date}
          display="default"
          onChange={(event: any, date: any) => updateDate(date)}
        />
      )}
    </View>
  );
}

AddSample.options = {
  topBar: {
    animate: true,
    backButton: { color: Colors.WHITE },
    title: {
      fontSize: 20,
      text: "Add Sample",
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
  addBtn: {
    width: 250,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.WHITE
  },
  addTxt: {
    fontSize: 22,
    color: Colors.THEME,
    fontFamily: Fonts.SEMI_BOLD
  },
  totalTxt: {
    fontSize: 22,
    marginTop: 30,
    color: Colors.WHITE,
    fontFamily: Fonts.BOLD
  }
});