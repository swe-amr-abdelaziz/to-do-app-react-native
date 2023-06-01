import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, showHideDeleteModal } from "../../Redux/slices/mainSlice";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const DeleteModal = () => {
    const dispatch = useDispatch();
    const { deleteModalVisible, tmpTodo } = useSelector(state => state.todos);

    const closeModal = () => {
        dispatch(showHideDeleteModal());
    }

    const DeleteToDo = () => {
        dispatch(deleteTodo());
        closeModal();
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={deleteModalVisible}
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
                        <TouchableOpacity style={styles.deleteButton} onPress={DeleteToDo}>
                            <Text style={styles.closeButtonText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
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

export default DeleteModal;