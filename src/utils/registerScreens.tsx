import { Navigation } from "react-native-navigation";

//imported screens
import Home from "../screens/home";
import Login from "../screens/login";
import Splash from "../screens/splash";
import Signup from "../screens/signup";
import ScreenNames from "./screenNames";

const RegisterScreens = () => {
  Navigation.registerComponent(ScreenNames.HOME, () => Home);
  Navigation.registerComponent(ScreenNames.LOGIN, () => Login);
  Navigation.registerComponent(ScreenNames.SPLASH, () => Splash);
  Navigation.registerComponent(ScreenNames.SIGNUP, () => Signup);
}

export default RegisterScreens;

