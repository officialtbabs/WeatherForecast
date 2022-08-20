import { ActivityIndicator, View, StyleSheet } from "react-native";

const Loader = () => {
    return (
        <View style={styles.loader}>
            <ActivityIndicator size="small" color="#000000" />
        </View>
        
    );
}

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: "center"
    }
})

export default Loader;