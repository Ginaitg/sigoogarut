import Detail from "./Detail";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Search from "./Search";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Box } from "native-base";
import { checkLogin } from "../utils/redux/actions";
import Favorit from "./Favorite";
import Account from "./Account";
import { LogBox } from "react-native";
import splashscreen from "./splashscreen";

LogBox.ignoreAllLogs();

// const pages = [
//   // {
//   //   name: "Splashscreen",
//   //   component: splashscreen,
//   // },
//   {
//     name: "Home",
//     component: Home,
//   },
//   {
//     name: "Search",
//     component: Search,
//   },

//   {
//     name: "Detail",
//     component: Detail,
//   },
//   {
//     name: "Favorit",
//     component: Favorit,
//   },
//   {
//     name: "Account",
//     component: Account,
//   },
// ];

// const authPages = [
//   {
//     name: "Splashscreen",
//     component: splashscreen,
//   },
//   {
//     name: "Login",
//     component: Login,
//   },
//   {
//     name: "Register",
//     component: Register,
//   },
// ];

const Stack = createNativeStackNavigator();

export default function Screen() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.mainReducer.isLogin);
  // const routes = isLogin ? pages : authPages;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    dispatch(checkLogin());
    setLoading(false);
  }, [isLogin]);

  const Loading = (_) => (
    <Box w={"full"} h={"full"}>
      Loading ...
    </Box>
  );
  if (loading) {
    return <Loading />;
  }
 
  return (
    <NavigationContainer>
      <Stack.Navigator 
      initialRouteName="Home" 
      screenOptions={{headerShown: false}} 
      >
      <Stack.Screen name="Home" component={Home} /> 
      <Stack.Screen name="Search" component={Search} /> 
      <Stack.Screen name="Detail" component={Detail} /> 
      {isLogin ? ( 
      <>
      <Stack.Screen name="Favorit" component={Favorit} /> 
      <Stack.Screen name="Account" component={Account} /> 
      </>
      ) : ( 
      <>
      <Stack.Screen name="Login" component={Login} /> 
      <Stack.Screen name="Register" component={Register} /> 
      </>
      )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
