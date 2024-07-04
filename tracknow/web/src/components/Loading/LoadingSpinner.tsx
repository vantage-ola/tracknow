import { Spinner } from "@chakra-ui/react";

export const LoadingSpinner = () => (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Spinner thickness="4px" speed="0.65s" color="red.500" />
    </div>

);