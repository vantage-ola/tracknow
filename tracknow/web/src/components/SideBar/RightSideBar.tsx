import * as React from "react";
import {
    Box, Heading, Text, Divider, Image, Flex, Center,
    Tabs, TabList, TabPanels, Tab, TabPanel,
    HStack,
    VStack,
} from "@chakra-ui/react";
import useMotorsportData from "../../hooks/useMotorsport";
import { F1DriverStanding, F1ConstructorStanding } from "../../Types";

const RightSideBar = () => {
    const { fetchTeamStandings, fetchDriverStandings, teamColors } = useMotorsportData();
    const [teamStandings, setTeamStandings] = React.useState<F1ConstructorStanding[]>([]);
    const [driverStandings, setDriverStandings] = React.useState<F1DriverStanding[]>([]);

    React.useEffect(() => {
        const fetchData = async () => {
            const teamData = await fetchTeamStandings();
            setTeamStandings(teamData.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);

            const driverData = await fetchDriverStandings();
            setDriverStandings(driverData.MRData.StandingsTable.StandingsLists[0].DriverStandings);
        };
        fetchData();
    }, []);

    const today = new Date();

    return (
        <>
            <Center>
                <Image src='f1_logo.png' boxSize='55px' />
            </Center>
            <Center pb={3}>
                <VStack>
                    <Heading size='xs' color={'grey'} textTransform='uppercase'>
                        {today.getFullYear()} Standings
                    </Heading>
                </VStack>
            </Center>
            <Tabs isFitted variant="soft-rounded" colorScheme={'whiteAlpha'}>
                <TabList>
                    <Tab fontSize="sm" color={'grey'} py={1}>CONSTRUCTORS</Tab>
                    <Tab fontSize="sm" color={'grey'} py={1}>DRIVERS</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Flex mb={2} color={'grey'} justifyContent="space-between" alignItems="center">
                            <Text fontSize="10px">Rank</Text>
                            <Text width="130px" fontSize="10px">Constructor</Text>
                            <Text width="30px" fontSize="10px">Points</Text>
                        </Flex>
                        <Divider mb={2} borderColor="#323536" />
                        {teamStandings.map((team) => (
                            <Box key={team.Constructor.name}>
                                <Flex justifyContent="space-between" alignItems="flex-start">
                                    <HStack>
                                        <Text color={'grayText'}>{team.position}</Text>
                                    </HStack>
                                    <Box width="110px">
                                        <Text color={teamColors[team.Constructor.name]}>{team.Constructor.name}</Text>
                                    </Box>
                                    <HStack>
                                        <Box width="30px">
                                            <Text>{team.points}</Text>
                                        </Box>
                                    </HStack>
                                </Flex>
                            </Box>
                        ))}
                    </TabPanel>
                    <TabPanel>
                        <Flex mb={2} color={'grey'} justifyContent="space-between" alignItems="center">
                            <Text fontSize="10px">Rank</Text>
                            <Text width="120px" fontSize="10px">Driver</Text>
                            <Text width="30px" fontSize="10px">Points</Text>
                        </Flex>
                        <Divider mb={2} borderColor="#323536" />
                        {driverStandings.map((driver) => (
                            <Box key={driver.Driver.familyName}>
                                <Flex p={1} justifyContent="space-between" alignItems="flex-start">
                                    <HStack>
                                        <Text color={'grayText'}>{driver.position}</Text>
                                    </HStack>
                                    <Box width="100px">
                                        <Text fontSize={'15px'}>
                                            {`${driver.Driver.givenName.charAt(0)}. ${driver.Driver.familyName}`}
                                        </Text>
                                        <Text color={teamColors[driver.Constructors[0].name]} fontSize={'8px'}>
                                            {driver.Constructors[0].name}
                                        </Text>
                                    </Box>
                                    <HStack>
                                        <Box width="30px">
                                            <Text>{driver.points}</Text>
                                        </Box>
                                    </HStack>
                                </Flex>
                            </Box>
                        ))}
                    </TabPanel>
                </TabPanels>
            </Tabs>
            <Center>
                <Box mt={2} fontSize="10px" color="GrayText">
                    More motorsport data coming soon...
                </Box>
            </Center>
        </>
    );
};

export default RightSideBar;
