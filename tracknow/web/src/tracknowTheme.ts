import { extendTheme } from "@chakra-ui/react";
import { defineStyle, defineStyleConfig } from '@chakra-ui/react'
import '@fontsource-variable/exo-2';


const navbarButton = defineStyle({
    _hover: { bg: '#1e2021' },
    color: 'white',
    borderRadius: '12px'

})
export const badgeTheme = defineStyleConfig({
    variants: { navbarButton }
})
export const theme = extendTheme({
    styles: {
        global: {
            body: {
                bg: "dark",
                color: "white",
            },
        },
    },
    colors: {
        trackred: "#ff3131",
        dark: "#0d0c0c"
    },
    fonts: {
        heading: `'Exo 2 Variable', sans-serif`,
        body: `'Exo 2 Variable', sans-serif`
    },
    components: {
        Button: badgeTheme
    }
});