import {
  Box,
  Center,
  HStack,
  Icon,
  IconButton,
  Stagger,
  useDisclose,
} from "native-base";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";

const StaggerOpt = ({ setShowKomen, isFavorit }) => {
  const { isOpen, onToggle } = useDisclose();
  return (
    <Box position={"absolute"} right={5} bottom={5}>
      <Center>
        <Box alignItems="center">
          <Stagger
            visible={isOpen}
            initial={{
              opacity: 0,
              scale: 0,
              translateY: 34,
            }}
            animate={{
              translateY: 0,
              scale: 1,
              opacity: 1,
              transition: {
                type: "spring",
                mass: 0.8,
                stagger: {
                  offset: 30,
                  reverse: true,
                },
              },
            }}
            exit={{
              translateY: 34,
              scale: 0.5,
              opacity: 0,
              transition: {
                duration: 100,
                stagger: {
                  offset: 30,
                  reverse: true,
                },
              },
            }}
          >
            <IconButton
              onPress={() => setShowKomen(true)}
              mb="4"
              variant="solid"
              bg="success.500"
              colorScheme="red"
              borderRadius="full"
              icon={
                <Icon
                  as={MaterialIcons}
                  size="6"
                  name="add-comment"
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="warmGray.50"
                />
              }
            />
          </Stagger>
        </Box>
        <HStack alignItems="center">
          <IconButton
            variant="solid"
            shadow={3}
            borderRadius="full"
            size="lg"
            onPress={onToggle}
            bg="cyan.400"
            icon={
              <Icon
                as={MaterialCommunityIcons}
                size="6"
                name="dots-horizontal"
                color="warmGray.50"
                _dark={{
                  color: "warmGray.50",
                }}
              />
            }
          />
        </HStack>
      </Center>
    </Box>
  );
};

export default StaggerOpt;
