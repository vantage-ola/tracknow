import * as React from "react";
import {
    Box, Heading, List, ListItem,
    Text, Divider, Image, Stack, Flex, Center,
    Accordion, AccordionButton, AccordionIcon,
    AccordionItem,
    AccordionPanel,
    HStack,
    VStack,
} from "@chakra-ui/react";
import useMotorsportData from "../../hooks/useMotorsport";
import { TeamStanding, DriverStanding } from "../../Types";

const RightSideBar = () => {
    const { fetchTeamStandings, fetchDriverStandings, teamColors } = useMotorsportData();
    const [teamStandings, setTeamStandings] = React.useState<TeamStanding[]>([]);
    const [driverStandings, setDriverStandings] = React.useState<DriverStanding[]>([]);

    React.useEffect(() => {
        // Check if the data is already cached in local storage
        const cachedTeamStandings = localStorage.getItem('teamStandings');
        const cachedDriverStandings = localStorage.getItem('driverStandings');

        if (cachedTeamStandings && cachedDriverStandings) {
            // If the data is cached, parse it and set it to state
            setTeamStandings(JSON.parse(cachedTeamStandings));
            setDriverStandings(JSON.parse(cachedDriverStandings));
        } else {
            // If the data is not cached, fetch it and set it to state
            const fetchData = async () => {
                const teamData = await fetchTeamStandings();
                setTeamStandings(teamData.results);
                localStorage.setItem('teamStandings', JSON.stringify(teamData.results));

                const driverData = await fetchDriverStandings();
                setDriverStandings(driverData.results);
                localStorage.setItem('driverStandings', JSON.stringify(driverData.results));
            };
            fetchData();
        }
    }, []);


    const today = new Date();

    return (
        <>
            <Center >
                <Image src='f1_logo.png' boxSize='55px' />

            </Center>
            <Center pb={2}>
                <VStack>
                    <Heading size='xs' color={'grey'} textTransform='uppercase'>
                        {today.getFullYear()} Standings
                    </Heading>
                    {driverStandings.length > 0 && (
                        <Text fontSize={'8px'}>
                            Last Updated: {new Date(driverStandings[0].updated).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </Text>
                    )}
                </VStack>

            </Center>
            <Accordion allowMultiple>
                <AccordionItem>

                    <h2>
                        <AccordionButton>
                            <Box as='span' color={'grey'} flex='1' textAlign='left'>
                                CONSTRUCTORS
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <Flex mb={2} color={'grey'} justifyContent="space-between" alignItems="center">
                            <Text fontSize="10px" >Rank</Text>
                            <Text width="120px" fontSize="10px" >Constructor</Text>
                            <Text width="30px" fontSize="10px" >Points</Text>
                        </Flex>
                        <Divider mb={2} />
                        {teamStandings.map((team) => (
                            <Box key={team.team_id}>
                                <Flex justifyContent="space-between" alignItems="flex-start">
                                    <HStack >
                                        <Text color={'grayText'}>{team.position}</Text>
                                    </HStack>
                                    <Box width="100px">
                                        <Text color={teamColors[team.team_name]}>{team.team_name}</Text>
                                    </Box>
                                    <HStack>
                                        <Box width="30px">
                                            <Text>{team.points}</Text>
                                        </Box>
                                    </HStack>
                                </Flex>
                            </Box>
                        ))}
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as='span' flex='1' color={'grey'} textAlign='left'>
                                DRIVERS
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <Flex mb={2} color={'grey'} justifyContent="space-between" alignItems="center">
                            <Text fontSize="10px" >Rank</Text>
                            <Text width="120px" fontSize="10px" >Constructor</Text>
                            <Text width="30px" fontSize="10px" >Points</Text>
                        </Flex>
                        <Divider mb={2} />
                        {driverStandings.map((driver) => (
                            <Box key={driver.driver_id}>

                                <Flex p={1} justifyContent="space-between" alignItems="flex-start">

                                    <HStack >
                                        <Text color={'grayText'}>{driver.position}</Text>
                                    </HStack>
                                    <Box width="100px">
                                        <Text fontSize={'15px'}>
                                            {driver.driver_name.split(' ').map((name, index) => (
                                                index === 0 ? name.charAt(0) + '.' : name
                                            )).join(' ')}
                                        </Text>

                                        <Text color={teamColors[driver.team_name]} fontSize={'8px'}>{driver.team_name}</Text>
                                    </Box>
                                    <HStack>
                                        <Box width="30px">
                                            <Text >{driver.points}</Text>
                                        </Box>
                                    </HStack>

                                </Flex>
                            </Box>
                        ))}
                    </AccordionPanel>
                </AccordionItem >
            </Accordion >

            <Center>
                <Box mt={2} fontSize="10px" color="GrayText">
                    More motorsport data coming soon...
                </Box>
            </Center>


        </>

    );
};

export default RightSideBar;
