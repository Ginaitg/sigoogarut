import {
  Box,
  Center,
  HStack,
  Icon,
  NativeBaseProvider,
  Text,
} from "native-base";
import React, { useEffect, useState } from "react";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { checkLogin } from "../utils/redux/actions";

function Navigation() {
  const dispatch = useDispatch();
  const menu = useSelector((state) => state.mainReducer.menu);
  const navigation = useNavigation();
  const handleChange = (name, select) => {
    navigation.navigate(name);
    dispatch({ type: "SET_MENU", payload: select });
  };
  const isLogin = useSelector((state) => state.mainReducer.isLogin);
  // const routes = isLogin ? pages : authPages;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    dispatch(checkLogin());
    setLoading(false);
  }, [isLogin]);


  return (
    <NativeBaseProvider>
      <Box
        bg="secondary.800"
        height="60"
        position={"absolute"}
        bottom={0}
        safeAreaTop
        width="100%"
        alignSelf="center"
        shadow={6}
        overflow={"hidden"}
        justifyContent={"center"}
        zIndex={100}
      >
        <HStack
          bg="secondary.800"
          alignItems="center"
          safeAreaBottom
          zIndex={999}
        >
          <Pressable
            cursor="pointer"
            opacity={menu === 0 ? 1 : 0.5}
            py="3"
            flex={1}
            onPress={() => handleChange("Home", 0)}
          >
            <Center>
              <Icon
                mb="1"
                as={
                  <MaterialCommunityIcons
                    name={menu === 0 ? "home" : "home-outline"}
                  />
                }
                color="white"
                size="sm"
              />
              <Text color="white" fontSize="12">
                Home
              </Text>
            </Center>
          </Pressable>
          {isLogin ? ( 
            <>
                <Pressable
                cursor="pointer"
                opacity={menu === 1 ? 1 : 0.5}
                py="2"
                flex={1}
                onPress={() => handleChange("Favorit", 1)}>
                <Center>
                  <Icon
                    mb="1"
                    as={
                      <MaterialCommunityIcons
                        name={
                          menu === 1 ? "account-heart" : "account-heart-outline"
                        }
                        color="black"
                      />
                    }
                    color="white"
                    size="sm"
                  />
                  <Text color="white" fontSize="12">
                    Favorite
                  </Text>
                </Center>
              </Pressable>
                      <Pressable
                      cursor="pointer"
                      opacity={menu === 3 ? 1 : 0.5}
                      py="2"
                      flex={1}
                      onPress={() => handleChange("Account", 3)}
                    >
                      <Center>
                        <Icon
                          mb="1"
                          as={
                            <MaterialCommunityIcons
                              name={menu === 3 ? "account" : "account-outline"}
                            />
                          }
                          color="white"
                          size="sm"
                        />
                        <Text color="white" fontSize="12">
                          Account
                        </Text>
                      </Center>
                    </Pressable>
                    </>
              ) : ( 
                <>
                <Pressable
                cursor="pointer"
                opacity={menu === 1 ? 1 : 0.5}
                py="2"
                flex={1}
                onPress={() => handleChange("Login", 1)}>
                <Center>
                  <Icon
                    mb="1"
                    as={
                      <MaterialCommunityIcons
                        name={
                          menu === 1 ? "account-heart" : "account-heart-outline"
                        }
                        color="black"
                      />
                    }
                    color="white"
                    size="sm"
                  />
                  <Text color="white" fontSize="12">
                    Favorite
                  </Text>
                </Center>
              </Pressable>
                      <Pressable
                      cursor="pointer"
                      opacity={menu === 3 ? 1 : 0.5}
                      py="2"
                      flex={1}
                      onPress={() => handleChange("Login", 3)}
                    >
                      <Center>
                        <Icon
                          mb="1"
                          as={
                            <MaterialCommunityIcons
                              name={menu === 3 ? "account" : "account-outline"}
                            />
                          }
                          color="white"
                          size="sm"
                        />
                        <Text color="white" fontSize="12">
                          Account
                        </Text>
                      </Center>
                    </Pressable>
                  </>
          )}
  
        </HStack>
      </Box>
    </NativeBaseProvider>
  );
}

export default React.memo(Navigation);
