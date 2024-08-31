import { AspectRatio, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import { formatDistanceToNow } from 'date-fns';

// get logged in username function
const useMiscFunctions = () => {

    const cloudName = process.env.REACT_APP_CLOUDINARY_NAME || 'your cloudinary name';
    const uploadPreset = process.env.REACT_APP_CLOUDINARY_PRESET || 'your cloudinary preset';
    const api_key = process.env.REACT_APP_CLOUDINARY_API || 'your cloudinary api';

    // handle logout
    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("access_token");
        navigate('/login');

    };

    // handle youtube embed vidoes
    const LazyLoadYoutubeEmbed = ({ youtubeLink }: { youtubeLink: string }) => {

        const roundframe = {
            borderRadius: "15px",
            overflow: "hidden",
        };

        const getYouTubeId = (urlOrId: string) => {
            const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
            const match = urlOrId.match(regExp);
            return (match && match[7].length === 11) ? match[7] : urlOrId;
        }

        const youtubeID = getYouTubeId(youtubeLink);

        return (
            <Box mt={1} style={roundframe}>

                <AspectRatio ratio={16 / 9}>

                    <LiteYouTubeEmbed

                        id={`${youtubeID}`}
                        title={`Youtube VideoID: ${youtubeID}`} />
                </AspectRatio>

            </Box>
        );
    };

    // format date post was created
    const formatTimeAgo = (date: string) => {
        const timeAgo = formatDistanceToNow(new Date(date), { addSuffix: true });

        // Replace long text with shortened versions
        return timeAgo
            .replace('about ', '')
            .replace('less than a minute', '1min.')
            .replace('less than', '<')
            .replace('minute', 'min.')
            .replace('minutes', 'min.')
            .replace('hour', 'hr.')
            .replace('hours', 'hr.')
            .replace('day', 'd.')
            .replace('days', 'd.')
            .replace('week', 'wk.')
            .replace('weeks', 'wk.')
            .replace('month', 'mo.')
            .replace('months', 'mo.')
            .replace('year', 'yr.')
            .replace('years', 'yr.')
            .replace('s', '')
            ;

    };

    const dummyLaptimes = [
        {
            title: "Fast Lap at Brands Hatch",
            car: "Audi R8 LMS",
            track: "Brands Hatch",
            time: "1:32.5",
            simracing: false,
            platform: "PC",
            youtube_link: "https://www.youtube.com/watch?v=1234567890",
            comment: "This was a great session!",
            user_id: 1,
            id: 1,
            by: "johndoe",
            date_created: "2022-01-01"
        },
        {
            title: "Sim Racing at Spa-Francorchamps",
            car: "Ferrari 488 GT3",
            track: "Spa-Francorchamps",
            time: "2:01.2",
            simracing: true,
            platform: "PS4",
            youtube_link: "https://www.youtube.com/watch?v=0987654321",
            comment: "I need to work on my braking points!",
            user_id: 1,
            id: 2,
            by: "johndoe",
            date_created: "2022-01-02"
        },
        {
            title: "Rainy Day at Nürburgring",
            car: "Porsche 911 GT3 R",
            track: "Nürburgring",
            time: "8:15.8",
            simracing: false,
            platform: "PC",
            youtube_link: "https://www.youtube.com/watch?v=abcdefghij",
            comment: "The conditions were terrible, but it was still a fun session!",
            user_id: 1,
            id: 3,
            by: "johndoe",
            date_created: "2022-01-03"
        }
    ];


    return { cloudName, uploadPreset, api_key, handleLogout, LazyLoadYoutubeEmbed, dummyLaptimes, formatTimeAgo }


};

export default useMiscFunctions;