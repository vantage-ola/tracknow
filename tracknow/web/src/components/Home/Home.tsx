import { NavbarLoggedIn } from "../Navbar/Navbar";
import { HomePost } from "../Post/Post";

import { useLaptimes } from "../../hooks/useLaptimes";
import { useUsers } from "../../hooks/useUsers";
import { LoadingSpinner } from "../Loading/LoadingSpinner";


export const Home = () => {

    const { laptime, fetchMoreData, hasMore, laptime_loading } = useLaptimes();
    const { username, profilePic, loading, } = useUsers();


    return (
        <>


            <NavbarLoggedIn name={username} pp={profilePic} />
            {loading && laptime_loading ? (
                <LoadingSpinner />
            ) : (
                <HomePost laptimes={laptime} fetchMoreData={fetchMoreData} hasMore={hasMore} />
            )}


        </>
    )
};