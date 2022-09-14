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
import { useDispatch } from "react-redux";
import { dataTempat } from "../../utils/redux/actions";

const Search = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [kecamatan, setKecamatan] = useState([
    {
      name: "Banyuresmi",
      isSelected: false,
    },
    {
      name: "Cibatu",
      isSelected: false,
    },
    {
      name: "Limbangan",
      isSelected: false,
    },
    {
      name: "Pamengpek",
      isSelected: false,
    },
    {
      name: "Cidegug",
      isSelected: false,
    },
  ]);

  const dispatch = useDispatch();
  const [dataTemp, setTemp] = useState([]);
  useEffect(() => {
    setLoading(true);
    dispatch(dataTempat()).then(async (res) => {
      await setData((d) =>
        res.data.data.map((e) => ({
          id: e.id,
          ...e.attributes,
          komentars: e.data_komentars,
        }))
      );
      await setTemp((d) =>
        res.data.data.map((e) => ({
          id: e.id,
          ...e.attributes,
          komentars: e.data_komentars,
        }))
      );
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (keyword !== "") {
      let temp = dataTemp.filter((e) => e.name.match(keyword));
      setData(temp);
    } else {
      setData(dataTemp);
    }
  }, [keyword]);

  return (
    <>
      <StatusBar />
      <Box width="full" bgColor="secondary.800">
        <Center>
          <Box width="sm" py={5}>
            <VStack space={4}>
              <HStack justifyContent={"space-between"} alignItems={"center"}>
                <Pressable onPress={() => navigation.navigate("Home")}>
                  <Icon
                    as={<Ionicons name="ios-arrow-back-outline" size={24} />}
                    color={"white"}
                  />
                </Pressable>
                <Heading color="white" fontWeight="bold" marginRight={25}>
                  SIGOOGARUT
                </Heading>
              </HStack>
              <Input
                variant={"rounded"}
                _dark={{ color: "white" }}
                placeholder="Cari Tempat oleh oleh disini"
                bgColor="white"
                color={"black"}
                placeholderTextColor={"muted.400"}
                borderWidth={0}
                value={keyword}
                onChangeText={(e) => setKeyword(e)}
                InputLeftElement={
                  <SearchIcon size="5" ml={2} color="muted.400" />
                }
              />
            </VStack>
          </Box>
        </Center>
      </Box>
      <ScrollView width={"full"}>
        <Center>
          <Box py={3} width={"90%"}>
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
                    image={d.pictures.data}
                    komentar={d.data_komentars}
                    id={d.id}
                  />
                ))}
          </Box>
        </Center>
      </ScrollView>
    </>
  );
};

export default Search;
