import { Navigation } from 'react-native-navigation';

//custom imprts below
import ScreenNames from './utils/screenNames';
import RegisterScreens from './utils/registerScreens';

RegisterScreens();
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: ScreenNames.ADD_VENDOR,
            },
          },
        ],
      },
    },
  });
});
