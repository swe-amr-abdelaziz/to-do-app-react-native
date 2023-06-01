import { FlatList } from "react-native";
import Item from "../SharedUI/Item/Item";
import { useSelector } from "react-redux";

const TodoList = ({ navigation }) => {
    const { todos, filter } = useSelector(state => state.todos);

    return (
        <FlatList
            style={{ width: '100%' }}
            data={todos}
            renderItem={({ item }) => (
                filter === 'all' ? <Item item={item} navigation={navigation} /> :
                    filter === 'active' && !item.done ? <Item item={item} navigation={navigation} /> :
                        filter === 'done' && item.done ? <Item item={item} navigation={navigation} /> : null
            )}
            keyExtractor={(item) => item.id}
        />
    );
}

export default TodoList;