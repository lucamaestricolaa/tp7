import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function Plato({ id, title, image, handlePress, handleDelete }) {
    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            {
                image ? <Image source={{uri: image}} style={styles.image} /> :
                <Image source={require('/assets/cargando.png')} style={styles.image} />
            }
            <Text style={styles.title}>{title || 'Cargando...'}</Text>
            <TouchableOpacity onPress={() => handleDelete(id)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Eliminar</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lightgrey',
        borderRadius: 10,
        borderColor: 'grey',
        borderWidth: 2,
        gap: 10,
        width: 350,
        flexDirection: 'row',
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
    },
    image: { 
        width: '33%', 
        height: 100,
        borderRadius: 10,
    },
    deleteButton: {
        backgroundColor: 'red',
        borderRadius: 5,
        padding: 5,
        marginLeft: 'auto',
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
})
