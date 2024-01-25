import React, {useEffect} from "react";
import { NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native'
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Car from "../Screens/Car";
import Track from "../Screens/Track";
import Driver from "../Screens/Driver";
import Laptime from "../Screens/Laptime";

const Tab = createBottomTabNavigator();
const MyDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: 'darkred', // Change primary color to dark red
    },
  };

const Home = () => {
    return (

    <NavigationContainer theme={MyDarkTheme}>
      <Tab.Navigator
            initialRouteName="LAPTIMES"
            screenOptions={{
                tabBarActiveTintColor: 'red', // Change active tab color to red
                tabBarInactiveTintColor: 'white', // Change inactive tab color to white
                tabBarLabelStyle: { fontSize: 12 },
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: 'black', // Change background color to black
        },}}>

        <Tab.Screen
            name="LAPTIMES"
            component={Laptime}
            options={{
                tabBarLabel: '',
                tabBarIcon: ({ color, size }) => <Icon name="timer" size={size} color={color} />,
        }}
        />
        <Tab.Screen
            name="CARS"
            component={Car}
            options={{
                tabBarLabel: '',
                tabBarIcon: ({ color, size }) => <Icon name="car" size={size} color={color} />,
        }}
        />
        <Tab.Screen
            name="DRIVERS"
            component={Driver}
            options={{
                tabBarLabel: '',
                tabBarIcon: ({ color, size }) => <Icon name="account-group" size={size} color={color} />,
        }}
        />
        <Tab.Screen
            name="TRACKS"
            component={Track}
            options={{
                tabBarLabel: '',
                tabBarIcon: ({ color, size }) => <Icon name="map" size={size} color={color} />,
        }}
        />
      </Tab.Navigator>
    </NavigationContainer>
    );
}
export default Home;