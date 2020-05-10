import { Dimensions } from "react-native";
import { Navigation } from "react-native-navigation";
const { height } = Dimensions.get('window');

const PushTo = (componentId: string, screenName: string) => {
  Navigation.push(componentId, { component: { name: screenName } })
}

const ShowModal = (screenName: string) => {
  Navigation.showModal({
    stack: {
      children: [{
        component: {
          name: screenName
        }
      }]
    }
  });
}

const SetRoot = (screenName: string) => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [{
          component: {
            name: screenName
          }
        }]
      }
    }
  });
}

export {
  PushTo,
  SetRoot,
  ShowModal,
}