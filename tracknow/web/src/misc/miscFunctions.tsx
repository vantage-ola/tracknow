import { AspectRatio, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

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

    const LazyLoadYoutubeEmbed = ({ youtubeLink }: { youtubeLink: string }) => {

        const roundframe = {
            borderRadius: "15px",
            overflow: "hidden",
        };
        const youtubeID = youtubeLink.split("v=")[1]
        return (
            <Box mt={1}  >

                <AspectRatio ratio={16 / 9}>
                    <iframe
                        title={`Youtube VideoID: ${youtubeID}`}
                        style={roundframe}
                        src={`https://www.youtube.com/embed/${youtubeID}`
                        }
                        srcDoc={`<style>
                            *{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,
                            span{position:absolute;width:100%;top:0;bottom:0;margin:auto}
                            span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}
                            </style>
                            <a href=https://www.youtube.com/embed/${youtubeID}?autoplay=1>
                            <img src=https://img.youtube.com/vi/${youtubeID}/hqdefault.jpg><span>▶</span></a>"`}
                        allowFullScreen
                    />
                </AspectRatio>

            </Box>
        );
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


    return { cloudName, uploadPreset, api_key, handleLogout, LazyLoadYoutubeEmbed, dummyLaptimes }


};

export default useMiscFunctions;