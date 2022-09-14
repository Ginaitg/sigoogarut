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
import { Dimensions, SafeAreaView } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import ButtonList from "../../components/ButtonList";
import CardItem from "../../components/CardItem";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataTempat, getUserFavorit } from "../../utils/redux/actions";
import Navigation from "../../components/Navigation";

const Favorit = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const user = useSelector((state) => state.mainReducer.user);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch(getUserFavorit(user.id)).then((res) => {
      setData((d) =>
        res.data.data.map((e) => ({
          id: e.attributes.data_tempat.data.id,
          ...e.attributes.data_tempat.data.attributes,
          komentars: e.attributes.data_tempat.data_komentars,
        }))
      );
      setLoading(false);
    });
  }, []);

  return (
    <>
      <StatusBar />
      <Box width="full" bgColor="secondary.800">
        <Center>
          <Box width="sm" py={5}>
            <VStack space={4}>
              <HStack justifyContent={"space-between"} alignItems={"center"}>
                <Pressable onPress={() => navigation.goBack()}>
                  <Icon
                    as={<Ionicons name="ios-arrow-back-outline" size={24} />}
                    color={"white"}
                  />
                </Pressable>
                <Heading color="white" fontWeight="bold" marginRight={150}>
                  Favorit
                </Heading>
              </HStack>
            </VStack>
          </Box>
        </Center>
      </Box>
      <ScrollView width={"full"}>
        <Center pb={20}>
          <VStack space={2} mt={2} w={"90%"}>
            {!isLoading && data.length === 0 && (
              <Text textAlign={"center"}>Data Tidak Ada</Text>
            )}
            {isLoading
              ? new Array(3)
                  .fill([])
                  .map((_, i) => (
                    <Skeleton w={"full"} h={"90"} rounded={10} my={2} />
                  ))
              : data.map((d, i) => (
                  <CardItem
                    name={d.name}
                    image={d.pictures?.data}
                    komentar={d?.data_komentars}
                    id={d.id}
                  />
                ))}
          </VStack>
        </Center>
      </ScrollView>
    </>
  );
};

export default Favorit;
