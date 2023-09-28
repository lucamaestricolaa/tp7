import React from 'react';
import { View, Text, TextInput, Modal, Button, FlatList, TouchableOpacity, Image } from 'react-native';

const AgregarPlatoModal = ({ modalVisible, setModalVisible, platosDisponibles, busqueda, setBusqueda, handleAddPlato }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <Text>Agregar Plato</Text>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar plato"
              value={busqueda}
              onChangeText={(text) => setBusqueda(text)}
            />
          </View>
          <FlatList
            data={platosDisponibles.filter((item) =>
              item.title.toLowerCase().includes(busqueda.toLowerCase())
            )}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleAddPlato(item)}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: 50, height: 50, marginRight: 10 }}
                  />
                  <Text>{item.title}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
          <Button title="Cancelar" onPress={() => {setModalVisible(false), setBusqueda('')}} />
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)', // Fondo oscurecido semi-transparente
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  searchContainer: {
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderRadius: 5,
    borderWidth: 1,
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
};

export default AgregarPlatoModal;
