import moment from 'moment';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, StyleSheet, TouchableOpacity, Text, Keyboard } from 'react-native';

//custom imports below
import Fonts from '../utils/fonts';
import Colors from '../utils/colors';
import Loader from '../components/loader';
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
  const [loading, setLoading] = useState(false);

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
    from_date.setHours(0);
    from_date.setMinutes(0);
    from_date.setSeconds(0);
    to_date.setHours(23);
    to_date.setMinutes(59);
    to_date.setSeconds(59);
    setLoading(true);
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
        setLoading(false);
      }).catch(error => {
        console.log("error", error)
        ShowMessage("Something went wrong, Please try again!")
      });
  }

  console.log("data_to_process", data_to_process)
  let sample_total = data_to_process.reduce(function (total, currentValue: any) {
    return total + (+currentValue.final_value);
  }, 0);
  let quantity_total = data_to_process.reduce(function (total, currentValue: any) {
    return total + (+currentValue.quantity);
  }, 0);
  console.log("sample_total", sample_total + sample_total / 2)
  console.log("quantity_total", quantity_total)

  const renderCalculations = () => {
    if (data_to_process && data_to_process.length > 0) {
      let final_sample = sample_total + sample_total / 2,
        sample_by_qty = final_sample / quantity_total,
        qty_sub_sample = quantity_total + sample_by_qty,
        final_rate = qty_sub_sample * (+dairy_rate + +commission);
      return (
        <React.Fragment>
          <Text style={styles.textStyle}>{`Total Sample Value =    ${sample_total}`}</Text>
          <Text style={styles.textStyle}>{`Total Quantity Of Milk  =    ${quantity_total} Ltrs.`}</Text>
          <Text style={styles.textStyle}>{`Sample  (+)  (Sample/2) =    ${final_sample}`}</Text>
          <Text style={styles.textStyle}>{`Final Sample (/) Quantity  =    ${sample_by_qty}`}</Text>
          <Text style={styles.textStyle}>{`Quantity (-) Final Calculated Sample  =    ${qty_sub_sample}`}</Text>
          <Text style={styles.textStyle}>{`Final Value (x) Dairy Rate (+) Vendor Commission  =    ${final_rate} Rs`}</Text>
        </React.Fragment>
      );
    }
    return null;
  }

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
          extraStyle={{ marginTop: 30, marginBottom: 30 }}
          placeholder={"Enter Vendor Commission Per Litres"}
          onInputChange={(val: string) => updateFields('commission', val)}
        />
        {renderCalculations()}
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
      {loading && <Loader />}
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
    alignItems: 'center'
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
  },
  textStyle: {
    marginTop: 5,
    fontSize: 14,
    maxWidth: '80%',
    color: Colors.WHITE,
    textDecorationLine: 'underline',
    fontFamily: Fonts.SEMI_BOLD,
  }
})