import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    FlatList,
    TouchableOpacity,
    Alert
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootNavigationProps } from '../AppNavigator'
import { useIsFocused, useRoute } from '@react-navigation/native'

interface MyProps {
    navigation: StackNavigationProp<RootNavigationProps, 'Home'>
}

type Notes = {
    title: string,
    description: string,
    _id: string
}

const Home = ({ navigation }: MyProps) => {
    const [notes, setNotes] = useState<Notes[]>([]);

    const route = useRoute();
    const isFocused = useIsFocused();
    useEffect(() => {
        //console.log("route",route.params.id)
        getNotes();
    }, [isFocused])

    const getNotes = async () => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const res = await fetch("http://192.168.0.214:8001/api/notes/getNotes/" + route.params.id, {
            headers: headers,
            method: 'GET',
        });
        const data = await res.json();
        //console.log(data);
        setNotes(data);
        //console.log(notes.length)
    }

    const deleteNote = async (id: string, title: string) => {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const res = await fetch("http://192.168.0.214:8001/api/notes/deleteNotes/" + id, {
            headers: headers,
            method: 'DELETE',
        });
        const data = await res.json();
        Alert.alert("Note " + title + " is deleted");

    }

    const editNote = async () => {

    }

    return (
        <View
            style={styles.container}>
            <StatusBar
                backgroundColor={'#fff'}
                barStyle={'dark-content'}
            />

            <View
                style={styles.header}>
                <Text
                    style={styles.headingTitle}>Full Stack App
                </Text>
            </View>
            {
                notes.length > 0 ?
                    (
                        <FlatList
                            data={notes}
                            renderItem={({ item, index }: { item: Notes, index: number }) => {
                                return (
                                    <View style={styles.noteItem}>
                                        <View style={styles.leftView}>
                                            <Text style={styles.txt}>Title: {item.title}</Text>
                                            <Text style={styles.txt}>Description : {item.description}</Text>
                                        </View>
                                        <View style={styles.rightView}>
                                            <TouchableOpacity
                                                style={
                                                    styles.editBtn
                                                }
                                                onPress={() => {
                                                    editNote()
                                                }}
                                            >
                                                <Text>Edit</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                style={
                                                    styles.deleteBtn
                                                }
                                                onPress={() => {
                                                    deleteNote(item._id, item.title);
                                                }}
                                            >
                                                <Text>Delete</Text>
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                )
                            }}
                        />
                    )
                    :
                    (
                        <View style={styles.noDataView}>
                            <Text style={styles.headingTitle}>Note not found for this user</Text>
                        </View>
                    )
            }
            <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                    navigation.navigate("AddNote", {
                        id: route.params.id
                    })
                }}
            >
                <Text
                    style={{ color: '#fff' }}>
                    Add Note
                </Text>
            </TouchableOpacity>

        </View>
    )
}
export default Home;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    header: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        elevation: 5,
        justifyContent: 'center',
        paddingLeft: 20
    },
    headingTitle: {
        color: '#000',
        fontSize: 18,
        fontWeight: '600'
    },
    btn: {
        width: 200,
        height: 50,
        borderRadius: 30,
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center'
    },
    noteItem: {
        width: '90%',
        height: 100,
        borderWidth: 1,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 10,
        padding: 5,
        flexDirection: 'row'
    },
    noDataView: {
        flex: 1,
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center'
    },
    txt: {
        color: '#000', paddingBottom: 5
    },
    leftView: {
        width: '70%', flexDirection: 'column'
    },
    rightView: {
        width: '30%', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end', paddingHorizontal: 10, paddingVertical: 10
    },
    editBtn: {
        borderWidth: 1,
        width: '60%',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    deleteBtn: {
        borderWidth: 1,
        width: '70%',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
