import { HomePost } from "../Post/Post";
import { useLaptimes } from "../../hooks/useLaptimes";
import { useUsers } from "../../hooks/useUsers";
import { LoadingSpinner } from "../Loading/LoadingSpinner";



export const Home = () => {
    const { laptime, fetchMoreData, hasMore, laptime_loading } = useLaptimes();
    const { loading } = useUsers();

    return (
        <>
            {/* Middle section */}
            {loading && laptime_loading ? (
                <LoadingSpinner />
            ) : (
                <HomePost
                    laptimes={laptime}
                    fetchMoreData={fetchMoreData}
                    hasMore={hasMore}
                />
            )}

        </>
    );
};
