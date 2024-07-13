import { AspectRatio, Box } from "@chakra-ui/react";
import * as React from "react";
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
        //navigate('/login')
        //window.location.href = '/login';
        //window.location.reload()
        navigate('/home');

    };
    // react memo, only reloads the youtube if the props change  React.memo(), didnt work lol
    // some bugs with post read more, it reloads the yt clip, dont know why
    const LazyLoadYoutubeEmbed = ({ youtubeLink }: { youtubeLink: string }) => {
        const [isVisible, setIsVisible] = React.useState(false);
        const ref = React.useRef<HTMLDivElement>(null);

        React.useEffect(() => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.unobserve(entry.target);
                    }
                },
                {
                    rootMargin: "0px",
                    threshold: 0.1,
                }
            );

            if (ref.current) {
                observer.observe(ref.current);
            }

            return () => {
                if (ref.current) {
                    observer.unobserve(ref.current);
                }
            };
        }, []);

        const roundframe = {
            borderRadius: "15px",
            overflow: "hidden",
        };

        return (
            <Box mt={1} ref={ref} >
                {isVisible && (
                    <AspectRatio ratio={16 / 9}>
                        <iframe
                            style={roundframe}
                            src={`https://www.youtube.com/embed/${youtubeLink.split("v=")[1]}`
                            }
                            title="YouTube video player"
                            allowFullScreen
                        />
                    </AspectRatio>
                )}
            </Box>
        );
    };


    return { cloudName, uploadPreset, api_key, handleLogout, LazyLoadYoutubeEmbed }


};

export default useMiscFunctions;