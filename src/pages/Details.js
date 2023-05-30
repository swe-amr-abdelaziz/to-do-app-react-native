import { StyleSheet, Text, View } from 'react-native';

const Details = ({ route }) => {
    const { item } = route.params;

    return (
        <View style={styles.container} >
            <Text style={styles.heading}>Todo Details</Text>

            <View style={styles.item}>
                <View flex={9} flexDirection="row">
                    <Text style={styles.title}>ID</Text>
                    <Text style={styles.details}>{item.id}</Text>
                    <Text style={styles.title}>Title</Text>
                    <Text style={styles.details}>{item.title}</Text>
                    <Text style={styles.title}>Description</Text>
                    <Text style={styles.details}>{item.description}</Text>
                    <Text style={styles.title}>Status</Text>
                    <Text style={styles.details}>{item.done ? 'Done' : 'Active'}</Text>
                </View>
            </View>
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
        margin: 15,
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
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    details: {
        fontSize: 16,
        marginBottom: 15,
    },
});

export default Details
