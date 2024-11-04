import * as React from "react";
import {
  Box,
  Heading,
  Text,
  Flex,
  Center,
  useColorModeValue,
  HStack,
  AspectRatio,
  Icon,
} from "@chakra-ui/react";
import { BsArrowUpRight, BsHeartFill, BsHeart } from "react-icons/bs";
import { FaClock, FaLaptop, FaMapMarkedAlt } from "react-icons/fa";
import { Laptime, SignUpResponse } from "../../Types";
import Marquee from "../Marquee/Marquee";

// setting for slide carousel
/*const settings = {
    dots: true,
    arrows: false,
    fade: true,
    infinite: true,
    autoplay: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
}
*/

/* CSS files for react-slick 
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
*/

//const [slider, setSlider] = React.useState<Slider | null>(null)

/* carousel card...
            <Slider {...settings} ref={(slider) => setSlider(slider)}>
                {laptime &&
                    laptime.map((laptime, index) => (
                        <CarouselCard key={index} laptime={laptime} username={{ username: laptime.by }} />
                    ))}
            </Slider>

            <Text textAlign="center" fontSize='xs' color="grey" mb={1}>
                Swipe right or left to change
            </Text>
*/

const CarouselCard: React.FC<{
  laptime: Laptime;
  username: SignUpResponse;
}> = ({ laptime, username }) => {
  const [liked, setLiked] = React.useState(false);
  const { car, track, time, platform, comment, youtube_link } = laptime;
  const videoId = youtube_link?.split("v=")[1];

  return (
    <Center py={3} mt={{ base: 90, md: 0 }}>
      <Box
        w="xs"
        rounded={"sm"}
        my={5}
        mx="auto"
        overflow={"hidden"}
        bg="white"
        border={"1px"}
        borderColor="black"
        boxShadow={useColorModeValue("6px 6px 0 red", "6px 6px 0 cyan")}
      >
        {youtube_link && (
          <AspectRatio ratio={16 / 9}>
            <iframe
              title="YouTube video player"
              src={`https://www.youtube.com/embed/${videoId}`}
              allowFullScreen
            />
          </AspectRatio>
        )}
        <Box p={4}>
          <Box
            bg="black"
            display={"inline-block"}
            px={2}
            py={1}
            color="white"
            mb={2}
          >
            <Text fontSize={"xs"} fontWeight="medium">
              {car}
            </Text>
          </Box>
          <Heading color={"black"} fontSize={"2xl"} whiteSpace="nowrap">
            <Marquee text={comment} />
          </Heading>

          <Flex align="center">
            <Icon color={"black"} as={FaMapMarkedAlt} mr={2} />
            <Text color={"black"}>{track}</Text>
          </Flex>

          <Flex align="center">
            <Icon color={"black"} as={FaClock} mr={2} />
            <Text color="black">{time}</Text>
          </Flex>

          {platform && (
            <Flex align="center">
              <Icon color="black" as={FaLaptop} mr={2} />
              <Text color="black">{platform}</Text>
            </Flex>
          )}
        </Box>
        <HStack borderTop={"1px"} color="black">
          <Flex
            p={4}
            alignItems="center"
            justifyContent={"space-between"}
            roundedBottom={"sm"}
            cursor={"pointer"}
            w="full"
          >
            <Text fontSize={"md"} fontWeight={"semibold"}>
              @{username.username}
            </Text>
            <BsArrowUpRight />
          </Flex>
          <Flex
            p={4}
            alignItems="center"
            justifyContent={"space-between"}
            roundedBottom={"sm"}
            borderLeft={"1px"}
            cursor="pointer"
            onClick={() => setLiked(!liked)}
          >
            {liked ? (
              <BsHeartFill fill="red" fontSize={"24px"} />
            ) : (
              <BsHeart fontSize={"24px"} />
            )}
          </Flex>
        </HStack>
      </Box>
    </Center>
  );
};

export default CarouselCard;
