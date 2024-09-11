import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import ContactRegister from './src/screens/ContactRegister';
import BirthdayReminders from './src/screens/BirthdayReminders';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import { Button, View } from 'react-native';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const Logout = ({ navigation }) => {
  React.useEffect(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  }, [navigation]);

  return (
    <View>
      <Button title="Cerrar Sesión" onPress={() => navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })} />
    </View>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Agregar Contactos" component={ContactRegister} />
      <Drawer.Screen name="Cumpleañeros" component={BirthdayReminders} />
      <Drawer.Screen name="Cerrar Sesión" component={Logout} />
    </Drawer.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Login" component={Login} options={{ title: 'Iniciar Sesión' }} />
        <Stack.Screen name="Register" component={Register} options={{ title: 'Registro' }} />
        <Stack.Screen name="Home" component={DrawerNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Agregar Contacto" component={ContactRegister} options={{ title: 'Agregar Contacto' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
