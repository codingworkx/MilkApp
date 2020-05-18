import { useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
//@ts-ignore
import EventEmitter from "react-native-eventemitter";
import { FloatingAction } from "react-native-floating-action";
import { View, StyleSheet, Dimensions, TouchableOpacity, Image, Alert, FlatList } from 'react-native';

//custom imports below
import Colors from '../utils/colors';
import Loader from '../components/loader';
import ScreenNames from '../utils/screenNames';
import LocalImages from '../utils/localImages';
import VendorCard from '../components/vendorCard';
import { SetRoot, ShowOverlay, PushTo } from '../utils/navMethods';

const { width, height } = Dimensions.get('window');
const actions = [
  {
    position: 1,
    text: "Add Vendor",
    name: "add_vendor",
    icon: LocalImages.ADD_USER,
  }
];

export default function Home({ componentId }: any) {
  const { uid } = useSelector((state: any) => state.userDataReducer);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //event catched for logout user
    EventEmitter.on("logout", showLogoutAlert);

    //code to get Vendors data from firebase
    const subscriber = firestore()
      .collection(`${uid}-Vendors`)
      .onSnapshot(querySnapshot => {
        const local_vendors: any = [];

        querySnapshot.forEach(documentSnapshot => {
          local_vendors.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setVendors(local_vendors);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  const showLogoutAlert = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => console.log("Cancel Pressed"),
        },
        { text: "YES", onPress: () => logout() }
      ],
      { cancelable: false }
    );
  }

  const logout = () => {
    auth()
      .signOut()
      .then(() => SetRoot(ScreenNames.LOGIN));
  }

  const onActionBtnPress = (name?: string) => {
    if (name === "add_vendor") {
      PushTo(componentId, ScreenNames.ADD_VENDOR);
    }
  }

  console.log("vendors", vendors)
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

  const renderVendors = () => {
    return (
      <View style={styles.lowerContainer}>
        <FlatList
          data={vendors}
          keyExtractor={(item: any) => item.key}
          renderItem={({ item }: any) => <VendorCard {...item} componentId={componentId} />}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderUpper()}
      {renderVendors()}
      <FloatingAction
        actions={actions}
        onPressItem={onActionBtnPress}
      />
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
    height: height / 2.5,
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
  }
});

Home.options = {
  topBar: {
    visible: false
  }
}