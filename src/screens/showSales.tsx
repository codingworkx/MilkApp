import React from 'react';
import moment from 'moment';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { SwipeListView } from 'react-native-swipe-list-view';

//custom imprts below
import Fonts from '../utils/fonts';
import Colors from '../utils/colors';
import LocalImages from '../utils/localImages';

const { width } = Dimensions.get('window');

export default function ShowSales({ data, dairy_rate, commission }: any) {
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

  const renderRowItem = (rowData: any) => {
    const { item } = rowData, { time, quantity, final_value, sample } = item;
    const calculated_time = firestore.Timestamp.fromMillis(time._seconds * 1000).toDate();
    return (
      <View style={styles.rowContainer}>
        <View style={styles.firstCol}>
          <Text style={styles.headerTxt}>
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

  const renderDeleteBtn = (rowData: any, rowMap: any) => {
    const { item } = rowData;
    return (
      <TouchableOpacity style={styles.deleteBtn} onPress={() => rowMap[item.id].closeRow()}>
        <Image
          resizeMode="contain"
          resizeMethod="resize"
          style={styles.deleteIcon}
          source={LocalImages.DELETE_ICON}
        />
      </TouchableOpacity>
    );
  }

  const renderCalculations = () => {
    let sample_total = data.reduce(function (total: any, currentValue: any) {
      return total + (+currentValue.final_value);
    }, 0);
    let quantity_total = data.reduce(function (total: any, currentValue: any) {
      return total + (+currentValue.quantity);
    }, 0);

    if (data && data.length > 0) {
      let final_sample = sample_total + sample_total / 2,
        sample_by_qty = final_sample / quantity_total,
        qty_sub_sample = quantity_total + sample_by_qty,
        final_rate = qty_sub_sample * (+dairy_rate + +commission);
      if (final_rate < 0) {
        final_rate = -final_rate;
      }
      return (
        <View style={styles.calcContainer}>
          <Text style={styles.textStyle}>{`Total Sample Value =    ${sample_total}`}</Text>
          <Text style={styles.textStyle}>{`Total Quantity Of Milk  =    ${quantity_total} Ltrs.`}</Text>
          <Text style={styles.textStyle}>{`Sample  (+)  (Sample/2) =    ${final_sample}`}</Text>
          <Text style={styles.textStyle}>{`Final Sample (/) Quantity  =    ${sample_by_qty}`}</Text>
          <Text style={styles.textStyle}>{`Quantity (-) Final Calculated Sample  =    ${qty_sub_sample}`}</Text>
          <Text style={[styles.textStyle, { marginBottom: 10 }]}>{`Final Value (x) Dairy Rate (+) Vendor Commission  =    ${final_rate} Rs`}</Text>
        </View>
      );
    }
    return null;
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      <SwipeListView
        data={data}
        useFlatList={true}
        rightOpenValue={-100}
        disableRightSwipe={true}
        style={{ marginTop: 60 }}
        renderItem={renderRowItem}
        renderHiddenItem={renderDeleteBtn}
        keyExtractor={(item: any) => item.id}
        contentContainerStyle={{ paddingBottom: 250 }}
      />
      {renderCalculations()}
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
    paddingHorizontal: 5,
    alignItems: 'center',
    backgroundColor: Colors.THEME
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
  headerContainer: {
    top: 0,
    height: 50,
    width: '100%',
    borderWidth: 2,
    borderRadius: 8,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.WHITE,
    justifyContent: 'space-between',
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
  textStyle: {
    marginTop: 5,
    fontSize: 14,
    maxWidth: '90%',
    color: Colors.WHITE,
    fontFamily: Fonts.SEMI_BOLD,
    textDecorationLine: 'underline',
  },
  rowContainer: {
    height: 50,
    borderWidth: 1,
    marginBottom: 5,
    borderRadius: 8,
    width: width - 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.WHITE,
    backgroundColor: Colors.THEME,
    justifyContent: 'space-between',
  },
  calcContainer: {
    width,
    bottom: 0,
    height: 180,
    paddingLeft: 20,
    borderTopWidth: 5,
    position: 'absolute',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderTopColor: Colors.WHITE,
    backgroundColor: Colors.THEME,
  },
  deleteBtn: {
    flex: 1,
    height: 50,
    borderRadius: 8,
    marginBottom: 5,
    paddingLeft: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  deleteIcon: {
    width: 30,
    height: 30,
    marginRight: 30
  }
})