import { View, StyleSheet } from 'react-native'

const Layout = ({children}) => {

    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lightblue',
        padding: 20,
        flex: 1,
        alignItems: "center",
        gap: 20,
    }
})


export default Layout