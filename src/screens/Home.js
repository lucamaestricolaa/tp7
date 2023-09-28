import { FlatList, StyleSheet, Text, View, RefreshControl, TextInput, ScrollView, Modal, Button, TouchableOpacity, Image } from 'react-native';
import Plato from '../components/Plato'
import { useEffect, useRef, useState } from 'react'
import useFetch from '../hooks/useFetch';
import Layout from '../components/Layout';
import AgregarPlatoModal from '../components/AgregarPlatoModal';

const Home = ({ navigation }) => {
    const [platos, setPlatos] = useState([])
    const [listaPlatos, setListaPlatos] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false)
    const [platosFiltrados, setPlatosFiltrados] = useState([])
    const [busqueda, setBusqueda] = useState('')
    const [nombrePlato, setNombrePlato] = useState('');

    const buscarPlatos = async () => {
        setRefreshing(true)
        const platos = await useFetch(true)
        setRefreshing(false)
        setListaPlatos(platos)
        setPlatos(platos)
        setPlatosFiltrados(platos)
    }

    useEffect(() => { buscarPlatos() }, [])

    useEffect(() => { 
        var nuevosPlatos = [...listaPlatos]
        nuevosPlatos = nuevosPlatos.filter(plato => (
            plato.title.toUpperCase().includes(busqueda.toUpperCase())
        ))
        setPlatosFiltrados(nuevosPlatos)
    }, [busqueda])

    const handleChange = newBusqueda => setBusqueda(newBusqueda)
        

    const handleDeletePlato = (id) => {
        // Filtra la lista para eliminar el plato con el ID especificado
        const updatedPlatos = listaPlatos.filter(plato => plato.id !== id);
        setPlatosFiltrados(updatedPlatos);
        setListaPlatos(updatedPlatos);
        setBusqueda('')
    }

    const handleAddPlato = (plato) => {
        setListaPlatos([...listaPlatos, plato]);
        setPlatosFiltrados(listaPlatos)
        setBusqueda('')
        setModalVisible(false);
    };

    const platosDisponibles = platos.filter((plato) => {
        return !listaPlatos.some((item) => item.id === plato.id);
    });
    
    const handlePress = idPlato => {
        navigation.navigate('Plato', { idPlato })
    }

    return (
        <Layout>
            <Text>Home</Text>
            <Button title="Agregar Plato" onPress={() => setModalVisible(true)} />

            {/* Usa el nuevo componente en lugar del modal */}
            <AgregarPlatoModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                platosDisponibles={platosDisponibles.filter((item) =>
                item.title.toLowerCase().includes(busqueda.toLowerCase())
                )}
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                handleAddPlato={handleAddPlato}
            />

            <TextInput 
                placeholder='Buscar plato...'
                style={styles.textInput}
                onChangeText={handleChange}
                value={busqueda}
            />
            <ScrollView style={{ flex: 1 }}>
                <FlatList
                    nestedScrollEnabled={true}
                    refreshControl={
                        <RefreshControl onRefresh={async () => await buscarPlatos()}
                            progressBackgroundColor={'lightblue'}
                            refreshing={refreshing}
                        />
                    }
                    contentContainerStyle={styles.listaPlatos}
                    data={platosFiltrados}
                    renderItem={({ item }) => <Plato {...item} handlePress={() => handlePress(item.id)} handleDelete={handleDeletePlato}/>}
                    
                    keyExtractor={item => item.id}
                />
            </ScrollView>
        </Layout>
    )
}

const styles = StyleSheet.create({
    listaPlatos: {
        flex: 1,
        alignItems: 'center',
        gap: 20,
        width: '100%',
        height: '100%',
    },
    textInput: {
        height: 40, 
        borderColor: 'gray',
        borderRadius: 5,
        borderWidth: 1, 
        width: '100%', 
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscurecido semi-transparente
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
      },
})

export default Home

