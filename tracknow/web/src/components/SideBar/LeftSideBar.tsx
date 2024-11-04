import {
  Box,
  Center,
  Flex,
  FlexProps,
  Icon,
  Link,
  Stack,
} from "@chakra-ui/react";
import {
  FiHome,
  FiAward,
  FiGlobe,
  FiInfo,
  FiSettings,
  FiDollarSign,
  FiCalendar,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { Link as ReactRouterLink } from "react-router-dom";
import { BiGhost } from "react-icons/bi";
import { FaGithub } from "react-icons/fa";

interface LinkItemProps {
  name: string;
  icon: IconType;
  disabled?: boolean;
}
interface SideItemProps extends FlexProps {
  icon: IconType;
  children: string | number;
  disabled?: boolean;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, disabled: false },
  { name: "Discover", icon: FiGlobe, disabled: false },
  { name: "Events", icon: FiCalendar, disabled: true },
  { name: "Leaderboard", icon: FiAward, disabled: true },
  { name: "Setups", icon: FiSettings, disabled: true },
  { name: "Ghosts", icon: BiGhost, disabled: true },
  { name: "Contribute", icon: FaGithub, disabled: false },
  { name: "Donate", icon: FiDollarSign, disabled: false },
];

const linkMap: { [key: string]: string } = {
  Home: "/home",
  Discover: "/discover",

  Donate: "https://www.buymeacoffee.com/vantageola",
  Contribute: "https://github.com/vantage-ola",

  // Add more links here
};

const SideBarItem = ({ icon, children, disabled, ...rest }: SideItemProps) => {
  const link = linkMap[String(children)] || "/";

  return disabled ? (
    <div>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="not-allowed"
        opacity={0.5}
        _hover={{
          bg: "lightdark",
          color: "white",
        }}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </div>
  ) : (
    <Link
      as={ReactRouterLink}
      to={link}
      style={{ textDecoration: "none" }}
      target={link.startsWith("http") ? "_blank" : undefined} // open in a new tab if  item url starts wiht http.
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "lightdark",
          color: "white",
        }}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const LeftSideBar = () => {
  return (
    <>
      <Box mt={2}>
        <Stack>
          {LinkItems.map((link) => (
            <SideBarItem
              key={link.name}
              icon={link.icon}
              disabled={link.disabled}
            >
              {link.name}
            </SideBarItem>
          ))}
        </Stack>
        <Center>
          <Box mt={2} fontSize="10px" color="GrayText">
            tracknow, © 2024, All rights reserved
          </Box>
        </Center>
      </Box>
    </>
  );
};
export default LeftSideBar;
