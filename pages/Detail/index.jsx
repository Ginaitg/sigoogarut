import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  FormControl,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  SearchIcon,
  Skeleton,
  Text,
  useToast,
  View,
  VStack,
} from "native-base";
import { Dimensions, Pressable, SafeAreaView } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import StaggerOpt from "../../components/Stagger";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  base_uploads,
  dataTempatById,
  getFavorit,
  getKomentar,
  getMedia,
  kirimKomen,
  tambahFavorit,
  checkLogin,
} from "../../utils/redux/actions";

const base_url = base_uploads;

const Detail = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.mainReducer.user);
  const [data, setData] = useState({});
  const [komentar, setKomentar] = useState([]);
  const [gambar, setGambar] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const { id } = route.params;
  const [showModal, setShowModal] = useState(false);
  const [komenan, setKomenan] = useState("");
  const [loadingKomen, setKomen] = useState(false);
  const [isFavorite, setFavorite] = useState(false);
  const initData = async (_) => {
    setLoading(true);
    setLoadingData(true);
    await dispatch(dataTempatById(id)).then((res) => {
      const _data = res.data.data;
      setData((d) => ({ id: _data.id, ..._data.attributes }));
      setKomentar((e) => [..._data.attributes.data_komentars.data]);
      //   alert(JSON.stringify(komentar));
      setLoadingData(false);
    });

    await dispatch(getMedia(id))
      .then((res) => {
        //   setData((d) => ({ id: _data.id, ..._data.attributes }));
        setGambar(
          (e) =>
            res.data.data.attributes.pictures?.data?.attributes?.formats
              ?.thumbnail?.url
        );
        setLoading(false);
      })
      .catch((err) => {
        // alert(JSON.stringify(err.response));
      });
    dispatch(getFavorit(user.id, id))
      .then(() => {
        setFavorite(false);
      })
      .catch(() => {
        setFavorite(true);
      });
  };

  const toast = useToast();

  const isLogin = useSelector((state) => state.mainReducer.isLogin);
  // const routes = isLogin ? pages : authPages;
  useEffect(() => {
    setLoading(true);
    dispatch(checkLogin());
    setLoading(false);
  }, [isLogin]);

  const handleFavorit = (_) => {
    const temp = {
      id_user: user.id,
      data_tempat: id,
    };
    dispatch(tambahFavorit({ data: temp }))
      .then((res) => {
        initData();
        setFavorite(false);
        toast.show({
          render: () => {
            return (
              <Box bg="success.500" px="2" py="1" rounded="sm" mb={5}>
                Berhasil Menambah Kefavorit
              </Box>
            );
          },
        });
      })
      .catch((err) => {});
  };

  const handleKomentar = (_) => {
    const temp = {
      id_user: user.id,
      id_tempat: id,
      isi: komenan,
    };
    setKomen(true);
    // alert(JSON.stringify(temp));
    dispatch(kirimKomen({ data: temp }))
      .then((res) => {
        initData();
        setShowModal(false);
        setKomen(false);
      })
      .catch((err) => {
        setShowModal(false);
        setKomen(false);
      });
  };

  useEffect(() => {
    initData();
  }, []);
  return (
    <Box height={Dimensions.get("screen").height} flex={1} width={"full"}>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Berikan Komentar</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Komentar</FormControl.Label>
              <Input
                value={komenan}
                onChangeText={(e) => setKomenan(e)}
                placeholder={"Komentar disini..."}
              />
              <FormControl.HelperText>
                Berikan komentar dengan bijak
              </FormControl.HelperText>
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Cancel
              </Button>
              {isLogin ? ( 
                <Button isLoading={loadingKomen} onPress={handleKomentar}>
                Kirim
                </Button>
                ) : ( 
                <Button isLoading={loadingKomen} onPress={() => {navigation.navigate('Login')}}>
                  Kirim
                </Button>
                )}
              
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
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
                <Heading color="white" fontWeight="bold" marginRight={25}>
                  SIGOOGARUT
                </Heading>
              </HStack>
            </VStack>
          </Box>
        </Center>
      </Box>
      <Box>
        {loading ? (
          <Skeleton w={"100%"} h={"250px"} />
        ) : (
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image
              source={{
                uri: base_url + gambar,
              }}
              alt="image"
            />
          </AspectRatio>
        )}

        <Center
          bg="darkBlue.400"
          borderTopRightRadius={20}
          _dark={{
            bg: "blue.600",
          }}
          _text={{
            color: "warmGray.50",
            fontWeight: "700",
            fontSize: "md",
          }}
          position="absolute"
          bottom="0"
          px="3"
          py="1.5"
        >
          <HStack space={2} alignItems={"center"} justifyContent={"flex-start"}>
            <Text
              color={"warmGray.50"}
              fontWeight={"700"}
              fontSize={"sm"}
              maxW={"80%"}
            >
              {loadingData ? "Memuat..a.." : data.name}
            </Text>
            {isLogin ? ( 
            <>
                {isFavorite && (
              <IconButton
                variant="solid"
                bg="red.500"
                colorScheme="red"
                borderRadius="full"
                onPress={handleFavorit}
                icon={
                  <Icon
                    as={AntDesign}
                    size="6"
                    name="heart"
                    _dark={{
                      color: "warmGray.50",
                    }}
                    color="warmGray.50"
                  />
                }
              />
            )}
            </>
              ) : ( 
              <>
                {isFavorite && (
              <IconButton
                variant="solid"
                bg="red.500"
                colorScheme="red"
                borderRadius="full"
                onPress={() => {navigation.navigate('Login')}}
                icon={
                  <Icon
                    as={AntDesign}
                    size="6"
                    name="heart"
                    _dark={{
                      color: "warmGray.50",
                    }}
                    color="warmGray.50"
                  />
                }
              />
            )}
      </>
      )}
  
          </HStack>
        </Center>
      </Box>
      <ScrollView width={"full"}>
        <Center>
          <VStack space={3} width={"sm"} mt={3}>
            <Divider color={"gray.800"} />
            <HStack
              justifyContent={"space-evenly"}
              padding={2}
              borderRadius={"lg"}
            >
              <VStack
                justifyContent={"center"}
                alignItems={"center"}
                space={2}
                width={"1/2"}
              >
                <Icon
                  as={Ionicons}
                  name="calendar"
                  size={"lg"}
                  color={"black"}
                />
                <Heading size={"md"} color={"black"}>
                  Hari Buka
                </Heading>
                <Text color={"black"} fontWeight={"bold"}>
                  {data.dayOpen} - {data.dayClose}
                </Text>
              </VStack>
              <Divider color={"gray.800"} orientation="vertical" />
              <VStack
                justifyContent={"center"}
                alignItems={"center"}
                space={2}
                width={"1/2"}
              >
                <Icon as={Ionicons} name="time" size={"lg"} color={"black"} />
                <Heading size={"md"} color={"black"}>
                  Jam Buka
                </Heading>
                <Text color={"black"} fontWeight={"bold"}>
                  {data.openTime} - {data.closeTime}
                </Text>
              </VStack>
            </HStack>
            <Divider color={"gray.800"} />
            <HStack alignItems={"center"} space={2}>
              <Icon
                as={Ionicons}
                name="person-circle"
                size={"sm"}
                color={"black"}
              />
              <Heading size={"xs"}>Nama Pemilik</Heading>
            </HStack>
            <Text>{data.ownerName}</Text>
            <Divider color={"gray.800"} />
            <HStack alignItems={"center"} space={2}>
              <Icon as={Ionicons} name="location" size={"sm"} color={"black"} />
              <Heading size={"xs"}>Alamat</Heading>
            </HStack>
            <Text>{data.address}</Text>
            <Divider color={"gray.800"} />
            <HStack alignItems={"center"} space={2}>
              <Icon as={Ionicons} name="call" size={"sm"} color={"black"} />
              <Heading size={"xs"}>No. Telepon</Heading>
            </HStack>
            <Text>{data.phone}</Text>
            <Divider color={"gray.800"} />
            <HStack alignItems={"center"} space={2}>
              <Icon as={Ionicons} name="map" size={"sm"} color={"black"} />
              <Heading size={"xs"}>Lokasi</Heading>
            </HStack>
            <Box
              width={"full"}
              height={80}
              borderRadius={"10"}
              overflow={"hidden"}
            >
              {loadingData ? (
                <Skeleton w={"100%"} h={"250px"} />
              ) : (
                <MapView
                  provider={PROVIDER_GOOGLE}
                  initialRegion={{
                    latitude: data.latitude * 1,
                    longitude: data.longitude * 1,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                  style={{ width: "100%", height: "100%" }}
                >
                  <Marker
                    coordinate={{
                      longitude: data.longitude * 1,
                      latitude: data.latitude * 1,
                    }}
                    image={require("../../assets/images/shop.png")}
                    title={data.name}
                  />
                </MapView>
              )}
            </Box>
            <HStack alignItems={"center"} space={2}>
              <Icon
                as={Ionicons}
                name="chatbubbles"
                size={"sm"}
                color={"black"}
              />
              <Heading size={"xs"}>Komentar</Heading>
            </HStack>
            <VStack space={3}>
              {komentar.map((komen) => (
                <Box>
                  <HStack space={3}>
                    <VStack>
                      <HStack space={2} alignItems={"center"}>
                      {isLogin ? ( 
                      <Heading size={"xs"}>
                        {komen.attributes.id_user.data.attributes.username}
                      </Heading>
                      ) : ( 
                      <Heading size={"xs"}>
                        {/* {komen.attributes.id_user.data.attributes.username} */}
                      </Heading>
                      )}
                        <Text color={"muted.400"}>
                          {new Date(komen.attributes.createdAt).toUTCString()}
                        </Text>
                      </HStack>
                      <Text>"{komen.attributes.isi}"</Text>
                    </VStack>
                  </HStack>
                </Box>
              ))}
            </VStack>
            <Divider color={"gray.800"} />
          </VStack>
        </Center>
      </ScrollView>

      <StaggerOpt setShowKomen={setShowModal} isFavorit={isFavorite} />
      {/* <Center width={'full'} position={'absolute'} bottom={0} height={'70'} bgColor={'black'} >
                <HStack width={'sm'} justifyContent={'center'} alignItems={'center'} space={1}>
                    <Input width={'2/3'}  placeholder='Berikan Komentar' bgColor="white" color={'black'} placeholderTextColor={'muted.400'} borderWidth={0} InputLeftElement={<Icon as={Ionicons} name="chatbubble-ellipses" size={'5'} ml={2} color={'muted.400'} />} />
                    <Button  >Kirim</Button>
                </HStack>
            </Center> */}
    </Box>
  );
};

export default Detail;
