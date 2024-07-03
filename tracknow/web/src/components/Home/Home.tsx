import * as React from "react";
import { NavbarLoggedIn } from "../Navbar/Navbar";
// import Footer from "../Footer/Footer";
import CarouselCard from "./CarouselCard";
import Slider from "react-slick";
import { Text, useToast } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';

import API from "../../hooks/API";
import { LoadingSpinner } from "../Loading/LoadingSpinner";

// setting for slide carousel
const settings = {
    dots: true,
    arrows: false,
    fade: true,
    infinite: true,
    autoplay: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
}
const sampleLaptimes = {
    laptimes: [
        {
            car: "Porshe 911 GT3 2019",
            track: "Silverstone Circuit",
            time: "1:55.8",
            simracing: true,
            platform: "Assetto Corsa Competizione",
            youtube_link: "https://www.youtube.com/watch?v=XwzAy6oi1XE",
            comment: "Fast af boiiiiii, check link for setup links",
            by: {

                username: "Tortellinii"

            }
        },
        {
            car: "Audi R8 GT3 2019",
            track: "Catalunya(No chicane)",
            time: "1:51.7",
            simracing: true,
            platform: "Gran Turismo 7",
            youtube_link: "https://www.youtube.com/watch?v=2nACQFO77IE",
            comment: "This was my 1st GR.3 attempt on my DD PRO. Some Mistakes were made, enoy",
            by: {

                username: "simracer_deano"

            }
        }, {
            car: "Ferrari 488 GT3 Evo 2020",
            track: "Monza",
            time: "1:35.2",
            simracing: true,
            platform: "Assetto Corsa Competizione",
            youtube_link: "https://www.youtube.com/watch?v=1234567890",
            comment: "My first lap on Monza in the Ferrari 488 GT3 Evo. It was a lot of fun!",
            by: {
                username: "ferrarifan123",
            },
        },
        {
            car: "McLaren 720S GT3 2019",
            track: "Spa-Francorchamps",
            time: "2:01.7",
            simracing: true,
            platform: "iRacing",
            youtube_link: "https://www.youtube.com/watch?v=0987654321",
            comment: "My first time racing at Spa-Francorchamps. The McLaren 720S GT3 was a beast!",
            by: {
                username: "mclarenlover99",
            },
        },
        {
            car: "Lamborghini Huracán GT3 Evo 2020",
            track: "Nürburgring",
            time: "7:23.1",
            simracing: true,
            platform: "Assetto Corsa Competizione",
            youtube_link: "https://www.youtube.com/watch?v=abcdefghij",
            comment: "The Lamborghini Huracán GT3 Evo is a monster on the Nürburgring. Check out my setup!",
            by: {
                username: "lamborghini_racer",
            },
        },
        {
            car: "Aston Martin Vantage GT3 2019",
            track: "Brands Hatch",
            time: "1:15.9",
            simracing: true,
            platform: "iRacing",
            youtube_link: "https://www.youtube.com/watch?v=jklmnopqrs",
            comment: "The Aston Martin Vantage GT3 is a great car for Brands Hatch. Here's my setup and strategy!",
            by: {
                username: "aston_martin_fanatic",
            },
        },
        {
            car: "Bentley Continental GT3 2018",
            track: "Laguna Seca",
            time: "1:38.7",
            simracing: true,
            platform: "Assetto Corsa Competizione",
            youtube_link: "https://www.youtube.com/watch?v=tuvwxyzabc",
            comment: "The Bentley Continental GT3 is a beautiful car to drive at Laguna Seca. Check out my setup!",
            by: {
                username: "bentley_enthusiast",
            },
        },
        {
            car: "Mercedes-AMG GT3 2019",
            track: "Suzuka Circuit",
            time: "1:49.2",
            simracing: true,
            platform: "iRacing",
            youtube_link: "https://www.youtube.com/watch?v=defghijklm",
            comment: "The Mercedes-AMG GT3 is a great car for Suzuka Circuit. Here's my setup and strategy!",
            by: {
                username: "mercedes_racer",
            },
        },
        {
            car: "Audi R8 LMS GT3 2015",
            track: "Circuit de Spa-Francorchamps",
            time: "2:02.5",
            simracing: true,
            platform: "Assetto Corsa Competizione",
            youtube_link: "https://www.youtube.com/watch?v=nopqrstuvw",
            comment: "The Audi R8 LMS GT3 is a great car for Spa-Francorchamps. Check out my setup!",
            by: {
                username: "audi_fanatic",
            },
        },
        {
            car: "BMW M6 GT3 2019",
            track: "Hockenheimring",
            time: "1:53.9",
            simracing: true,
            platform: "iRacing",
            youtube_link: "https://www.youtube.com/watch?v=xyzabcdefg",
            comment: "The BMW M6 GT3 is a great car for Hockenheimring. Here's my setup and strategy!",
            by: {
                username: "bmw_racer",
            },
        },
        {
            car: "Nissan GT-R GT3 2017",
            track: "Sepang International Circuit",
            time: "2:08.1",
            simracing: true,
            platform: "Assetto Corsa Competizione",
            youtube_link: "https://www.youtube.com/watch?v=hijklmnopq",
            comment: "The Nissan GT-R GT3 is a great car for Sepang International Circuit. Check out my setup!",
            by: {
                username: "nissan_enthusiast",
            },
        },
        {
            car: "Lexus RC F GT3 2018",
            track: "Bathurst Mountain",
            time: "2:04.3",
            simracing: true,
            platform: "iRacing",
            youtube_link: "https://www.youtube.com/watch?v=rstuvwxyz",
            comment: "The Lexus RC F GT3 is a great car for Bathurst Mountain. Here's my setup and strategy!",
            by: {
                username: "lexus_racer",
            },
        },

        // Add more laptimes as needed
    ],
};


export const Home = () => {
    const [slider, setSlider] = React.useState<Slider | null>(null)
    const [username, setUsername] = React.useState("");
    const [loading, setLoading] = React.useState(true);

    const navigate = useNavigate();
    const toast = useToast();

    React.useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const response = await API.getIdentity();
                setUsername(response.name);
                setLoading(false)

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
    }

    return (
        <>
            {/* CSS files for react-slick */}
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />


            <NavbarLoggedIn username={username} />
            <Slider {...settings} ref={(slider) => setSlider(slider)}>
                {sampleLaptimes.laptimes.map((laptime, index) => (
                    <CarouselCard key={index} laptime={laptime} username={{ username: laptime.by.username }} />
                ))}
            </Slider>
            <Text textAlign="center" fontSize='xs' color="grey" mb={1}>
                Swipe right or left to change
            </Text>
        </>
    )
};