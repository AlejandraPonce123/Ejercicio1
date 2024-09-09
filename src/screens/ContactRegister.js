import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

const ContactRegister = ({ navigation }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const validateAndSaveContact = async () => {
    if (!name || !surname || !email || !phone || !birthday) {
      Alert.alert('Error', 'Por favor llena todos los campos');
      return;
    }

    if (!/^[A-Za-z]+$/.test(name) || !/^[A-Za-z]+$/.test(surname)) {
      Alert.alert('Error', 'Nombre y apellido deben contener solo letras');
      return;
    }

    if (!/^\d{8}$/.test(phone)) {
      Alert.alert('Error', 'El número de teléfono debe tener 8 dígitos');
      return;
    }

    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
      Alert.alert('Error', 'El correo debe tener una estructura: alumno@gmail.com ');
      return;
    }

    const contact = { name, surname, email, phone, birthday };
    try {
      const existingContacts = await AsyncStorage.getItem('contacts');
      const contacts = existingContacts ? JSON.parse(existingContacts) : [];
      contacts.push(contact);
      await AsyncStorage.setItem('contacts', JSON.stringify(contacts));
      Alert.alert('Contacto agregado exitosamente');
      navigation.navigate('Cumpleañeros');
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al guardar el contacto');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Persona</Text>
      <TextInput style={styles.input} placeholder="Nombre" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Apellido" value={surname} onChangeText={setSurname} />
      <TextInput style={styles.input} placeholder="Correo" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Número de teléfono" value={phone} onChangeText={setPhone} keyboardType="numeric" />
      <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
        <Text>{birthday ? birthday.toDateString() : 'Fecha de cumpleaños'}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={birthday}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setBirthday(selectedDate);
          }}
        />
      )}
      <TouchableOpacity style={styles.button} onPress={validateAndSaveContact}>
        <Text style={styles.buttonText}>Agregar Persona</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  button: {
    width: '100%',
    backgroundColor: '#3B82F6',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ContactRegister;
