import React from 'react';
import { View, StyleSheet, Dimensions, Image, Text, TouchableOpacity } from 'react-native';

//custom imports below
import Colors from '../utils/colors';
import { PushTo } from '../utils/navMethods';
import LocalImages from '../utils/localImages';
import ScreenNames from '../utils/screenNames';

const { width } = Dimensions.get('window');

interface Props {
  name: string;
  number: string;
  address: string;
  vendor_key: string;
  componentId: string;
}

export default function VendorCard({ vendor_key, name, address, number, componentId }: Props) {
  const renderImage = () => {
    return (
      <View style={styles.imgContainer}>
        <Image
          resizeMode="cover"
          resizeMethod="resize"
          source={LocalImages.MILK_MAN}
          style={styles.imgStyle}
        />
      </View>
    );
  }

  const renderText = (title: string, value: string) => {
    return (
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value} numberOfLines={2}>{value}</Text>
      </View>
    );
  }

  const renderDetails = () => {
    return (
      <View style={styles.descContainer}>
        {renderText("Name :     ", name)}
        {renderText("Phone :    ", number)}
        {renderText("Address : ", address || "No Address added")}
      </View>
    );
  }

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.5}
      onPress={() => PushTo(componentId, ScreenNames.ADD_SAMPLE, { vendor_key })}>
      {renderImage()}
      {renderDetails()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 90,
    marginTop: 15,
    borderRadius: 10,
    width: width / 1.1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.THEME
  },
  imgContainer: {
    width: 60,
    height: 60,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 35,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgStyle: {
    width: '100%',
    height: '100%',
  },
  descContainer: {
    width: '75%',
    height: '100%',
    justifyContent: 'center'
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  value: {
    fontSize: 14,
    width: '75%',
    color: Colors.WHITE
  }
})