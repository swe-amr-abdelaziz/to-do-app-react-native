import { StyleSheet, Text, View } from 'react-native';

import AddTodo from '../components/AddTodo/AddTodo';
import HR from '../components/SharedUI/HR/HR';
import FilterButtons from '../components/FilterButtons/FilterButtons';
import TodoList from '../components/TodoList/TodoList';
import DeleteModal from '../components/DeleteModal/DeleteModal';

const Home = ({ navigation }) => {
    return (
        <View style={styles.container} >
            <Text style={styles.heading}>TODO APP</Text>
            <AddTodo />
            <HR />
            <FilterButtons array={['all', 'active', 'done']} />
            <TodoList navigation={navigation}/>
            <DeleteModal />
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
});

export default Home
