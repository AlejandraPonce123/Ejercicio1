import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'; // Importar useFocusEffect

const BirthdayReminders = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);

  // useFocusEffect es como useEffect, pero se ejecuta cada vez que la pantalla gana el foco
  useFocusEffect(
    React.useCallback(() => {
      const fetchContacts = async () => {
        try {
          const storedContacts = await AsyncStorage.getItem('contacts');
          if (storedContacts) {
            setContacts(JSON.parse(storedContacts));
          } else {
            setContacts([]); // Asegurarse de que esté vacío si no hay contactos
          }
        } catch (error) {
          console.log('Error al recuperar los contactos:', error);
        }
      };
      fetchContacts();
    }, []) // No dependemos de variables, por lo que dejamos el array vacío
  );

  const getBirthdayStatus = (birthday) => {
    const today = new Date();
    const birthDate = new Date(birthday);

    today.setHours(0, 0, 0, 0);
    birthDate.setHours(0, 0, 0, 0);
    birthDate.setFullYear(today.getFullYear());

    if (birthDate.getTime() === today.getTime()) {
      return 'Hoy Cumpleaños';
    } else if (birthDate < today) {
      return 'Pasado';
    } else {
      const daysUntil = Math.ceil((birthDate - today) / (1000 * 60 * 60 * 24));
      return `${daysUntil} días`;
    }
  };

  const getColorByStatus = (status) => {
    if (status === 'Hoy Cumpleaños') return '#32CD32'; 
    if (status === 'Pasado') return '#FF6347'; 
    return '#4682B4'; 
  };

  const handleLongPress = (contact) => {
    Alert.alert(
      'Eliminar Contacto',
      `¿Estás seguro de que deseas eliminar a ${contact.name} ${contact.surname}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', onPress: () => deleteContact(contact) },
      ],
      { cancelable: true }
    );
  };

  const deleteContact = async (contactToDelete) => {
    const updatedContacts = contacts.filter(contact => contact !== contactToDelete);
    setContacts(updatedContacts);
    await AsyncStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };

  return (
    <View style={styles.container}>
      {contacts.length === 0 ? (
        <View style={styles.noContactsContainer}>
          <Text style={styles.noContactsText}>No hay registros!! 😢</Text>
        </View>
      ) : (
        <ScrollView>
          {contacts.map((contact, index) => {
            const status = getBirthdayStatus(contact.birthday);
            const color = getColorByStatus(status);
            return (
              <TouchableOpacity
                key={index}
                style={[styles.contactItem, { backgroundColor: color }]}
                onLongPress={() => handleLongPress(contact)}
              >
                <Text style={styles.contactText}>{`${contact.name} ${contact.surname}`}</Text>
                <Text style={styles.contactText}>{status}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Agregar Contacto')}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  contactItem: { padding: 15, borderRadius: 10, marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between' },
  contactText: { fontSize: 18, color: '#fff' },
  addButton: { backgroundColor: '#3B82F6', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 20, right: 20 },
  addButtonText: { color: '#fff', fontSize: 24 },
  noContactsContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  noContactsText: { fontSize: 18, color: '#888', textAlign: 'center' },
});

export default BirthdayReminders;
