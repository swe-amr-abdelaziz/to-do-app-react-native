import { StyleSheet, Text, TouchableOpacity } from "react-native";

const toCapitalCase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const Button = ({ style, text, method }) => {
    return (
        <TouchableOpacity style={styles[`${style}Btn`]} activeOpacity={0.8} onPress={method}>
            <Text style={styles[`${style}Text`]}>{toCapitalCase(text)}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    activeBtn: {
        backgroundColor: '#ee2e31',
        borderColor: '#ee2e31',
        borderWidth: 2,
        paddingVertical: 10,
        paddingHorizontal: 20,
        margin: 10,
        borderRadius: 20,
    },
    disactiveBtn: {
        backgroundColor: '#fff',
        borderColor: '#ee2e31',
        borderWidth: 2,
        paddingVertical: 10,
        paddingHorizontal: 20,
        margin: 10,
        borderRadius: 20,
    },
    activeText: {
        color: '#fff',
    },
    disactiveText: {
        color: '#ee2e31',
    },
});

export default Button;