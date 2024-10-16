import { extendTheme } from "@chakra-ui/react";
import { defineStyle, defineStyleConfig, createMultiStyleConfigHelpers } from '@chakra-ui/react'
import { menuAnatomy } from '@chakra-ui/anatomy';
import { drawerAnatomy as parts } from '@chakra-ui/anatomy';
import '@fontsource-variable/exo-2';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(menuAnatomy.keys)

const {
    definePartsStyle: defineDrawerPartsStyle,
    defineMultiStyleConfig: defineDrawerMultiStyleConfig
} = createMultiStyleConfigHelpers(parts.keys);

const drawer = defineDrawerPartsStyle({
    dialog: {
        bg: 'dark',

    },

})

const postButton = defineStyle({
    color: 'white',
    backgroundColor: '#1e2021',
    _hover: { bg: 'dark' },

})

const navbarButton = defineStyle({
    _hover: { bg: '#1e2021' },
    color: 'white',
    borderRadius: '12px',
    borderColor: '#323536'
})

const navbarLink = defineStyle({
    _hover: { textDecoration: 'none' },
    textDecoration: 'none',
    fontWeight: "bold",
    color: 'inherit'

})
// menu component styles
const baseStyle = definePartsStyle({
    list: {
        py: '4',
        borderRadius: 'xl',
        border: 'none',
        bg: '#191a19',
    },
    item: {
        bg: '#191a19',
        color: 'gray.200',
        _hover: {
            bg: 'dark',
        },
        _focus: {
            bg: 'dark',
        },
    },
    divider: {
        borderColor: '#191a19',
    },
    container: {
        backgroundColor: 'dark',
        color: 'white',
    },
    header: {
        color: 'white',
        padding: 4
    },
    body: {
        color: 'white',
        padding: 4,

    }
})
export const badgeTheme = defineStyleConfig({
    variants: { navbarButton, postButton }
})

export const linkTheme = defineStyleConfig({
    variants: { navbarLink },
})

const menuTheme = defineMultiStyleConfig({ baseStyle })
const cardTheme = defineMultiStyleConfig({ baseStyle })

export const drawerTheme = defineDrawerMultiStyleConfig({
    variants: { drawer },
})
export const theme = extendTheme({
    styles: {
        global: {

            body: {
                bg: "dark",
                color: "white",
            },
            "::-webkit-scrollbar": {
                width: "8px",
                backgroundColor: "transparent",
            },
            "::-webkit-scrollbar-thumb": {
                backgroundColor: "dark",

            },
            ":hover::-webkit-scrollbar-thumb": {
                backgroundColor: "lightdark",
            },
            ":focus::-webkit-scrollbar-thumb": {
                backgroundColor: "lightdark",
            },
            ":focus-within::-webkit-scrollbar-thumb": {
                backgroundColor: "lightdark",
            },
            "::-webkit-scrollbar-track": {
                backgroundColor: "transparent",
            },
        },
    },
    colors: {
        trackred: "#ff3131",
        dark: "#0d0c0c",
        lightdark: "#1e2021"
    },
    fonts: {
        heading: `'Exo 2 Variable', sans-serif`,
        body: `'Exo 2 Variable', sans-serif`
    },
    components: {
        Button: badgeTheme,
        Menu: menuTheme,
        Card: cardTheme,
        Link: linkTheme,
        Drawer: drawerTheme
    }
});