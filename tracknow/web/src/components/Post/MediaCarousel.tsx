import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { GetUserLaptimesResponse } from "../../Types";
import * as React from "react";
import miscFunctions from "../../misc/miscFunctions";
import { Box, Button } from "@chakra-ui/react";


type MediaItem = {
    type: 'youtube' | 'image';
    content: string;
};

type MediaCarouselProps = {
    youtubeLink?: string;
    image?: string;
};

const MediaCarousel: React.FC<MediaCarouselProps> = ({ youtubeLink, image }) => {

    const { LazyLoadYoutubeEmbed } = miscFunctions();
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const mediaItems: MediaItem[] = [
        youtubeLink && { type: 'youtube', content: youtubeLink },
        image && { type: 'image', content: image }
    ].filter((item): item is MediaItem => Boolean(item));

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaItems.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + mediaItems.length) % mediaItems.length);
    };

    if (mediaItems.length === 0) return null;

    return (
        <Box position="relative">
            {mediaItems[currentIndex].type === 'youtube' ? (
                <LazyLoadYoutubeEmbed youtubeLink={mediaItems[currentIndex].content} />
            ) : (
                <Box as="img" src={mediaItems[currentIndex].content} alt="User uploaded image" width="100%" height="auto" objectFit="cover" />
            )}
            {mediaItems.length > 1 && (
                <>
                    <Button position="absolute" left="0" top="50%" transform="translateY(-50%)" onClick={prevSlide}>
                        <ChevronLeftIcon />
                    </Button>
                    <Button position="absolute" right="0" top="50%" transform="translateY(-50%)" onClick={nextSlide}>
                        <ChevronRightIcon />
                    </Button>
                </>
            )}
        </Box>
    );
};

export default MediaCarousel;