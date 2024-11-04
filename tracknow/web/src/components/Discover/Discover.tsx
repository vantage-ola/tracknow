import React from "react";
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Icon,
  Center,
  Text,
  TabIndicator,
} from "@chakra-ui/react";
import Youtube from "./Youtube";
import { FaYoutube, FaTwitch, FaTwitter, FaRedditAlien } from "react-icons/fa";

const Discover: React.FC = () => {
  return (
    <Box p={3} width={{ base: "100vw", md: "auto" }}>
      {/* unstyled for desktop variant */}
      <Tabs
        isFitted
        variant={{ base: "line", md: "line" }}
        colorScheme="white"
        borderColor={"lightdark"}
      >
        <TabList
          mb="1em"
          position={{ base: "fixed", md: "sticky" }}
          top={{ base: 10, md: 0 }}
          left={{ base: 0 }}
          right={{ base: 0 }}
          zIndex={1}
          bg={"dark"}
        >
          <Tab>
            <Icon as={FaYoutube} color="red" boxSize={"24px"} />
          </Tab>
          <Tab isDisabled>
            <Icon as={FaTwitch} color="#8b44f7" boxSize={"24px"} />
          </Tab>
          <Tab isDisabled>
            <Icon as={FaTwitter} color="#1da1f2" boxSize={"24px"} />
          </Tab>
          <Tab isDisabled>
            <Icon as={FaRedditAlien} color="#ff4500" boxSize={"24px"} />
          </Tab>
        </TabList>
        {/*<TabIndicator mt='-1.5px' height='2px' bg='GrayText' borderRadius='1px' /> */}
        <TabPanels>
          <TabPanel>
            <Youtube />
          </TabPanel>
          <TabPanel>
            <Center>
              <Text color={"GrayText"}>Coming Soon 🔜</Text>
            </Center>
          </TabPanel>
          <TabPanel>
            <Center>
              <Text p={10} color={"GrayText"}>
                Coming Soon 🔜
              </Text>
            </Center>
          </TabPanel>
          <TabPanel>
            <Center>
              <Text color={"GrayText"}>Coming Soon 🔜</Text>
            </Center>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Discover;
