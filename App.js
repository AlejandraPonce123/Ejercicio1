import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import ContactRegister from './src/screens/ContactRegister';
import BirthdayReminders from './src/screens/BirthdayReminders'; // Pantalla de Recordatorios de Cumpleaños

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Cumpleañeros">
        {/* Pantalla de recordatorios como pantalla principal */}
        <Drawer.Screen name="Cumpleañeros" component={BirthdayReminders} />
        {/* Opción en el menú para navegar a agregar contacto */}
        <Drawer.Screen name="Agregar Contacto" component={ContactRegister} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
