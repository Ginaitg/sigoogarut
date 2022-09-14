import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Image,
  Input,
  Link,
  Text,
  useToast,
  VStack,
} from "native-base";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../utils/redux/actions";
import logo from "../../assets/images/logo.png";
const Register = ({ navigation }) => {
  const [isLoading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const toast = useToast();
  const handleRegister = (_) => {
    setLoading(true);
    dispatch(
      register({
        username,
        email,
        password,
      })
    ).then(() => {
      toast.show({
        render: () => {
          return (
            <Box bg="success.500" px="2" py="1" rounded="sm" mb={5}>
              Berhasil Mendaftar
            </Box>
          );
        },
      });
    })       
    .catch((error) => {
      setLoading(false);
      // alert(error);
      alert('username atau email sudah ada!!!');
    });
  };

  return (
    <Center w="100%" height={"full"} bg={"secondary.800"}>
      <Box safeArea p="2" w="90%" py="8">
        <Image source={logo} w={90} h={90} rounded={"full"} />

        <Heading
          size="lg"
          color="white"
          _dark={{
            color: "warmGray.50",
          }}
          fontWeight="semibold"
        >
          Selamat Datang di SIGOOGARUT
        </Heading>
        <Heading
          mt="1"
          color="white"
          _dark={{
            color: "warmGray.200",
          }}
          fontWeight="medium"
          size="xs"
        >
          Daftar sekarang juga!
        </Heading>
        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label _text={{ color: "white" }}>
              Email
            </FormControl.Label>
            <Input
              bg={"white"}
              type="email"
              value={email}
              onChangeText={(e) => setEmail(e)}
              placeholder="Masukan Email Disini"
            />
          </FormControl>
          <FormControl>
            <FormControl.Label _text={{ color: "white" }}>
              Username
            </FormControl.Label>
            <Input
              bg={"white"}
              value={username}
              onChangeText={(e) => setUsername(e)}
              placeholder="Masukan Username Disini"
            />
          </FormControl>
          <FormControl>
            <FormControl.Label color={"white"} _text={{ color: "white" }}>
              Password
            </FormControl.Label>
            <Input
              bg={"white"}
              value={password}
              onChangeText={(e) => setPassword(e)}
              type="password"
              placeholder="Masukan Password disini"
            />
          </FormControl>
          <Button
            mt="2"
            colorScheme="secondary"
            isLoading={isLoading}
            onPress={handleRegister}
          >
            Daftar
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="white"
              _dark={{
                color: "warmGray.200",
              }}
            >
              Sudah Punya Akun ?{" "}
            </Text>
            <Link
              _text={{
                color: "white",
                fontWeight: "medium",
                fontSize: "sm",
              }}
              onPress={() => navigation.navigate("Login")}
            >
              Login
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default Register;
