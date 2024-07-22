import * as React from "react";
import {
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerBody,
    Center,
    Text,
} from '@chakra-ui/react';

interface MobileDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const MobileDrawer = ({ isOpen, onClose, children }: MobileDrawerProps) => {
    return (
        <Drawer variant="drawer" isOpen={isOpen} placement="left" onClose={onClose}>
            <DrawerOverlay>
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerBody>
                        <Center>
                            <Text fontSize="xl" as="b">
                                tracknow
                            </Text>
                        </Center>
                        {children}
                    </DrawerBody>
                </DrawerContent>
            </DrawerOverlay>
        </Drawer>
    );
};

export default MobileDrawer;
