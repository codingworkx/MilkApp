import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
//@ts-ignore
import EventEmitter from "react-native-eventemitter";
import { View, StyleSheet, Dimensions, TouchableOpacity, Image, FlatList, Text } from 'react-native';

//custom imports below
import Colors from '../utils/colors';
import Loader from '../components/loader';
import ScreenNames from '../utils/screenNames';
import LocalImages from '../utils/localImages';
import VendorCard from '../components/vendorCard';
import { ShowMessage } from '../utils/commonMethods';
import { UPDATE_USER_DATA } from '../utils/constants';
import { ShowOverlay, PushTo } from '../utils/navMethods';

const { width, height } = Dimensions.get('window');

export default function Home({ componentId }: any) {
  const dispatch = useDispatch();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const { uid } = useSelector((state: any) => state.userDataReducer);

  useEffect(() => {
    //event catched for opening add vendor screen
    EventEmitter.on("add_vendor", addVendor);
    //event catched for adding sample for a vendor
    EventEmitter.on("add_sample", addSample);
    //event catched for opening calculate sales screen
    EventEmitter.on("calculate_sales", calculate);

    getVendors();
  }, []);

  /**
   * function to get vendors list from firebase
   */
  const getVendors = async () => {
    if (uid && uid.length > 0) {
      setLoading(true);
      const vendors_data: any = await firestore().collection(`${uid}-Vendors`).get();
      let local_vendors: any = [];
      if (vendors_data._docs) {
        let { _docs } = vendors_data;
        _docs.forEach((e: any) => {
          let { _data, id } = e;
          local_vendors.push({
            ..._data,
            key: id,
          });
        });
        setVendors(local_vendors);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } else {
      ShowMessage('Something went wrong please try again!');
    }
  }

  const addVendor = () => {
    PushTo(componentId, ScreenNames.ADD_VENDOR);
  }

  const addSample = () => {
    PushTo(componentId, ScreenNames.ADD_SAMPLE);
  }

  const calculate = () => {
    PushTo(componentId, ScreenNames.CALCULATE_SALES);
  }

  const renderUpper = () => {
    return (
      <View style={styles.upperContainer}>
        <View style={styles.innerContainer}>
          <Image source={LocalImages.HOME_BG} resizeMethod="resize" resizeMode="contain" style={styles.bgImage} />
          <TouchableOpacity style={styles.settingBtn} onPress={() => ShowOverlay(ScreenNames.SETTINGS)}>
            <Image source={LocalImages.SETTINGS} resizeMode="contain"
              resizeMethod="resize" style={styles.setting} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const renderEmptyData = () => {
    return (
      <View style={styles.noData}>
        <Text style={styles.noDataTxt}>{"No Vendors!"}</Text>
      </View>
    );
  }

  const renderVendors = () => {
    return (
      <View style={styles.lowerContainer}>
        <FlatList
          data={vendors}
          keyExtractor={(item: any) => item.key}
          renderItem={({ item }: any) => {
            let { key, name, address, number } = item;
            return (
              <VendorCard vendor_key={key} name={name} address={address}
                number={number} onOverlayOpen={(key: string) => {
                  dispatch({
                    type: UPDATE_USER_DATA,
                    payload: { vendor_key: key }
                  })
                }} />
            );
          }}
          ListEmptyComponent={renderEmptyData}
          refreshing={loading}
          onRefresh={getVendors}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderUpper()}
      {renderVendors()}
      {loading && <Loader />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgreen'
  },
  upperContainer: {
    width,
    top: 0,
    zIndex: 9,
    position: 'absolute',
    alignSelf: 'center',
    height: width / 1.7,
    backgroundColor: 'transparent'
  },
  innerContainer: {
    bottom: 0,
    width: width * 2,
    height: width * 2,
    overflow: 'hidden',
    borderRadius: width,
    position: 'absolute',
    marginLeft: -(width / 2),
    backgroundColor: Colors.WHITE
  },
  lowerContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: width / 1.7,
    justifyContent: 'center',
    backgroundColor: Colors.WHITE
  },
  bgImage: {
    width,
    bottom: 0,
    left: width / 2,
    height: height / 2.8,
    position: 'absolute',
  },
  settingBtn: {
    width: 50,
    zIndex: 99,
    height: 50,
    left: width * 1.35,
    bottom: width / 2.3,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  setting: {
    width: 30,
    height: 30,
    tintColor: Colors.WHITE
  },
  noData: {
    height: 100,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  noDataTxt: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});

Home.options = {
  topBar: {
    visible: false
  }
}