import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import React, { useState } from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootNavigationProps } from '../AppNavigator'

interface MyProps {
  navigation: StackNavigationProp<RootNavigationProps, 'Signup'>
}
const Singup = ({ navigation }: MyProps) => {
  const [name, setName] = useState<String>("");
  const [username, setUsername] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [errMsg, setErrMsg] = useState<String>("");

  const validate = () => {
    let valid = true;
    if (name == '') {
      valid = false
    }
    else {
      valid = true
    }
    if (username == '') {
      valid = false
    }
    else {
      valid = true
    }
    if (password == '') {

      valid = false;
    }
    else {
      valid = true;
    }
    return valid;
  }

  const register = async () => {
    const header = new Headers();
    header.append("Content-Type", "application/json");
    const body = {
      name: name,
      email: username,
      password: password
    }

    const res = await fetch("http://192.168.0.214:8001/api/auth/register", {
      headers: header,
      method: 'POST',
      body: JSON.stringify(body)
    })
    const data = await res.json()
    if (data.status === false) {
      setErrMsg(data.message);
      return;
    }

    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>New to App! Just fill some details</Text>

      <Image
        source={{
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZqO7D2x04zXa24R5nDmeu4e7zSM2FMwOtnYRTrCsKpQ&s'
        }}
        style={styles.logo}
      />

      <View style={styles.secondary}>

        <TextInput
          style={styles.textInput}
          onChangeText={txt => setName(txt)}
          placeholder='Name'

        />

        <TextInput
          style={styles.textInput}
          onChangeText={txt => setUsername(txt)}
          placeholder='Username'

        />

        <TextInput
          style={styles.textInput}
          placeholder='Password'
          secureTextEntry={true}
          onChangeText={(txt) => setPassword(txt)}

        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (validate()) {
              register();
            }
          }}
        >
          <Text style={styles.btnText}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </View >
  )
}

export default Singup;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor:'#9e9e9e',
    flexDirection: 'column'
  },
  heading: {
    fontSize: 20,
    alignSelf: 'center',
    marginTop: '30%',
    color: '#000',
    padding: 10
  },
  textInput: {
    borderWidth: 1,
    margin: 10,
    borderRadius: 8,
    paddingHorizontal: 10
  },
  button: {
    borderWidth: 1,
    borderRadius: 8,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 10,
    width: 200,
    margin: 10,
  },
  btnText: {
    fontSize: 16,
    color: '#fff'
  },
  secondary: {
    flex: 2,
    marginTop: '5%',
    marginHorizontal: '5%'
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 10
  },

})