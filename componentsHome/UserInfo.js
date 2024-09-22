import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard, FlatList, TouchableOpacity, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; // Asegúrate de instalar esta librería

const UserInfo = ({ label, value, editable = false, onChangeText }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGenderPicker, setShowGenderPicker] = useState(false);
  const [selectedGender, setSelectedGender] = useState(value);
  const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : new Date());

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setSelectedDate(selectedDate);
      onChangeText(selectedDate.toISOString().split('T')[0]); // Formato YYYY-MM-DD
    }
  };

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
    onChangeText(gender);
    setShowGenderPicker(false); // Cierra el modal después de seleccionar
  };

  const renderInput = () => {
    if (label.toLowerCase() === 'fecha de nacimiento' || label.toLowerCase() === 'fecha de apertura' || label.toLowerCase() === 'fecha de caducidad ') {
      return (
        <View style={styles.datePickerContainer}>
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        </View>
      );
    } else if (label.toLowerCase() === 'género') {
      return (
        <>
          <TextInput
            style={styles.value}
            onPress={() => setShowGenderPicker(true)}
            value={selectedGender || 'Selecciona tu género'} // Asegúrate de que el valor no sea undefined o null
            editable={false}
            onChangeText={onChangeText}
            underlineColorAndroid="transparent"
          />
          {/* Modal personalizado para seleccionar género */}
          <Modal
            transparent={true}
            visible={showGenderPicker}
            animationType="slide"
            onRequestClose={() => setShowGenderPicker(false)}
          >
            <TouchableWithoutFeedback onPress={() => setShowGenderPicker(false)}>
              <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                  <Text style={styles.modalTitle}>Selecciona tu género</Text>
                  <FlatList
                    data={['Femenino', 'Masculino', 'Otro']}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.optionButton}
                        onPress={() => handleGenderChange(item)}
                      >
                        <Text style={styles.optionText}>{item}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </>
      );
    } else {
      return (
        <TextInput
          style={[styles.value, editable && styles.editable]}
          value={value || ''} // Asegúrate de que el valor no sea undefined o null
          editable={editable}
          onChangeText={onChangeText}
          underlineColorAndroid="transparent"
        />
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>{label}:</Text>
        <View style={styles.info}>
          {renderInput()}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: "row", 
    backgroundColor: "#e6e6e6", // Color del borde
    borderRadius: 15,       // Radio de las esquinas
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.84, 
    justifyContent: "space-between",
    marginBottom: 20,
    width: '100%'
  },
  label: {
    fontSize: 16,
    color: '#1E98A8',
    width: '30%',
  },
  value: {
    fontSize: 16,
    color: '#000',
    flex: 1,
  },
  info: {
    textDecoration: "none"
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionButton: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
});

export default UserInfo;