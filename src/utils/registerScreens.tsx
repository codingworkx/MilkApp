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
import ShowSales from "../screens/showSales";
import CalculateSales from "../screens/calculateSales";
import VendorActions from "../components/vendorActions";

const RegisterScreens = (Provider: any, store: any) => {
  Navigation.registerComponentWithRedux(ScreenNames.HOME, () => Home, Provider, store);
  Navigation.registerComponentWithRedux(ScreenNames.LOGIN, () => Login, Provider, store);
  Navigation.registerComponentWithRedux(ScreenNames.SIGNUP, () => Signup, Provider, store);
  Navigation.registerComponentWithRedux(ScreenNames.SPLASH, () => Splash, Provider, store);
  Navigation.registerComponentWithRedux(ScreenNames.SETTINGS, () => Settings, Provider, store);
  Navigation.registerComponentWithRedux(ScreenNames.ADD_SAMPLE, () => AddSample, Provider, store);
  Navigation.registerComponentWithRedux(ScreenNames.ADD_VENDOR, () => AddVendor, Provider, store);
  Navigation.registerComponentWithRedux(ScreenNames.SHOW_SALES, () => ShowSales, Provider, store);
  Navigation.registerComponentWithRedux(ScreenNames.VENDOR_ACTIONS, () => VendorActions, Provider, store);
  Navigation.registerComponentWithRedux(ScreenNames.CALCULATE_SALES, () => CalculateSales, Provider, store);
}

export default RegisterScreens;

