// Configuration for backend server
import {BACKEND_SERVER} from '@env'

const DEVELOPMENT_SERVER = 'http://127.0.0.1:5000/api/'; // development server
const PRODUCTION_SERVER = `${BACKEND_SERVER}`;

// routes
const CARS_URL = `${DEVELOPMENT_SERVER}cars`;
const TRACKS_URL = `${DEVELOPMENT_SERVER}tracks`;
const LAPTIMES_URL = `${DEVELOPMENT_SERVER}laptimes`;
const DRIVERS_URL = `${DEVELOPMENT_SERVER}drivers`;

export {
    CARS_URL,
    TRACKS_URL,
    LAPTIMES_URL,
    DRIVERS_URL
}

