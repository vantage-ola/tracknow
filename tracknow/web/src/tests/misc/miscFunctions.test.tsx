import { renderHook, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import useMiscFunctions from '../../misc/miscFunctions';

// Mock the react-router-dom's useNavigate
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
}));

describe('useMiscFunctions', () => {
    it('should return the correct cloudName, uploadPreset, and api_key', () => {
        const { result } = renderHook(() => useMiscFunctions(), { wrapper: MemoryRouter });

        expect(result.current.cloudName).toBe(process.env.REACT_APP_CLOUDINARY_NAME || 'your cloudinary name');
        expect(result.current.uploadPreset).toBe(process.env.REACT_APP_CLOUDINARY_PRESET || 'your cloudinary preset');
        expect(result.current.api_key).toBe(process.env.REACT_APP_CLOUDINARY_API || 'your cloudinary api');
    });

    it('should handle logout correctly', () => {
        const { result } = renderHook(() => useMiscFunctions(), { wrapper: MemoryRouter });

        // Mock localStorage
        const localStorageMock = {
            removeItem: jest.fn(),
        };
        Object.defineProperty(window, 'localStorage', { value: localStorageMock });

        act(() => {
            result.current.handleLogout();
        });

        expect(localStorageMock.removeItem).toHaveBeenCalledWith('access_token');
    });

    it('should return LazyLoadYoutubeEmbed component', () => {
        const { result } = renderHook(() => useMiscFunctions(), { wrapper: MemoryRouter });

        expect(result.current.LazyLoadYoutubeEmbed).toBeDefined();
    });

    it('should return dummyLaptimes', () => {
        const { result } = renderHook(() => useMiscFunctions(), { wrapper: MemoryRouter });

        expect(result.current.dummyLaptimes).toBeDefined();
        expect(result.current.dummyLaptimes.length).toBe(3);
        expect(result.current.dummyLaptimes[0].title).toBe('Fast Lap at Brands Hatch');
    });
});

// Separate test for LazyLoadYoutubeEmbed component
import React from 'react';
import { render, screen } from '@testing-library/react';

describe('LazyLoadYoutubeEmbed', () => {
    it('renders correctly with a valid YouTube link', () => {
        const { result } = renderHook(() => useMiscFunctions(), { wrapper: MemoryRouter });
        const LazyLoadYoutubeEmbed = result.current.LazyLoadYoutubeEmbed;

        render(<LazyLoadYoutubeEmbed youtubeLink="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />);

        const iframe = screen.getByTitle('Youtube VideoID: dQw4w9WgXcQ');
        expect(iframe).toBeInTheDocument();
        expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/embed/dQw4w9WgXcQ');
    });
});