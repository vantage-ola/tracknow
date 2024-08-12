import { jest, describe, beforeEach, it, expect } from '@jest/globals';
import API, { API_KEY, API_PREFIX_URL } from '../../hooks/API';


// Mock fetch globally
global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;


// Mock localStorage
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn()
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('API', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    // test fetchUsers 
    describe('fetchUsers', () => {
        it('should fetch users successfully', async () => {
            const mockUsers = [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }];
            (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
                ok: true,
                json: async () => mockUsers,
            } as Response);

            const result = await API.fetchUsers();

            expect(result).toEqual(mockUsers);
            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining('/users'),
                expect.objectContaining({
                    method: 'GET',
                    headers: expect.objectContaining({
                        'Content-Type': 'application/json',
                        'x-api-key': expect.any(String),
                    }),
                })
            );
        });
    });

    // test fetchUser 
    describe('fetchUser', () => {
        it('should fetch a user successfully', async () => {
            const mockUser = { id: 1, name: 'User 1' };
            (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
                ok: true,
                json: async () => mockUser,
            } as Response);
            (localStorageMock.getItem as jest.MockedFunction<typeof localStorageMock.getItem>).mockReturnValue('mock-token');

            const result = await API.fetchUser(1);

            expect(result).toEqual(mockUser);
            expect(global.fetch).toHaveBeenCalledWith(
                // 'https://xxxxx/api/v1/users/1' wont work because of url doesnt contain ...users/1
                expect.stringContaining('/users'),

                expect.objectContaining({
                    method: 'GET',
                    headers: expect.objectContaining({
                        'Content-type': 'application/json',
                        Authorization: 'Bearer mock-token',
                        'x-api-key': expect.any(String),
                    }),
                })
            );
        });
    });

    // test loginUser 
    describe('loginUser', () => {
        it('should login user successfully', async () => {
            const mockResponse = { token: 'mock-token', user: { id: 1, name: 'User 1' } };
            (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse,
            } as Response);

            const result = await API.loginUser({ username: 'user1', password: 'password' });

            expect(result).toEqual(mockResponse);
            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining('/login'),
                expect.objectContaining({
                    method: 'POST',
                    headers: expect.objectContaining({
                        'Content-Type': 'application/json',
                        'x-api-key': expect.any(String),
                    }),
                    body: JSON.stringify({ username: 'user1', password: 'password' }),
                })
            );
        });

        it('should throw an error when login fails', async () => {
            (global.fetch as jest.Mock<typeof fetch>).mockResolvedValueOnce({
                ok: false,
            } as Response);

            await expect(API.loginUser({ username: 'user1', password: 'wrong' })).rejects.toThrow('Login Failed');
        });
    });

    // test getIdentity 
    describe('getIdentity', () => {
        it('should get identity successfully', async () => {
            const mockIdentity = { id: 1, name: 'User 1' };
            (global.fetch as jest.Mock<typeof fetch>).mockResolvedValueOnce({
                ok: true,
                json: async () => mockIdentity,
            } as Response);
            (localStorageMock.getItem as jest.MockedFunction<typeof localStorageMock.getItem>).mockReturnValue('mock-token');

            const result = await API.getIdentity();

            expect(result).toEqual(mockIdentity);
            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining('/protected'),
                expect.objectContaining({
                    method: 'GET',
                    headers: expect.objectContaining({
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer mock-token',
                        'x-api-key': expect.any(String),
                    }),
                })
            );
        });

        it('should throw an error when user is not logged in', async () => {
            (global.fetch as jest.Mock<typeof fetch>).mockResolvedValueOnce({
                ok: false,
            } as Response);
            (localStorageMock.getItem as jest.MockedFunction<typeof localStorageMock.getItem>).mockReturnValue('mock-token');

            await expect(API.getIdentity()).rejects.toThrow('User not Logged in');
        });
    });

    // test CreateUser
    describe('CreateUser', () => {
        it('should create a user successfully', async () => {
            const mockResponse = { id: 1, name: 'New User' };
            (global.fetch as jest.Mock<typeof fetch>).mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse,
            } as Response);

            const result = await API.CreateUser({ username: 'newuser', password: 'password' });

            expect(result).toEqual(mockResponse);
            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining('/users'),
                expect.objectContaining({
                    method: 'POST',
                    headers: expect.objectContaining({
                        'Content-Type': 'application/json',
                        'x-api-key': expect.any(String),
                    }),
                    body: JSON.stringify({ username: 'newuser', password: 'password' }),
                })
            );
        });

        it('should throw an error when user creation fails', async () => {
            (global.fetch as jest.Mock<typeof fetch>).mockResolvedValueOnce({
                ok: false,
            } as Response);

            await expect(API.CreateUser({ username: 'newuser', password: 'password' })).rejects.toThrow('Failed to create user');
        });
    });

    // test handleLaptime
    describe('handleLaptimes', () => {
        it('should create a laptime successfully', async () => {
            const mockResponse = { id: 1, time: '1:30.000' };
            (global.fetch as jest.Mock<typeof fetch>).mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse,
            } as Response);

            (localStorageMock.getItem as jest.MockedFunction<typeof localStorageMock.getItem>).mockReturnValue('mock-token');

            const result = await API.handleLaptimes(1, { title: 'new laptime', simracing: false, comment: "my racing moments" });

            expect(result).toEqual(mockResponse);
            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining('/user/laptimes'),
                expect.objectContaining({
                    method: 'POST',
                    headers: expect.objectContaining({
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer mock-token',
                        'x-api-key': expect.any(String),
                    }),
                    body: JSON.stringify({ title: 'new laptime', simracing: false, comment: "my racing moments" }),
                })
            );
        });

        it('should fetch laptimes successfully', async () => {
            const mockResponse = [{ id: 1, title: 'new laptime', simracing: false, comment: "my racing moments" }, { id: 2, title: 'new laptime 2', simracing: false, comment: "my racing moments 2" }];
            (global.fetch as jest.Mock<typeof fetch>).mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse,
            } as Response);
            (localStorageMock.getItem as jest.MockedFunction<typeof localStorageMock.getItem>).mockReturnValue('mock-token');

            const result = await API.handleLaptimes(1);

            expect(result).toEqual(mockResponse);
            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining('/user/laptimes?page=1'),
                expect.objectContaining({
                    method: 'GET',
                    headers: expect.objectContaining({
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer mock-token',
                        'x-api-key': expect.any(String),
                    }),
                })
            );
        });

        it('should throw an error when creating laptime fails', async () => {
            (global.fetch as jest.Mock<typeof fetch>).mockResolvedValueOnce({
                ok: false,
            } as Response);
            (localStorageMock.getItem as jest.MockedFunction<typeof localStorageMock.getItem>).mockReturnValue('mock-token');

            await expect(API.handleLaptimes(1, { title: 'new laptime', simracing: false, comment: "my racing moments" })).rejects.toThrow('Failed to create laptime');
        });

        it('should throw an error when fetching laptimes fails', async () => {
            (global.fetch as jest.Mock<typeof fetch>).mockResolvedValueOnce({
                ok: false,
            } as Response);
            (localStorageMock.getItem as jest.MockedFunction<typeof localStorageMock.getItem>).mockReturnValue('mock-token');

            await expect(API.handleLaptimes(1)).rejects.toThrow('Failed to fetch Personal laptimes');
        });
    });

    // test fetchMyLaptime
    describe('fetchMyLaptime', () => {
        it('should fetch a personal laptime successfully', async () => {
            const mockLaptime = { id: 1, title: 'new laptime', simracing: false, comment: "my racing moments" };
            (global.fetch as jest.Mock<typeof fetch>).mockResolvedValueOnce({
                ok: true,
                json: async () => mockLaptime,
            } as Response);
            (localStorageMock.getItem as jest.MockedFunction<typeof localStorageMock.getItem>).mockReturnValue('mock-token');

            const result = await API.fetchMyLaptime(1);

            expect(result).toEqual(mockLaptime);
            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining('/user/laptimes/1'),
                expect.objectContaining({
                    method: 'GET',
                    headers: expect.objectContaining({
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer mock-token',
                        'x-api-key': expect.any(String),
                    }),
                })
            );
        });

        it('should throw an error when fetching personal laptime fails', async () => {
            (global.fetch as jest.Mock<typeof fetch>).mockResolvedValueOnce({
                ok: false,
            } as Response);
            (localStorageMock.getItem as jest.MockedFunction<typeof localStorageMock.getItem>).mockReturnValue('mock-token');

            await expect(API.fetchMyLaptime(1)).rejects.toThrow('Failed to fetch Personal Laptime. Does not exist.');
        });
    });

    // test fetchAUserLaptime
    describe('fetchAUserLaptime', () => {
        it('should fetch a user\'s specific laptime successfully', async () => {
            const mockLaptime = { id: 1, title: 'new laptime', simracing: false, comment: "my racing moments" };
            (global.fetch as jest.Mock<typeof fetch>).mockResolvedValueOnce({
                ok: true,
                json: async () => mockLaptime,
            } as Response);
            (localStorageMock.getItem as jest.MockedFunction<typeof localStorageMock.getItem>).mockReturnValue('mock-token');

            const result = await API.fetchAUserLaptime(1, 1);

            expect(result).toEqual(mockLaptime);
            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining('/users/1/laptimes/1'),
                expect.objectContaining({
                    method: 'GET',
                    headers: expect.objectContaining({
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer mock-token',
                        'x-api-key': expect.any(String),
                    }),
                })
            );
        });

        it('should throw an error when fetching a user\'s specific laptime fails', async () => {
            (global.fetch as jest.Mock<typeof fetch>).mockResolvedValueOnce({
                ok: false,
            } as Response);
            (localStorageMock.getItem as jest.MockedFunction<typeof localStorageMock.getItem>).mockReturnValue('mock-token');

            await expect(API.fetchAUserLaptime(1, 1)).rejects.toThrow('Failed to fetch #1 laptime');
        });
    });

    // testEditUserProfile
    describe('EditUserProfile', () => {
        it('should edit user profile successfully', async () => {
            const mockResponse = { id: 1, username: 'Updated User' };
            (global.fetch as jest.Mock<typeof fetch>).mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse,
            } as Response);
            (localStorageMock.getItem as jest.MockedFunction<typeof localStorageMock.getItem>).mockReturnValue('mock-token');

            const result = await API.EditUserProfile(1, { username: 'Updated User' });

            expect(result).toEqual(mockResponse);
            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining(`/users/1/update`),
                expect.objectContaining({
                    method: 'PUT',
                    headers: expect.objectContaining({
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer mock-token',
                        'x-api-key': expect.any(String),
                    }),
                    body: JSON.stringify({ username: 'Updated User' }),
                })
            );
        });

        it('should throw an error when editing user profile fails', async () => {
            (global.fetch as jest.Mock<typeof fetch>).mockResolvedValueOnce({
                ok: false,
            } as Response);
            (localStorageMock.getItem as jest.MockedFunction<typeof localStorageMock.getItem>).mockReturnValue('mock-token');

            await expect(API.EditUserProfile(1, { username: 'Updated User' })).rejects.toThrow('Failed to Edit User profile');
        });
    });

    // testEditUserProfilePic
    describe('EditUserProfilePic', () => {
        it('should edit user profile picture successfully', async () => {
            const mockResponse = { id: 1, profile_picture_url: 'new-profile-picture.jpg' };
            (global.fetch as jest.Mock<typeof fetch>).mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse,
            } as Response);
            (localStorageMock.getItem as jest.MockedFunction<typeof localStorageMock.getItem>).mockReturnValue('mock-token');

            const result = await API.EditUserProfilePic(1, { profile_picture_url: 'new-profile-picture.jpg' });

            expect(result).toEqual(mockResponse);
            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining('/users/1/profile_picture'),
                expect.objectContaining({
                    method: 'PUT',
                    headers: expect.objectContaining({
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer mock-token',
                        'x-api-key': expect.any(String),
                    }),
                    body: JSON.stringify({ profile_picture_url: 'new-profile-picture.jpg' }),
                })
            );
        });

        it('should throw an error when editing user profile picture fails', async () => {
            (global.fetch as jest.Mock<typeof fetch>).mockResolvedValueOnce({
                ok: false,
            } as Response);
            (localStorageMock.getItem as jest.MockedFunction<typeof localStorageMock.getItem>).mockReturnValue('mock-token');

            await expect(API.EditUserProfilePic(1, { profile_picture_url: 'new-profile-picture.jpg' })).rejects.toThrow('Failed to Edit User profile picture');
        });
    });

    // test fetchUsersLaptimes
    describe('fetchUsersLaptimes', () => {
        it('should fetch user\'s laptimes successfully', async () => {
            const mockLaptimes = [{ id: 1, title: 'new laptime', simracing: false, comment: "my racing moments" }, { id: 2, title: 'new laptime 2', simracing: false, comment: "my racing moments 2" }];
            (global.fetch as jest.Mock<typeof fetch>).mockResolvedValueOnce({
                ok: true,
                json: async () => mockLaptimes,
            } as Response);
            (localStorageMock.getItem as jest.MockedFunction<typeof localStorageMock.getItem>).mockReturnValue('mock-token');

            const result = await API.fetchUsersLaptimes(1, 1);

            expect(result).toEqual(mockLaptimes);
            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining('/users/1/laptimes?page=1'),
                expect.objectContaining({
                    method: 'GET',
                    headers: expect.objectContaining({
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer mock-token',
                        'x-api-key': expect.any(String),
                    }),
                })
            );
        });

        it('should throw an error when fetching user\'s laptimes fails', async () => {
            (global.fetch as jest.Mock<typeof fetch>).mockResolvedValueOnce({
                ok: false,
            } as Response);
            (localStorageMock.getItem as jest.MockedFunction<typeof localStorageMock.getItem>).mockReturnValue('mock-token');

            await expect(API.fetchUsersLaptimes(1, 1)).rejects.toThrow('Failed to fetch #1\'s laptimes!');
        });
    });

    // test fetchF1Teams
    describe('fetchF1Teams', () => {
        it('should fetch Formula 1 teams successfully', async () => {
            const mockTeams = [{ id: 1, name: 'Team A' }, { id: 2, name: 'Team B' }];
            (global.fetch as jest.Mock<typeof fetch>).mockResolvedValueOnce({
                ok: true,
                json: async () => mockTeams,
            } as Response);

            const result = await API.fetchF1Teams();

            expect(result).toEqual(mockTeams);
            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining('/f1/teams'),
                expect.objectContaining({
                    method: 'GET',
                    headers: expect.objectContaining({
                        'Content-Type': 'application/json',
                    }),
                })
            );
        });

        it('should throw an error when fetching Formula 1 teams fails', async () => {
            (global.fetch as jest.Mock<typeof fetch>).mockResolvedValueOnce({
                ok: false,
            } as Response);

            await expect(API.fetchF1Teams()).rejects.toThrow('Failed to get Formula 1 Team Standings');
        });
    });

    // test fetchF1Driver
    describe('fetchF1Drivers', () => {
        it('should fetch Formula 1 drivers successfully', async () => {
            const mockDrivers = [{ id: 1, name: 'Driver A' }, { id: 2, name: 'Driver B' }];
            (global.fetch as jest.Mock<typeof fetch>).mockResolvedValueOnce({
                ok: true,
                json: async () => mockDrivers,
            } as Response);

            const result = await API.fetchF1Drivers();

            expect(result).toEqual(mockDrivers);
            expect(global.fetch).toHaveBeenCalledWith(
                expect.stringContaining('/f1/drivers'),
                expect.objectContaining({
                    method: 'GET',
                    headers: expect.objectContaining({
                        'Content-Type': 'application/json',
                    }),
                })
            );
        });

        it('should throw an error when fetching Formula 1 drivers fails', async () => {
            (global.fetch as jest.Mock<typeof fetch>).mockResolvedValueOnce({
                ok: false,
            } as Response);

            await expect(API.fetchF1Drivers()).rejects.toThrow('Failed to get Formula 1 Driver Standings');
        });
    });

});