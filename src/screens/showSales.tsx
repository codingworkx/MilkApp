import React from 'react';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';

//custom imprts below
import Fonts from '../utils/fonts';
import Colors from '../utils/colors';

export default function ShowSales({ componentId, data, dairy_rate, commission }: any) {
  console.log("data", data)

  if (!data || data.length === 0) {
    return (
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataTxt}>{"No Data, Please Check Selected Dates."}</Text>
      </View>
    );
  }

  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.firstCol}>
          <Text style={styles.headerTxt}>{"Date"}</Text>
        </View>
        <View style={styles.secCol}>
          <Text style={styles.headerTxt}>{"Qty"}</Text>
        </View>
        <View style={styles.secCol}>
          <Text style={styles.headerTxt}>{"Sample"}</Text>
        </View>
        <View style={styles.lastCol}>
          <Text style={styles.headerTxt}>{"Calc. Val."}</Text>
        </View>
      </View>
    );
  }

  const renderData = (rowData: any) => {
    const { item, index } = rowData, { time, quantity, final_value, sample } = item;
    const calculated_time = firestore.Timestamp.fromMillis(time._seconds * 1000).toDate();
    let extraStyle = {};
    if (index === data.length - 1) {
      extraStyle = {
        borderBottomWidth: 0
      };
    }
    return (
      <View style={[styles.dataContainer, extraStyle]}>
        <View style={styles.firstCol}>
          <Text style={styles.valueTxt}>
            {moment(calculated_time).format("DD-MM-YYYY HH:mm A")}
          </Text>
        </View>
        <View style={styles.secCol}>
          <Text style={styles.valueTxt}>{`${quantity} Ltrs.`}</Text>
        </View>
        <View style={styles.secCol}>
          <Text style={styles.valueTxt}>{sample}</Text>
        </View>
        <View style={styles.lastCol}>
          <Text style={styles.valueTxt}>{final_value}</Text>
        </View>
      </View>
    );
  }

  const renderCalculations = () => {
    let sample_total = data.reduce(function (total: any, currentValue: any) {
      return total + (+currentValue.final_value);
    }, 0);
    let quantity_total = data.reduce(function (total: any, currentValue: any) {
      return total + (+currentValue.quantity);
    }, 0);

    console.log("sample_total", sample_total + sample_total / 2)
    console.log("quantity_total", quantity_total)
    if (data && data.length > 0) {
      let final_sample = sample_total + sample_total / 2,
        sample_by_qty = final_sample / quantity_total,
        qty_sub_sample = quantity_total + sample_by_qty,
        final_rate = qty_sub_sample * (+dairy_rate + +commission);
      if (final_rate < 0) {
        final_rate = -final_rate;
      }
      return (
        <React.Fragment>
          <Text style={[styles.textStyle, { marginTop: 10 }]}>{`Total Sample Value =    ${sample_total}`}</Text>
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
        <FlatList
          data={data}
          renderItem={renderData}
          style={styles.listStyle}
          ListHeaderComponent={renderHeader}
          keyExtractor={(item: any, index) => index.toString()}
        />
      </View>
      <View style={styles.lowerContainer}>
        {renderCalculations()}
      </View>
    </View>
  );
}

ShowSales.options = {
  topBar: {
    animate: true,
    backButton: { color: Colors.WHITE },
    title: {
      fontSize: 20,
      text: "Sales",
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
    alignItems: 'center',
    backgroundColor: Colors.THEME
  },
  upperContainer: {
    flex: 0.7,
    alignItems: 'center'
  },
  noDataContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.THEME
  },
  noDataTxt: {
    fontSize: 18,
    color: Colors.WHITE,
    fontFamily: Fonts.SEMI_BOLD
  },
  listStyle: {
    width: '95%',
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.WHITE
  },
  headerContainer: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    justifyContent: 'space-between',
    borderBottomColor: Colors.WHITE,
  },
  dataContainer: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    justifyContent: 'space-between',
    borderBottomColor: Colors.WHITE,
  },
  headerTxt: {
    fontSize: 14,
    color: Colors.WHITE,
    fontFamily: Fonts.BOLD
  },
  firstCol: {
    width: '40%',
    height: '100%',
    borderRightWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightColor: Colors.WHITE
  },
  secCol: {
    width: '18%',
    height: '100%',
    borderRightWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightColor: Colors.WHITE
  },
  lastCol: {
    width: '24%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  valueTxt: {
    fontSize: 13,
    color: Colors.WHITE,
    fontFamily: Fonts.SEMI_BOLD
  },
  lowerContainer: {
    flex: 0.3,
  },
  textStyle: {
    marginTop: 5,
    fontSize: 14,
    maxWidth: '90%',
    color: Colors.WHITE,
    fontFamily: Fonts.SEMI_BOLD,
    textDecorationLine: 'underline',
  }
})