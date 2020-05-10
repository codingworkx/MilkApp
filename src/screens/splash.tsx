import React, { useEffect } from 'react';
import { Navigation } from 'react-native-navigation';
import { StyleSheet, ImageBackground, View, Animated, Easing } from 'react-native';

//custom imports below
import Fonts from '../utils/fonts';
import LocalImages from '../utils/localImages';
import ScreenNames from '../utils/screenNames';

export default function Splash({ componentId }: any) {
  let initialVal: Animated.Value = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(initialVal, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Navigation.push(componentId, { component: { name: ScreenNames.LOGIN } })
    }, 2500);
  }, []);

  return (
    <ImageBackground source={LocalImages.SPLASH_BG} style={styles.container}
      resizeMethod="resize" resizeMode="cover">
      <View style={styles.textContainer}>
        <Animated.Text style={[styles.text, { opacity: initialVal }]}>{"Milk"}</Animated.Text>
        <Animated.Text style={[styles.textSmall, { opacity: initialVal }]}>{"App"}</Animated.Text>
      </View>
    </ImageBackground>
  );
}

Splash.options = {
  topBar: {
    visible: false
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  textContainer: {
    right: 90,
    position: 'absolute'
  },
  text: {
    fontSize: 40,
    color: '#fff',
    fontFamily: Fonts.BOLD
  },
  textSmall: {
    fontSize: 30,
    color: '#fff',
    alignSelf: 'center',
    fontFamily: Fonts.SEMI_BOLD
  }
})