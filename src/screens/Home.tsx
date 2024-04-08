import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    FlatList,
    TouchableOpacity
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootNavigationProps } from '../AppNavigator'
import { useRoute } from '@react-navigation/native'

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
    useEffect(() => {
        //console.log("route",route.params.id)
        getNotes();
    }, [])

    const getNotes = async () => {
        const header = new Headers();
        header.append("Content-Type", "application/json");
        const res = await fetch("http://192.168.0.214:8001/api/notes/getNotes/" + route.params.id, {
            headers: header,
            method: 'GET',
        });
        const data = await res.json();
        setNotes(data);
        console.log(notes.length)
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
                notes.length > 0 ? (
                    <FlatList
                        data={notes}
                        renderItem={({ item, index }: { index: number, item: Notes }) => {
                            return <View
                                style={styles.noteItem}>
                            </View>

                        }}
                    />
                )
                    : (
                        <View style={styles.noDataView}>
                            <Text style={{ color: "#000", fontSize: 25 }}>No Notes Found</Text>
                        </View>
                    )

            }
            <TouchableOpacity
                style={styles.btn}
                onPress={()=>{
                
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
        flexDirection: 'row'
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
        height: 80,
        borderWidth: 1,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 10,
    },
    noDataView: {
        flex: 1,
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
