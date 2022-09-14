import {
  Box,
  Center,
  Heading,
  HStack,
  SearchIcon,
  StatusBar,
  Text,
  VStack,
  Pressable,
  Input,
  KeyboardAvoidingView,
  Icon,
  Button,
  ScrollView,
  FlatList,
  Skeleton,
} from "native-base";
import { Dimensions, SafeAreaView, Linking } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import ButtonList from "../../components/ButtonList";
import CardItem from "../../components/CardItem";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataTempat, logout } from "../../utils/redux/actions";
import Navigation from "../../components/Navigation";

const Account = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const user = useSelector((state) => state.mainReducer.user);
  useEffect(() => {}, []);
  const dispatch = useDispatch();

  return (
    <>
      <StatusBar />
      <Box width="full" bgColor="secondary.800">
        <Center>
          <Box width="sm" py={5}>
            <VStack space={4}>
              <HStack justifyContent={"space-between"} alignItems={"center"}>
                <Pressable></Pressable>
                <Heading color="white" fontWeight="bold" marginRight={140}>
                  Account
                </Heading>
              </HStack>
            </VStack>
          </Box>
        </Center>
      </Box>
      <ScrollView width={"full"}>
        <Center>
          <VStack w={"90%"} py={3} space={2}>
            <Pressable p={2} shadow={1} rounded={8} bg={"white"}>
              <HStack justifyContent={"space-between"} alignItems={"center"}>
                <Icon as={Ionicons} name={"person"} size={6} />
                <Text>{user.username}</Text>
              </HStack>
            </Pressable>
            <Pressable p={2} shadow={1} rounded={8} bg={"white"}>
              <HStack justifyContent={"space-between"} alignItems={"center"}>
                <Icon as={Ionicons} name={"mail"} size={8} />
                <Text>{user.email}</Text>
              </HStack>
            </Pressable>
            <Pressable
              onPress={() => dispatch(logout())}
              p={2}
              shadow={1}
              rounded={8}
              bg={"white"}
            >
              <HStack justifyContent={"space-between"} alignItems={"center"}>
                <Text>Keluar</Text>
                <Icon as={Ionicons} name={"arrow-forward-sharp"} size={8} />
              </HStack>
            </Pressable>
          </VStack>
        </Center>
      </ScrollView>
      <Navigation />
    </>
  );
};

export default Account;
