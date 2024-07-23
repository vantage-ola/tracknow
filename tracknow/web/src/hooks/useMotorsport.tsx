import * as React from "react";

import API from "./API";

const useMotorsportData = () => {

    const fetchTeamStandings = async () => {
        try {
            const response = await API.fetchF1Teams();
            return response;

        } catch (error) {
            throw new Error("Formula 1 Constructors standings not loaded!");
        }

    };

    const fetchDriverStandings = async () => {
        try {
            const response = await API.fetchF1Drivers();
            return response;

        } catch (error) {
            throw new Error("Formula 1 Driver standings not loaded!");
        }

    };

    return { fetchDriverStandings, fetchTeamStandings }

};

export default useMotorsportData;