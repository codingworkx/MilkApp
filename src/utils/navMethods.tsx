import { Navigation } from "react-native-navigation"

const PushTo = (componentId: string, screenName: string) => {
  Navigation.push(componentId, { component: { name: screenName } })
}

export {
  PushTo
}