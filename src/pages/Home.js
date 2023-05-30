import { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Modal } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation }) => {
    const [id, setId] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [todos, setTodos] = useState([]);
    const [tmpTodo, setTmpTodo] = useState({});
    const [activeButton, setActiveButton] = useState('all');
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        async function getTodos() {
            try {
                const restoredTodos = await AsyncStorage.getItem('todos');
                const restoredID = await AsyncStorage.getItem('id');
                if (restoredTodos !== null) {
                    setTodos(JSON.parse(restoredTodos));
                    setId(parseInt(restoredID));
                }
            }
            catch (err) {
                console.error(err);
            }
        };
        getTodos();
    }, [])

    const addTodo = async () => {
        if (title && description) {
            setId(id + 1);
            const newTodo = { id, title, description, done: false };
            setTodos([...todos, newTodo]);

            try {
                await AsyncStorage.setItem('todos', JSON.stringify([...todos, newTodo]));
                await AsyncStorage.setItem('id', id + 1)
            } catch (err) {
                console.error(err);
            }
        }
    };

    const deleteTodo = async () => {
        setTodos(todos.filter(todo => todo.id !== tmpTodo.id));
        closeModal();
        try {
            await AsyncStorage.setItem('todos', JSON.stringify(todos.filter(todo => todo.id !== tmpTodo.id)));
        } catch (err) {
            console.error(err);
        }
    }

    const finishTodo = id => {
        setTodos(todos.map(todo => {
            if (todo.id === id) {
                todo.done = true;
            }
            return todo;
        }))
    }

    const todoDetails = item => {
        navigation.navigate('Details', { item })
    }

    const openModal = item => {
        setTmpTodo(item);
        setModalVisible(true);
    }

    const closeModal = () => {
        setModalVisible(false);
    }

    const Item = (item) => (
        <View style={styles.item}>
            <View flex={9} flexDirection="row">
                <Text style={item.done ? styles.todoTitleDone : styles.todoTitle}>{item.title}</Text>
                <Text style={item.done ? styles.todoDescriptionDone : styles.todoDescription}>{item.description}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => finishTodo(item.id)}>
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

    return (
        <View style={styles.container} >
            <Text style={styles.heading}>TODO APP</Text>
            <TextInput
                style={styles.input}
                onChangeText={setTitle}
                value={title}
                placeholder="title"
                placeholderTextColor="#ccc"
            />
            <TextInput
                style={styles.input}
                onChangeText={setDescription}
                value={description}
                placeholder="description"
                placeholderTextColor="#ccc"
            />
            <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={addTodo}>
                <Text style={{ color: '#fff' }}>Add</Text>
            </TouchableOpacity>
            <View
                style={{
                    borderBottomColor: '#ccc',
                    width: '70%',
                    borderBottomWidth: 2,
                    margin: 15
                }}
            />
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={activeButton === 'all' ? styles.activeBtn : styles.disactiveBtn} activeOpacity={0.8} onPress={() => setActiveButton('all')}>
                    <Text style={{ color: activeButton === 'all' ? '#fff' : '#ee2e31' }}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity style={activeButton === 'active' ? styles.activeBtn : styles.disactiveBtn} activeOpacity={0.8} onPress={() => setActiveButton('active')}>
                    <Text style={{ color: activeButton === 'active' ? '#fff' : '#ee2e31' }}>Active</Text>
                </TouchableOpacity>
                <TouchableOpacity style={activeButton === 'done' ? styles.activeBtn : styles.disactiveBtn} activeOpacity={0.8} onPress={() => setActiveButton('done')}>
                    <Text style={{ color: activeButton === 'done' ? '#fff' : '#ee2e31' }}>Done</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                style={{ width: '100%' }}
                data={todos}
                renderItem={({ item }) => (
                    activeButton === 'all' ? Item(item) :
                        activeButton === 'active' && !item.done ? Item(item) :
                            activeButton === 'done' && item.done ? Item(item) : null
                )}
                keyExtractor={(item) => item.id}
            />
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Delete Todo</Text>
                        <Text style={styles.modalText}>Are you sure to delete todo with title: {tmpTodo.title}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
                                <Text style={styles.closeButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.deleteButton} onPress={deleteTodo}>
                                <Text style={styles.closeButtonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 20,
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#ee2e31',
        margin: 25,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 2,
        borderColor: '#ccc',
        padding: 10,
        margin: 5,
    },
    button: {
        backgroundColor: '#ee2e31',
        paddingVertical: 10,
        paddingHorizontal: 20,
        margin: 10,
        color: '#fff',
    },
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
    icon: {
        marginHorizontal: 8,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
    },
    cancelButton: {
        backgroundColor: '#999',
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 5,
    },
    deleteButton: {
        backgroundColor: '#ee2e31',
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Home
