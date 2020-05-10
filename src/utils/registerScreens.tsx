import { Navigation } from "react-native-navigation";

//imported screens
import Login from "../screens/login";
import Splash from "../screens/splash";
import ScreenNames from "./screenNames";

const RegisterScreens = () => {
  Navigation.registerComponent(ScreenNames.LOGIN, () => Login);
  Navigation.registerComponent(ScreenNames.SPLASH, () => Splash);
}

export default RegisterScreens;

