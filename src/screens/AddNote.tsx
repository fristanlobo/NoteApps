import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput
} from 'react-native'
import React, { useState } from 'react';
import Loader from '../component/Loader';
import { useNavigation, useRoute } from '@react-navigation/native';

const AddNote = () => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [loader, setLoader] = useState<boolean>(false);

    const navigation = useNavigation();
    const route = useRoute();
    const validate = () => {
        let valid = true;
        if (title == '') {
            valid = false
        }
        else {
            valid = true
        }
        if (description == '') {
            valid = false;
        }
        else {
            valid = true;
        }
        return valid;
    }

    const AddNotes = async () => {
        setLoader(true);
        const header = new Headers();
        header.append("Content-Type", "application/json");
        const body = {
            title: title,
            description: description,
            postedBy: route.params.id,
        }

        const res = await fetch("http://192.168.0.214:8001/api/notes/addNote", {
            headers: header,
            method: 'POST',
            body: JSON.stringify(body)
        })
        const data = await res.json()
        if (data.status === false) {
            //setErrMsg(data.message);
            return;
        }

        setLoader(false);
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <Text
                style={styles.headingTitle}>Full Stack App
            </Text>
            <TextInput
                style={styles.input}
                placeholder='Enter the Title'
                value={title}
                onChangeText={(txt) => setTitle(txt)}
            />
            <TextInput
                style={[styles.input, { height: 150, alignItems: "flex-start" }]}
                placeholder='Enter the description'
                multiline={true}
                numberOfLines={5}
                onChangeText={(txt) => setDescription(txt)}
                value={description}
            />

            <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                    if (validate()) {
                        AddNotes();
                    }
                }}
            >
                <Text style={{ color: '#fff' }}>Add</Text>
            </TouchableOpacity>
            <Loader visible={loader} />
        </View>
    )
}

export default AddNote;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    headingTitle: {
        color: '#000',
        fontSize: 18,
        fontWeight: '600',
        alignSelf: 'center',
        marginTop: '20%',
    },
    input: {
        width: '90%',
        height: 45,
        borderWidth: 1,
        borderColor: '#000',
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 8
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginHorizontal: 20,
        backgroundColor: '#000'
    }
})