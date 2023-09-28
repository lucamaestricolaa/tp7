import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import HTML from 'react-native-render-html';

export default function Plato({ id, title, image, summary }) {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.image} />
                ) : (
                    <Image source={require('/assets/cargando.png')} style={styles.image} />
                )}
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title || 'Cargando...'}</Text>
                {summary && (
                    <HTML
                        source={{ html: summary }}
                        tagsStyles={{
                            b: {
                                fontWeight: 'bold',
                            },
                        }}
                    />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lightgrey',
        borderRadius: 10,
        borderColor: 'grey',
        borderWidth: 2,
        width: 350,
        flexDirection: 'row',
        padding: 10,
    },
    imageContainer: {
        width: '33%',
        alignItems: 'center', // Centra la imagen verticalmente
    },
    textContainer: {
        flex: 1, // Expande el espacio disponible
        marginLeft: 10, // Agrega un espacio entre la imagen y el texto
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
    },
    image: {
        width: '100%',
        height: 100,
        borderRadius: 10,
    },
});
