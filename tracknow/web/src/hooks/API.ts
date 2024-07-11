import { User, Login, LoginResponse, SignUpResponse, Laptime, CreateLaptimeResponse, GetUserLaptimesResponse, identity } from '../Types';

// backend api routes.

const API_PREFIX_URL = process.env.REACT_APP_PREFIX_URL || '';
const API_KEY = process.env.REACT_APP_API_KEY || 'wont work lol';

const endpoints = {
    GET_USERS: `${API_PREFIX_URL}/users`, // get all users
    GET_USER: (id: Number) => `${API_PREFIX_URL}/users/${id}`, // get user by ID. jwt *
    LOGIN_USER: `${API_PREFIX_URL}/login`, // login user
    POST_USER: `${API_PREFIX_URL}/users`, // create a user account
    PUT_USER: (user_id: Number) => `${API_PREFIX_URL}/users/${user_id}/update`, // edit user details(nationality)

    POST_GET_LAPTIME: `${API_PREFIX_URL}/user/laptimes`, // user posts a laptime or view all their laptimes jwt*
    GET_USER_LAPTIME: (id: Number) => `${API_PREFIX_URL}/user/laptimes/${id}`, // get an exact laptime of a user jwt*

    GET_LAPTIMES: `${API_PREFIX_URL}/laptimes`, // see everyone's laptime on tracknow
    GET_ONE_LAPTIME: (user_id: Number, id: Number) => `${API_PREFIX_URL}/users/${user_id}/laptimes/${id}`, // see a specific laptime of someone

    GET_IDENTITY: `${API_PREFIX_URL}/protected` // make sure user is logged in and in session.
};


// function to fetch users. ideally for search
async function fetchUsers(): Promise<User[]> {
    const response = await fetch(endpoints.GET_USERS, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch users!');
    }
    const data: User[] = await response.json();
    return data;
};

// function to fetch one user with id. bearer token required
async function fetchUser(id: Number): Promise<User> {
    const token = localStorage.getItem('access_token');
    if (!token) {
        throw new Error('Login')
    }
    const response = await fetch(endpoints.GET_USER(id), {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`, // after logging in, you get token.
            'x-api-key': API_KEY
        }
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch user`);
    }
    const data: User = await response.json();
    return data;

};

// function to login a user.
async function loginUser(details: Login): Promise<LoginResponse> {
    const response = await fetch(endpoints.LOGIN_USER, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY
        },
        body: JSON.stringify(details)
    });

    if (!response.ok) {
        throw new Error('Login Failed');
    };

    const data: LoginResponse = await response.json()
    return data;
};

// function to get user identity after logging in.
async function getIdentity(): Promise<identity> {
    const token = localStorage.getItem('access_token') // after logging in, we retrieve the token to get access to some of the functions

    const response = await fetch(endpoints.GET_IDENTITY, {
        'method': 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'x-api-key': API_KEY
        },
    });
    if (!response.ok) {
        throw new Error('User not Logged in');
    };

    const data: identity = await response.json();
    return data;
};
// function to create a new user account.
async function CreateUser(newUser: Login): Promise<SignUpResponse> {
    const response = await fetch(endpoints.POST_USER, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY
        },
        body: JSON.stringify(newUser)
    });

    if (!response.ok) {
        throw new Error('Failed to create user');
    };

    const data: SignUpResponse = await response.json();
    return data;
};

// function to create a user's personal laptime and get personal laptimes
async function handleLaptimes(newLaptime?: Laptime): Promise<CreateLaptimeResponse | GetUserLaptimesResponse[]> {

    const token = localStorage.getItem('access_token') // after logging in, we retrieve the token to get access to some of the functions

    if (newLaptime) {
        const response = await fetch(endpoints.POST_GET_LAPTIME, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                'x-api-key': API_KEY
            },
            body: JSON.stringify(newLaptime)
        });
        if (!response.ok) {
            throw new Error('Failed to create laptime');
        }

        const data: CreateLaptimeResponse = await response.json();
        return data;
    } else {
        const response = await fetch(endpoints.POST_GET_LAPTIME, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                'x-api-key': API_KEY
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch Personal laptimes');
        }

        const data: GetUserLaptimesResponse[] = await response.json();
        return data;
    };
};

// function to fetch personal laptime(single by id).
async function fetchMyLaptime(id: Number): Promise<Laptime> {

    const token = localStorage.getItem('access_token') // after logging in, we retrieve the token to get access to some of the functions

    const response = await fetch(endpoints.GET_USER_LAPTIME(id), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'x-api-key': API_KEY
        }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch Personal Laptime. Does not exist.');
    }

    const data: Laptime = await response.json();
    return data;
};

// function to get everyone's laptime. not quite efficient way.
async function fetchEveryoneLaptime(): Promise<GetUserLaptimesResponse[]> {

    const response = await fetch(endpoints.GET_LAPTIMES, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch laptimes!');
    }
    const data: GetUserLaptimesResponse[] = await response.json();
    return data;
};

const API = {
    fetchUser,
    fetchUsers,
    fetchMyLaptime,
    fetchEveryoneLaptime,
    loginUser,
    CreateUser,
    handleLaptimes,
    getIdentity
};


export default API;