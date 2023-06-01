import { StyleSheet, TextInput } from "react-native";

const InputField = ({ placeholder, value, setValue }) => {
    return (
        <TextInput
            style={styles.input}
            onChangeText={setValue}
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#ccc"
        />
    )
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        height: 40,
        borderWidth: 2,
        borderColor: '#ccc',
        padding: 10,
        margin: 5,
    },
});

export default InputField;