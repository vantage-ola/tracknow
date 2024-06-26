import * as React from "react";
import { NavbarWelcome } from "../Navbar/Navbar";
import { Hero } from "./Hero";
import Footer from "../Footer/Footer";

export const Welcome = () => {

    return (
        <>
            <NavbarWelcome />
            <Hero />
            <Footer />
        </>

    )
};