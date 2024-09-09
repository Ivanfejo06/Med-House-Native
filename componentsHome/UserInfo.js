import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard, FlatList, TouchableOpacity, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; // Asegúrate de instalar esta librería

const UserInfo = ({ label, value, editable = false, onChangeText }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGenderPicker, setShowGenderPicker] = useState(false);
  const [selectedGender, setSelectedGender] = useState(value);
  const [phoneNumber, setPhoneNumber] = useState(value || '');
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

  const formatPhoneNumber = (text) => {
    // Elimina todos los caracteres que no sean números
    return ('' + text).replace(/[^\d]/g, '');
  };

  const handlePhoneNumberChange = (text) => {
    const cleaned = formatPhoneNumber(text);
    setPhoneNumber(cleaned);
    onChangeText(cleaned);
  };

  const renderInput = () => {
    if (label.toLowerCase() === 'fecha de nacimiento') {
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
    } else if (label.toLowerCase() === 'teléfono') {
      return (
        <>
          <TextInput
            style={[styles.value, editable && styles.editable]}
            value={phoneNumber}
            editable={editable}
            onChangeText={handlePhoneNumberChange}
            underlineColorAndroid="transparent"
            keyboardType="numeric"
            maxLength={15} // Ajusta según el formato esperado
            placeholder="Número de teléfono"
          />
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
        <Text style={styles.label}>{label}</Text>
        <View style={styles.info}>
          {renderInput()}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    justifyContent: "space-around"
  },
  label: {
    fontSize: 16,
    color: '#888',
    width: '30%',
  },
  value: {
    fontSize: 16,
    color: '#000',
    flex: 1
  },
  info: {
    width: "60%"
  },
  editable: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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