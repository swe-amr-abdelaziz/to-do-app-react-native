import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { useDispatch } from "react-redux";
import { deleteTodo, finishTodo, showHideDeleteModal, setTmpTodo } from '../../../Redux/slices/mainSlice';

const Item = ({ item, navigation }) => {
    const dispatch = useDispatch();

    const FinishToDo = id => {
        dispatch(finishTodo(id));
    };

    const todoDetails = item => {
        navigation.navigate('Details', { item })
    }

    const openModal = item => {
        dispatch(setTmpTodo(item));
        dispatch(showHideDeleteModal());
    }

    return (
        <View style={styles.item}>
            <View flex={9} flexDirection="column">
                <Text style={item.done ? styles.todoTitleDone : styles.todoTitle}>{item.title}</Text>
                <Text style={item.done ? styles.todoDescriptionDone : styles.todoDescription}>{item.description}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => FinishToDo(item.id)}>
                    <FontAwesome5 name="check" size={16} color="green" style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => todoDetails(item)}>
                    <FontAwesome5 name="external-link-alt" size={16} color="blue" style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => openModal(item)}>
                    <FontAwesome5 name="trash" size={16} color="red" style={styles.icon} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#f0f0f0',
        width: '100%',
        paddingHorizontal: 30,
        paddingVertical: 20,
        marginVertical: 10,
        borderRadius: 20,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    todoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    todoTitleDone: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        textDecorationLine: 'line-through',
        color: '#bbb',
    },
    todoDescription: {
        fontSize: 15,
    },
    todoDescriptionDone: {
        fontSize: 15,
        textDecorationLine: 'line-through',
        color: '#bbb',
    },
    icon: {
        marginHorizontal: 8,
    },
});

export default Item;