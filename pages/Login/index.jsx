import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Input,
  Link,
  VStack,
  Text,
  Image,
} from "native-base";
import { useState } from "react";
import { Linking } from "react-native";
import { useDispatch } from "react-redux";
import { login } from "../../utils/redux/actions";
import logo from "../../assets/images/logo.png";
const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = (_) => {
    setLoading(true);
    dispatch(
      login({
        identifier: username,
        password: password,
      })
    )
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        // alert(error);
        alert('username atau password salah!!!');
      });
  };

  return (
    <Center w="100%" height={"full"} bg={"secondary.800"}>
      <Box safeArea p="2" py="8" w="90%">
        <Image source={logo} w={90} h={90} rounded={"full"} />
        <Heading
          size="lg"
          fontWeight="600"
          color="white"
          _dark={{
            color: "warmGray.50",
          }}
          maxW={"70%"}
        >
          Selamat Datang di SIGOOGARUT
        </Heading>

        <VStack space={3} mt="5">
          <FormControl _text={{ color: "white" }}>
            <FormControl.Label _text={{ color: "white" }}>
              Username
            </FormControl.Label>
            <Input
              bg={"white"}
              value={username}
              onChangeText={(e) => setUsername(e)}
              placeholder="Masukan Username"
            />
          </FormControl>
          <FormControl>
            <FormControl.Label _text={{ color: "white" }}>
              Password
            </FormControl.Label>
            <Input
              bg={"white"}
              value={password}
              onChangeText={(e) => setPassword(e)}
              type="password"
              placeholder="Masukan Password disini"
            />
            <Link
              _text={{
                fontSize: "xs",
                fontWeight: "500",
                color: "white",
              }}
              alignSelf="flex-end"
              mt="1"
              onPress={() =>
                Linking.openURL(
                  "http://wa.me/62895-3324-89124?text=Halo Admin SIGOOGARUT! saya ingin melakukan reset password"
                )
              }
            >
              Forget Password?
            </Link>
          </FormControl>
          <Button
            mt="2"
            colorScheme="secondary"
            isLoading={isLoading}
            onPress={handleLogin}
          >
            Sign in
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="white"
              _dark={{
                color: "warmGray.200",
              }}
            >
              Belum Punya Akun ?{" "}
            </Text>
            <Link
              _text={{
                color: "white",
                fontWeight: "medium",
                fontSize: "sm",
              }}
              onPress={() => navigation.navigate("Register")}
            >
              Daftar
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default Login;
