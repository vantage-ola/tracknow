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


    const teamColors: { [key: string]: string } = {
        'Mercedes': '#00D2BE',
        'Red Bull': '#0600EF',
        'Ferrari': '#DC0000',
        'Aston Martin': '#006F62',
        'Alpine F1 Team': '#0090FF',
        'Williams': '#005AFF',
        'RB F1 Team': '#2c18c5',
        'Haas F1 Team': '#FFFFFF',
        'McLaren': '#FF8700',
        'Sauber': '#00e00b'
    };

    return { fetchDriverStandings, fetchTeamStandings, teamColors }

};

export default useMotorsportData;