import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem('users');
      const users = storedUserData ? JSON.parse(storedUserData) : [];

      const user = users.find(
        u => (u.username === usernameOrEmail || u.email === usernameOrEmail) && u.password === password
      );

      if (user) {
        Alert.alert('Login exitoso');
        navigation.navigate('Home'); // Redirige a la pantalla principal
      } else {
        Alert.alert('Error', 'Credenciales incorrectas o usuario no registrado');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Hubo un problema al procesar el inicio de sesión');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agenda</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo / Usuario"
        value={usernameOrEmail}
        onChangeText={setUsernameOrEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>¿No tienes una cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 40, marginBottom: 40 },
  input: { width: '80%', borderBottomWidth: 1, marginBottom: 20, padding: 10 },
  button: { width: '80%', backgroundColor: '#3B82F6', padding: 15, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18 },
  registerText: { marginTop: 20, color: '#3B82F6' },
});

export default Login;
