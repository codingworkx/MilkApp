import React, { Component } from 'react';
import {
  Text,
  View,
  Animated,
  Platform,
  TextInput,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Fonts from '../utils/fonts';
const { height, width } = Dimensions.get('window');

interface FloatingLabelProps {
  visible: boolean
}

interface FloatingLabelState {
  paddingAnim: Animated.Value,
  opacityAnim: Animated.Value
}

class FloatingLabel extends Component<FloatingLabelProps, FloatingLabelState> {
  constructor(props: FloatingLabelProps) {
    super(props);
    let initialPadding = 9;
    let initialOpacity = 0;

    if (this.props.visible) {
      initialPadding = 5;
      initialOpacity = 1;
    }

    this.state = {
      paddingAnim: new Animated.Value(initialPadding),
      opacityAnim: new Animated.Value(initialOpacity)
    }
  }

  componentWillReceiveProps(newProps: FloatingLabelProps) {
    Animated.timing(this.state.paddingAnim, {
      duration: 230,
      useNativeDriver: false,
      toValue: newProps.visible ? 0 : 9,
    }).start();

    return Animated.timing(this.state.opacityAnim, {
      duration: 230,
      useNativeDriver: false,
      toValue: newProps.visible ? 1 : 0,
    }).start();
  }

  render() {
    return (
      <Animated.View style={[styles.floatingLabel, { paddingTop: this.state.paddingAnim, opacity: this.state.opacityAnim }]}>
        {this.props.children}
      </Animated.View>
    );
  }
}

interface TextFieldHolderProps {
  withValue: boolean
}

interface TextFieldHolderState {
  marginAnim: Animated.Value
}

class TextFieldHolder extends Component<TextFieldHolderProps, TextFieldHolderState> {
  constructor(props: TextFieldHolderProps) {
    super(props);
    this.state = {
      marginAnim: new Animated.Value(this.props.withValue ? 10 : 0)
    }
  }

  componentWillReceiveProps(newProps: TextFieldHolderProps) {
    return Animated.timing(this.state.marginAnim, {
      duration: 230,
      useNativeDriver: false,
      toValue: newProps.withValue ? 10 : 0,
    }).start();
  }

  render() {
    return (
      <Animated.View style={{ marginTop: this.state.marginAnim, flexDirection: 'row', paddingTop: height * 0.015 }}>
        {this.props.children}
      </Animated.View>
    );
  }
}

interface Props {
  label: string;
  value: string;
  keyboardType?: any;
  maxLength?: number;
  placeholder: string;
  onInputChange: Function;
}

interface State {
  focused: boolean
}

export default class InputComponent extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      focused: false
    };
  }

  render() {
    const { value } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.viewContainer}>
          <View style={styles.fieldContainer}>
            <FloatingLabel visible={value.length > 0}>
              <Text style={[styles.fieldLabel, this.labelStyle()]}>{this.placeholderValue()}</Text>
            </FloatingLabel>
            <TextFieldHolder withValue={value.length > 0}>
              <TextInput {...this.props}
                ref='basicRef'
                value={value}
                style={styles.valueText}
                placeholderTextColor={'#fff'}
                onFocus={() => this.setFocus()}
                maxLength={this.props.maxLength}
                onBlur={() => this.unsetFocus()}
                underlineColorAndroid="transparent"
                keyboardType={this.props.keyboardType}
                onChangeText={(value) => this.setText(value)}
              />
            </TextFieldHolder>
          </View>
        </View>
      </View >
    );
  }

  inputRef() {
    return this.refs.input;
  }

  focus() {
    // @ts-ignore
    this.inputRef().focus();
  }

  blur() {
    // @ts-ignore
    this.inputRef().blur();
  }

  isFocused() {
    // @ts-ignore
    return this.inputRef().isFocused();
  }

  clear() {
    // @ts-ignore
    this.inputRef().clear();
  }

  setFocus() {
    this.setState({
      focused: true
    });
    try {
      // @ts-ignore
      return this.props.onFocus();
    } catch (_error) { }
  }

  unsetFocus() {
    this.setState({
      focused: false
    });
  }

  labelStyle() {
    if (this.state.focused) {
      return styles.focused;
    }
  }

  placeholderValue() {
    if (this.props.value) {
      return this.props.label;
    }
  }

  setText(value: string) {
    this.props.onInputChange(value);
  }
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.8,
    borderBottomWidth: 1,
    height: height * 0.059,
    justifyContent: 'center',
    marginLeft: width * 0.033,
    backgroundColor: 'transparent',
    borderBottomColor: 'rgb(241,241,242)'
  },
  viewContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  floatingLabel: {
    top: 0,
    left: 0,
    position: 'absolute',
  },
  fieldLabel: {
    color: '#fff',
    fontSize: height * 0.019,
  },
  fieldContainer: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
  },
  valueText: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    fontFamily: Fonts.SEMI_BOLD,
    height: (Platform.OS == 'ios' ? 20 : 60),
  },
  focused: {
    color: '#fff',
    fontSize: height * 0.019,
    fontFamily: Fonts.REGULAR,
    marginBottom: height * 0.011,
  },
});