import { Navigation } from "react-native-navigation";

//imported screens
import Home from "../screens/home";
import Login from "../screens/login";
import Splash from "../screens/splash";
import Signup from "../screens/signup";
import ScreenNames from "./screenNames";
import Settings from "../screens/settings";
import AddVendor from "../screens/addVendor";

const RegisterScreens = () => {
  Navigation.registerComponent(ScreenNames.HOME, () => Home);
  Navigation.registerComponent(ScreenNames.LOGIN, () => Login);
  Navigation.registerComponent(ScreenNames.SPLASH, () => Splash);
  Navigation.registerComponent(ScreenNames.SIGNUP, () => Signup);
  Navigation.registerComponent(ScreenNames.SETTINGS, () => Settings);
  Navigation.registerComponent(ScreenNames.ADD_VENDOR, () => AddVendor);
}

export default RegisterScreens;

