import {Navigation} from 'react-native-navigation';

//custom imprts below
import ScreenNames from './src/utils/screenNames';
import RegisterScreens from './src/utils/registerScreens';

RegisterScreens();
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: ScreenNames.SPLASH,
            },
          },
        ],
      },
    },
  });
});
