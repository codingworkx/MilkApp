import moment from 'moment';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, StyleSheet, TouchableOpacity, Text, Keyboard } from 'react-native';

//custom imports below
import Fonts from '../utils/fonts';
import Colors from '../utils/colors';
import { ShowMessage } from '../utils/commonMethods';
import InputComponent from '../components/inputComponent';

export default function CalculateSales({ componentId }: any) {
  const [values, setValues] = useState({
    dairy_rate: '',
    commission: '',
    data_to_process: [],
    showToPicker: false,
    from_date: new Date(),
    showFromPicker: false,
    to_date: moment(new Date()).add(1, 'days').toDate(),
  });
  const { dairy_rate, commission, from_date, to_date,
    showFromPicker, showToPicker, data_to_process } = values;
  const { vendor_key } = useSelector((state: any) => state.userDataReducer);

  const updateFields = (key: string, value: any) => {
    if (/^[0-9]*\.?[0-9]*$/.test(value)) {
      setValues({
        ...values,
        ...{ [key]: value }
      });
    }
  }

  const updatePickerVal = (key: string, value: any) => {
    setValues({
      ...values,
      ...{ [key]: value }
    });
  }

  const updateFromDate = (date: any) => {
    if (date) {
      setValues({
        ...values,
        ...{ 'showFromPicker': false, from_date: date },
      });
    } else {
      setValues({
        ...values,
        ...{ 'showFromPicker': false },
      });
    }
  }

  const updateToDate = (date: any) => {
    if (date) {
      setValues({
        ...values,
        ...{ 'showToPicker': false, to_date: date },
      });
    } else {
      setValues({
        ...values,
        ...{ 'showToPicker': false },
      });
    }
  }

  const getData = () => {
    Keyboard.dismiss();
    if (dairy_rate.trim().length === 0) {
      ShowMessage('Please Enter Dairy Rate', false);
      return;
    }
    if (commission.trim().length === 0) {
      ShowMessage('Please Enter Vendor Commission', false);
      return;
    }
    let from_ts = firestore.Timestamp.fromDate(from_date),
      to_ts = firestore.Timestamp.fromDate(to_date);
    firestore().collection(`${vendor_key}-Samples`)
      .where('time', '>=', from_ts)
      .where('time', '<=', to_ts)
      .get()
      .then(snapshot => {
        let data_to_save: any = [];
        snapshot.forEach((element: any) => {
          console.log("element", element)
          data_to_save.push(element._data);
        });
        setValues({
          ...values,
          ...{ data_to_process: data_to_save },
        });
      }).catch(error => {
        ShowMessage("Something went wrong, Please try again!")
      });
  }

  console.log("data_to_process", data_to_process)

  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <View style={styles.datesContainer}>
          <TouchableOpacity onPress={() => updatePickerVal('showFromPicker', true)}>
            <InputComponent
              label={"From Date"}
              isPointerNone={true}
              placeholder={"From Date"}
              extraStyle={{ marginTop: 30, width: 95 }}
              value={moment(from_date).format("DD-MM-YYYY")}
              onInputChange={(val: string) => updateFields('from_date', val)}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => updatePickerVal('showToPicker', true)}>
            <InputComponent
              label={"To Date"}
              isPointerNone={true}
              placeholder={"To Date"}
              extraStyle={{ marginTop: 30, width: 95 }}
              value={moment(to_date).format("DD-MM-YYYY")}
              onInputChange={(val: string) => updateFields('to_date', val)}
            />
          </TouchableOpacity>
        </View>
        <InputComponent
          maxLength={3}
          value={dairy_rate}
          label={"Dairy Rate"}
          extraStyle={{ marginTop: 30 }}
          placeholder={"Enter Dairy Rate Per Litres"}
          onInputChange={(val: string) => updateFields('dairy_rate', val)}
        />
        <InputComponent
          maxLength={3}
          value={commission}
          label={"Vendor Commission"}
          extraStyle={{ marginTop: 30 }}
          placeholder={"Enter Vendor Commission Per Litres"}
          onInputChange={(val: string) => updateFields('commission', val)}
        />
      </View>
      <View style={styles.lowerContainer}>
        <TouchableOpacity style={styles.addBtn} onPress={getData}>
          <Text style={styles.addTxt}>{"Calculate Sales"}</Text>
        </TouchableOpacity>
      </View>
      {showFromPicker && (
        <DateTimePicker
          mode="date"
          value={from_date}
          display="default"
          onChange={(event: any, date: any) => updateFromDate(date)}
        />
      )}
      {showToPicker && (
        <DateTimePicker
          mode="date"
          value={to_date}
          display="default"
          minimumDate={moment(from_date).add(1, 'days').toDate()}
          onChange={(event: any, date: any) => updateToDate(date)}
        />
      )}
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
  datesContainer: {
    width: '70%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
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
})