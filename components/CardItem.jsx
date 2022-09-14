import {
  AspectRatio,
  Box,
  Center,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  Icon,
  Pressable,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { base_uploads, dataTempatById } from "../utils/redux/actions";
const base_url = base_uploads;
const CardItem = ({ image, name, komentar, id }) => {
  const navigation = useNavigation();
  const komen = komentar?.data?.length || 0;

  return (
    <Pressable
      alignItems="center"
      my={2}
      onPress={() =>
        navigation.navigate("Detail", {
          id: id,
        })
      }
    >
      <Box
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        _dark={{
          borderColor: "coolGray.600",
          backgroundColor: "gray.700",
        }}
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        _light={{
          backgroundColor: "gray.50",
        }}
      >
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image
              source={{
                uri: base_url + image?.attributes?.formats?.thumbnail?.url,
              }}
              alt="image"
            />
          </AspectRatio>
          <Center
            bg="darkBlue.500"
            _dark={{
              bg: "darkBlue.400",
            }}
            _text={{
              color: "warmGray.50",
              fontWeight: "700",
              fontSize: "xs",
            }}
            position="absolute"
            bottom="0"
            px="3"
            py="1.5"
          >
            PHOTO
          </Center>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              {name}
            </Heading>
          </Stack>
          <HStack alignItems="center" space={4} justifyContent="space-between">
            <HStack alignItems="center" space={2}>
              <Icon as={MaterialIcons} name="comment" size={23} />
              <Text
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
                fontWeight="400"
              >
                {komen} Komentar
              </Text>
            </HStack>
          </HStack>
        </Stack>
      </Box>
    </Pressable>
  );
};

export default CardItem;
