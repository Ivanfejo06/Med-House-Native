import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard, Button, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

const UserInfo = ({ label, value, editable = false, onChangeText }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGenderPicker, setShowGenderPicker] = useState(false);
  const [selectedGender, setSelectedGender] = useState(value);
  const [phoneNumber, setPhoneNumber] = useState(value || '');

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      onChangeText(selectedDate.toISOString().split('T')[0]); // Formato YYYY-MM-DD
    }
  };

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
    onChangeText(gender);
    setShowGenderPicker(false);
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
        <>
          <Text style={styles.value} onPress={() => setShowDatePicker(true)}>
            {value ? new Date(value).toLocaleDateString() : 'Selecciona una fecha'}
          </Text>
          {showDatePicker && (
            <DateTimePicker
              value={value ? new Date(value) : new Date()}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </>
      );
    } else if (label.toLowerCase() === 'género') {
      return (
        <>
          <Text style={styles.value} onPress={() => setShowGenderPicker(true)}>
            {selectedGender || 'Selecciona tu género'}
          </Text>
          <Modal
            transparent={true}
            visible={showGenderPicker}
            animationType="slide"
            onRequestClose={() => setShowGenderPicker(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Picker
                  selectedValue={selectedGender}
                  onValueChange={(itemValue) => handleGenderChange(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="Femenino" value="Femenino" />
                  <Picker.Item label="Masculino" value="Masculino" />
                  <Picker.Item label="Otro" value="Otro" />
                </Picker>
                <Button title="Cerrar" onPress={() => setShowGenderPicker(false)} />
              </View>
            </View>
          </Modal>
          {selectedGender === 'Otro' && (
            <TextInput
              style={[styles.value, editable && styles.editable]}
              value={value !== 'Femenino' && value !== 'Masculino' ? value : ''}
              editable={editable}
              onChangeText={onChangeText}
              underlineColorAndroid="transparent"
              maxLength={60}
              placeholder="Especifica tu género"
            />
          )}
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
        {renderInput()}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: '#888',
    width: '30%',
  },
  value: {
    fontSize: 16,
    color: '#000',
    flex: 1,
  },
  editable: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    width: '100%',
  },
});

export default UserInfo;