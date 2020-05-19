import { Navigation } from "react-native-navigation";

//imported screens
import Home from "../screens/home";
import Login from "../screens/login";
import Splash from "../screens/splash";
import Signup from "../screens/signup";
import ScreenNames from "./screenNames";
import Settings from "../screens/settings";
import AddVendor from "../screens/addVendor";
import AddSample from "../screens/addSample";
import VendorActions from "../components/vendorActions";

const RegisterScreens = (Provider: any, store: any) => {
  Navigation.registerComponent(ScreenNames.LOGIN, () => Login);
  Navigation.registerComponent(ScreenNames.SIGNUP, () => Signup);
  Navigation.registerComponent(ScreenNames.SETTINGS, () => Settings);
  Navigation.registerComponent(ScreenNames.VENDOR_ACTIONS, () => VendorActions);
  Navigation.registerComponentWithRedux(ScreenNames.HOME, () => Home, Provider, store);
  Navigation.registerComponentWithRedux(ScreenNames.SPLASH, () => Splash, Provider, store);
  Navigation.registerComponentWithRedux(ScreenNames.ADD_SAMPLE, () => AddSample, Provider, store);
  Navigation.registerComponentWithRedux(ScreenNames.ADD_VENDOR, () => AddVendor, Provider, store);
}

export default RegisterScreens;

