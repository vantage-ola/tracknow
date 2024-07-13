import * as React from "react";

import API from "./API";
import { GetUserLaptimesResponse, Laptime } from "../Types";

export const useLaptimes = () => {

    const [page, setPage] = React.useState(1);
    const [mypage, mySetPage] = React.useState(1); // for user created laptimes

    const [laptime, setLaptime] = React.useState<GetUserLaptimesResponse[]>([]);
    const [mylaptime, setmylaptimes] = React.useState<GetUserLaptimesResponse[]>([]);

    const [hasMore, setHasMore] = React.useState(true);
    const [hasMore2, setHasMore2] = React.useState(true);


    // fetch all laptimes from the server
    const fetchLaptime = async () => {
        try {
            const response: GetUserLaptimesResponse[] = await API.fetchEveryoneLaptime(page);
            setLaptime((prevLaptimes) => [...prevLaptimes, ...response]);
            if (response.length === 0) {
                setHasMore(false);
            }
        } catch (error) {
            throw new Error("Laptimes not loaded!");
        }

    };

    // fetch connected user personal uploaded laptimes/moments
    const fetchMyLaptimes = async () => {
        try {
            const response = await API.handleLaptimes(mypage);

            if (Array.isArray(response)) {
                setmylaptimes((prevLaptimes) => [...prevLaptimes, ...response]);
                if (response.length === 0) {
                    setHasMore2(false);
                }
            } else {
                // Handle the case where response is not an array
            }
        } catch (error) {
            throw new Error("My Laptimes not loaded");
        }
    };


    React.useEffect(() => {
        fetchLaptime();
        //console.log(page)
        //console.log(hasMore)
    }, [page]);

    const fetchMoreData = () => {
        if (hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    // my laptimes
    React.useEffect(() => {
        //console.log("useEffect called");
        fetchMyLaptimes();

    }, [mypage])

    const fetchMoreData2 = () => {  // fetch more user created laptimes
        if (hasMore2) {
            mySetPage((prevPage) => prevPage + 1);
        }
    };
    // add laptimes
    const addLaptime = async (newLaptime: Laptime,) => {

        try {

            const response = await API.handleLaptimes(page, newLaptime);
            return response;

        } catch (error) {

            throw new Error("Laptime cannot be added");
        }
    };

    return { laptime, addLaptime, mylaptime, fetchMoreData, hasMore, fetchMoreData2, hasMore2 };

}