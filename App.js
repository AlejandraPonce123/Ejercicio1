import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import ContactRegister from './src/screens/ContactRegister';
import BirthdayReminders from './src/screens/BirthdayReminders';
import Login from './src/screens/Login';
import Register from './src/screens/Register';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Drawer Navigator que contiene las pantallas principales tras el login
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="ContactRegister" component={ContactRegister} />
      <Drawer.Screen name="BirthdayReminders" component={BirthdayReminders} />
      <Drawer.Screen name="Logout" component={Login} />
    </Drawer.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      {/* Asegúrate de que Login sea la pantalla inicial */}
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Login" component={Login} options={{ title: 'Iniciar Sesión' }} />
        <Stack.Screen name="Register" component={Register} options={{ title: 'Registro' }} />
        <Stack.Screen name="Home" component={DrawerNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
