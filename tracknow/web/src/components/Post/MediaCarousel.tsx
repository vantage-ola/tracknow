import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import * as React from "react";
import miscFunctions from "../../misc/miscFunctions";
import { Box, Button, Text } from "@chakra-ui/react";
import { LoadingSpinner } from "../Loading/LoadingSpinner";

type MediaItem = {
  type: "youtube" | "image";
  content: string;
};

type MediaCarouselProps = {
  youtubeLink?: string;
  image?: string;
};

const MediaCarousel: React.FC<MediaCarouselProps> = ({
  youtubeLink,
  image,
}) => {
  const { LazyLoadYoutubeEmbed } = miscFunctions();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  const mediaItems: MediaItem[] = React.useMemo(() => {
    return [
      youtubeLink && { type: "youtube", content: youtubeLink },
      image && { type: "image", content: image },
    ].filter((item): item is MediaItem => Boolean(item));
  }, [youtubeLink, image]);

  const nextSlide = () => {
    if (mediaItems.length > 0) {
      setLoading(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaItems.length);
    }
  };

  const prevSlide = () => {
    if (mediaItems.length > 0) {
      setLoading(true);
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + mediaItems.length) % mediaItems.length,
      );
    }
  };

  const handleLoad = () => {
    setLoading(false);
  };

  React.useEffect(() => {
    if (mediaItems.length > 0 && mediaItems[currentIndex]?.type === "youtube") {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, mediaItems]);

  if (mediaItems.length === 0) {
    return <Text fontSize={"xs"} color={"GrayText"}></Text>;
  }

  const currentItem = mediaItems[currentIndex];

  if (!currentItem) {
    return <Text>Error: Unable to display media item.</Text>;
  }

  return (
    <Box position="relative" maxWidth="100%" height="auto" overflow="hidden">
      {loading && (
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex="1"
        >
          <LoadingSpinner />
        </Box>
      )}
      {currentItem.type === "youtube" ? (
        <LazyLoadYoutubeEmbed youtubeLink={currentItem.content} />
      ) : (
        <Box
          as="img"
          src={currentItem.content}
          alt="User uploaded image"
          width="100%"
          height="auto"
          objectFit="cover"
          opacity={loading ? 0 : 1}
          transition="opacity 0.5s ease-in-out"
          onLoad={handleLoad}
        />
      )}
      {mediaItems.length > 1 && (
        <>
          <Button
            borderRadius="50%"
            position="absolute"
            left="5"
            top="50%"
            transform="translateY(-50%)"
            onClick={prevSlide}
            variant="postButton"
            height={10}
            width={10}
            zIndex="2"
          >
            <ChevronLeftIcon />
          </Button>
          <Button
            borderRadius="50%"
            position="absolute"
            right="5"
            top="50%"
            transform="translateY(-50%)"
            onClick={nextSlide}
            variant="postButton"
            height={10}
            width={10}
            zIndex="2"
          >
            <ChevronRightIcon />
          </Button>
        </>
      )}
    </Box>
  );
};

export default MediaCarousel;
