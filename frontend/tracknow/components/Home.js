import React from "react";
import { NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native'
import { createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Car from "./Car";
import Track from "./Track";
import Driver from "./Driver";
import Laptime from "./Laptime";

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
    initialRouteName="Laptimes"
  screenOptions={{
    tabBarActiveTintColor: 'red', // Change active tab color to red
    tabBarInactiveTintColor: 'white', // Change inactive tab color to white
    tabBarLabelStyle: { fontSize: 12 },
    tabBarStyle: {
      backgroundColor: 'black', // Change background color to black
    },}}>

        <Tab.Screen
          name="Laptimes"
          component={Laptime}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ color, size }) => <Icon name="timer" size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="Cars"
          component={Car}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ color, size }) => <Icon name="car" size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="Drivers"
          component={Driver}
          options={{
            tabBarLabel: '',
            tabBarIcon: ({ color, size }) => <Icon name="account-group" size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="Tracks"
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