import { Navigation } from "react-native-navigation"

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

export {
  PushTo,
  ShowModal
}