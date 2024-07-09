import * as React from "react";
import { NavbarLoggedIn } from "../Navbar/Navbar";
// import Footer from "../Footer/Footer";
// import CarouselCard from "../CarouselCard/CarouselCard";
import { HomePost } from "../Post/Post";
import Slider from "react-slick";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';

import API from "../../hooks/API";
import { LoadingSpinner } from "../Loading/LoadingSpinner";
import { useLaptimes } from "../../hooks/useLaptimes";

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

export const Home = () => {
    const [slider, setSlider] = React.useState<Slider | null>(null)
    const [username, setUsername] = React.useState("");
    const [loading, setLoading] = React.useState(true);


    const navigate = useNavigate();
    const toast = useToast();

    const { laptime } = useLaptimes();
    //console.log(laptime)
    // useEffect to make sure user is in session, else /login
    React.useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const response = await API.getIdentity();
                setUsername(response.name);
                setLoading(false);

            } catch (error) {
                toast({
                    title: "Login required",
                    description: "Please log in to view this page.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
                navigate("/login");
                setLoading(false);
            }
        };
        checkLoggedIn()
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    };

    return (
        <>
            {/* CSS files for react-slick 
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
            */}

            <NavbarLoggedIn username={username} />
            {/* carousel card...
            <Slider {...settings} ref={(slider) => setSlider(slider)}>
                {laptime &&
                    laptime.map((laptime, index) => (
                        <CarouselCard key={index} laptime={laptime} username={{ username: laptime.by }} />
                    ))}
            </Slider>

            <Text textAlign="center" fontSize='xs' color="grey" mb={1}>
                Swipe right or left to change
            </Text>
            */}
            <HomePost laptimes={laptime} />

        </>
    )
};