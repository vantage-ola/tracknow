import * as React from "react";
import { NavbarLoggedIn } from "../Navbar/Navbar";
import { HomePost } from "../Post/Post";

import { useLaptimes } from "../../hooks/useLaptimes";
import { useUsers } from "../../hooks/useUsers";



export const Home = () => {

    const { laptime, fetchMoreData, hasMore } = useLaptimes();
    const { username, profilePic } = useUsers();


    return (
        <>


            <NavbarLoggedIn name={username} pp={profilePic} />
            <HomePost laptimes={laptime} fetchMoreData={fetchMoreData} hasMore={hasMore} />


        </>
    )
};