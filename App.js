import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import store from "./utils/redux/store";
import { NativeBaseProvider } from "native-base";
import Screen from "./pages";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <Screen />
      </NativeBaseProvider>
    </Provider>
  );
}
