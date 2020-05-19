import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';

//custom imprts below
import { store } from './store';
import ScreenNames from './utils/screenNames';
import RegisterScreens from './utils/registerScreens';

RegisterScreens(Provider, store);
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: ScreenNames.CALCULATE_SALES,
            },
          },
        ],
      },
    },
  });
});
